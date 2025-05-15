import useMutationApiRequest from "@/app/hooks/useApiRequest/useMutationApiRequest"
import useQueryApiRequest from "@/app/hooks/useApiRequest/useQueryApiRequest"
import { formatDateTime } from "@/app/utils/formatDate"
import { Delete, FilterList } from "@mui/icons-material"
import {
  Box,
  Button,
  Checkbox,
  colors,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material"
import { keepPreviousData } from "@tanstack/react-query"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table"
import { useCallback, useMemo, useState } from "react"
import DetailTodo from "../detail-todo"
import FilterDialog from "../dialog-filter-todo"
import SearchBar from "../searchbar"
import TablePagination from "../table-pagination"
import type { TodoData, TodoItem } from "./types"

export default function UserTable() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })
  const [openDetail, setOpenDetail] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [selected, setSelected] = useState<string[]>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [openFilter, setOpenFilter] = useState(false)
  const [todoId, setTodoId] = useState("")

  const orderBy = sorting.length > 0 ? sorting[0].id : "created_at"
  const order = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "desc"

  const { data: todos } = useQueryApiRequest<TodoData>({
    key: "list-todos",
    config: {
      query: {
        limit: pagination.pageSize,
        offset: pagination.pageIndex + 1,
        search: globalFilter,
        order_by: orderBy,
        order: order,
        status: columnFilters.find((f) => f.id === "is_done")?.value,
        priority: columnFilters.find((f) => f.id === "priority")?.value,
        due_date: columnFilters.find((f) => f.id === "due_date")?.value,
      },
    },
    options: {
      placeholderData: keepPreviousData,
    },
  })

  const { mutateAsync: updateTodo } = useMutationApiRequest({
    key: "update-todo",
  })
  const { mutateAsync: deleteTodo } = useMutationApiRequest({
    key: "delete-todo",
    config: {
      params: {
        todo_id: todoId,
      },
    },
  })

  const handleDeleteTodo = useCallback(
    async (id: string) => {
      try {
        setTodoId(id)
        await deleteTodo({})
      } catch (error) {
        console.log("error", error)
        console.error(error)
      }
    },
    [deleteTodo]
  )

  const data = useMemo(() => todos?.items || [], [todos])
  const totalCount = todos?.totalItems || 0

  const columnHelper = createColumnHelper<TodoItem>()
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "Number",
        cell: (info) =>
          pagination.pageIndex * pagination.pageSize + info.row.index + 1,
      }),
      columnHelper.accessor("title", {
        header: "Title",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("due_date", {
        header: "Due Date",
        cell: (info) => formatDateTime(info.getValue()),
      }),
      columnHelper.accessor("is_done", {
        header: "Status",
        cell: (info) => {
          return info.getValue() ? "Done" : "Not Done"
        },
      }),
      columnHelper.accessor("priority", {
        header: "Priority",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("created_at", {
        header: "Display Date",
        cell: (info) => formatDateTime(info.getValue()),
      }),
      columnHelper.accessor("id", {
        header: "Action",
        cell: (info) => {
          return (
            <Button
              onClick={(e) => {
                e.stopPropagation()
                return handleDeleteTodo(info.getValue())
              }}
            >
              <Delete color="error" />
            </Button>
          )
        },
      }),
    ],
    [columnHelper, handleDeleteTodo, pagination.pageIndex, pagination.pageSize]
  )

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalCount / pagination.pageSize),
    state: {
      pagination,
      sorting,
      globalFilter,
      columnFilters,
    },
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    autoResetPageIndex: false,
    debugTable: true,
  })

  const handleSelectAllClick = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        const allIds = table.getRowModel().rows.map((r) => r.original.id)
        setSelected(allIds)
        await updateTodo({
          id: allIds,
          is_done: true,
        })
      } else {
        setSelected([])
        await updateTodo({
          id: table.getRowModel().rows.map((r) => r.original.id),
          is_done: false,
        })
      }
    },
    [table, updateTodo]
  )
  const allIds = table.getRowModel().rows.map((r) => r.original.id)
  const doneIds = table
    .getRowModel()
    .rows.filter((r) => r.original.is_done)
    .map((r) => r.original.id)
  const selectedOrDoneIds = Array.from(new Set([...selected, ...doneIds]))
  const checked =
    selectedOrDoneIds.length === allIds.length && allIds.length > 0

  const handleFilterApply = (filters: ColumnFiltersState) => {
    setColumnFilters(filters)
    setPagination((old) => ({ ...old, pageIndex: 0 }))
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ py: 2 }}
      >
        <Stack direction={"column"} alignItems={"start"}>
          <Typography fontWeight={600} fontSize={24}>
            Daftar Todo
          </Typography>
          <Typography fontSize={14} color={"text.secondary"}>
            {totalCount} Todo tersedia
          </Typography>
        </Stack>
        <Box display={"flex"} alignItems={"center"} gap={2}>
          <SearchBar
            value={globalFilter}
            onChange={(e) => {
              setGlobalFilter(e.target.value)
              setPagination((old) => ({ ...old, pageIndex: 0 }))
            }}
          />
          <IconButton onClick={() => setOpenFilter(true)}>
            <Box
              bgcolor={colors.grey[100]}
              p={1.5}
              borderRadius={1}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <FilterList sx={{ m: 0 }} fontSize="medium" />
            </Box>
          </IconButton>
          <FilterDialog
            open={openFilter}
            onClose={() => setOpenFilter(false)}
            onApply={handleFilterApply}
          />
        </Box>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedOrDoneIds.length > 0 &&
                      selectedOrDoneIds.length < allIds.length
                    }
                    checked={checked}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                {headerGroup.headers.map((header) => (
                  <TableCell key={`${header.index}-${pagination.pageIndex}`}>
                    {header.isPlaceholder ? null : (
                      <TableSortLabel
                        active={true}
                        direction={
                          sorting.length > 0 && sorting[0].desc ? "desc" : "asc"
                        }
                        onClick={() => {
                          const isDesc =
                            sorting.length > 0 &&
                            sorting[0].desc &&
                            sorting[0].id === header.column.id
                          setSorting([{ id: header.column.id, desc: !isDesc }])
                          setPagination((old) => ({ ...old, pageIndex: 0 }))
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableSortLabel>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={index}
                onClick={() => setOpenDetail(true)}
                sx={{
                  cursor: "pointer",
                  ":hover": { backgroundColor: "#f5f5f5" },
                  backgroundColor: row.original.is_done ? "#f0f0f0" : "inherit",
                  textDecoration: row.original.is_done
                    ? "line-through"
                    : "none",
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={
                      row.original.is_done || selected.includes(row.original.id)
                    }
                    onClick={(e) => e.stopPropagation()}
                    onChange={async () => {
                      const id = row.original.id
                      const newSelected = selected.includes(id)
                        ? selected.filter((x) => x !== id)
                        : [...selected, id]

                      setSelected(newSelected)

                      try {
                        await updateTodo({
                          id: [id],
                          is_done: !selected.includes(id),
                        })
                      } catch (error) {
                        console.error("Update failed", error)
                      }
                    }}
                  />
                </TableCell>
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell key={index}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        count={totalCount}
        page={pagination.pageIndex + 1}
        rowsPerPage={pagination.pageSize}
        onPageChange={(_, page) =>
          setPagination((old) => ({ ...old, pageIndex: page - 1 }))
        }
        onRowsPerPageChange={(e) =>
          setPagination((old) => ({
            ...old,
            pageSize: Number(e.target.value),
            pageIndex: 0,
          }))
        }
      />
      <DetailTodo
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        onAdd={() => {}}
      />
    </Box>
  )
}
