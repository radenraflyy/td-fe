import useQueryApiRequest from "@/app/hooks/useApiRequest/useQueryApiRequest"
import { formatDateTime } from "@/app/utils/formatDate"
import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table"
import { useCallback, useMemo, useState } from "react"
import SearchBar from "../searchbar"
import TablePagination from "../table-pagination"
import type { TodoData, TodoItem } from "./types"
import DetailTodo from "../detail-todo"
import { keepPreviousData } from "@tanstack/react-query"

export default function UserTable() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })
  const [openDetail, setOpenDetail] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [selected, setSelected] = useState<number[]>([])

  const orderBy = sorting.length > 0 ? sorting[0].id : "created_at"
  const order = sorting.length > 0 && sorting[0].desc ? "desc" : "asc"

  const { data: todos } = useQueryApiRequest<TodoData>({
    key: "list-todos",
    config: {
      query: {
        limit: pagination.pageSize,
        offset: pagination.pageIndex + 1,
        search: globalFilter,
        order_by: orderBy,
        order: order,
      },
    },
    options: {
      placeholderData: keepPreviousData,
    },
  })

  const data = useMemo(() => todos?.items || [], [todos])
  const totalCount = todos?.totalItems || 0

  const columnHelper = createColumnHelper<TodoItem>()
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "Number",
        cell: (info) => info.row.index + 1,
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
    ],
    [columnHelper]
  )

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalCount / pagination.pageSize),
    state: {
      pagination,
      sorting,
      globalFilter,
    },
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    autoResetPageIndex: false,
    debugTable: true,
  })

  const rowCount = table.getRowModel().rows.length
  const handleSelectAllClick = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setSelected(table.getRowModel().rows.map((r) => r.original.id))
      } else {
        setSelected([])
      }
    },
    [table]
  )

  return (
    <Box sx={{ width: "100%" }}>
      <SearchBar
        value={globalFilter}
        onChange={(e) => {
          setGlobalFilter(e.target.value)
          setPagination((old) => ({ ...old, pageIndex: 0 }))
        }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < rowCount
                    }
                    checked={rowCount > 0 && selected.length === rowCount}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
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
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => setOpenDetail(true)}
                sx={{
                  cursor: "pointer",
                  ":hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.includes(row.original.id)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => {
                      const id = row.original.id
                      setSelected((s) =>
                        s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
                      )
                    }}
                  />
                </TableCell>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
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
