import {
  AccessTime,
  AssignmentIndOutlined,
  DescriptionOutlined,
  PermIdentity,
  PriorityHigh,
  Schedule,
  Update,
} from "@mui/icons-material"
import {
  Box,
  Checkbox,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material"
import { visuallyHidden } from "@mui/utils"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type PaginationState,
} from "@tanstack/react-table"
import React, { useCallback, useMemo, useState } from "react"
import type { Order, Todos } from "./types"
import TablePagination from "../table-pagination"

export default function UserTable() {
  const [selected, setSelected] = useState<number[]>([])
  const [order, setOrder] = useState<Order>("asc")
  const [orderBy, setOrderBy] = useState<keyof Todos>()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  })

  const columnHelper = useMemo(() => createColumnHelper<Todos>(), [])
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        id: "id",
        header: () => (
          <Stack
            component={"span"}
            direction={"row"}
            alignItems={"center"}
            color={"#666666"}
            gap={0.5}
          >
            <PermIdentity fontSize="small" />
            ID
          </Stack>
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("title", {
        id: "title",
        header: () => (
          <Stack
            component={"span"}
            direction={"row"}
            alignItems={"center"}
            color={"#666666"}
            gap={0.5}
          >
            <AssignmentIndOutlined fontSize="small" />
            Title
          </Stack>
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("description", {
        id: "description",
        header: () => (
          <Stack
            component={"span"}
            direction={"row"}
            alignItems={"center"}
            color={"#666666"}
            gap={0.5}
          >
            <DescriptionOutlined fontSize="small" />
            Description
          </Stack>
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("due_date", {
        id: "due_date",
        header: () => (
          <Stack
            component={"span"}
            direction={"row"}
            alignItems={"center"}
            color={"#666666"}
            gap={0.5}
          >
            <Schedule fontSize="small" />
            Due Date
          </Stack>
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status", {
        id: "is_done",
        header: () => (
          <Stack
            component={"span"}
            direction={"row"}
            alignItems={"center"}
            color={"#666666"}
            gap={0.5}
          >
            <Update fontSize="small" />
            Status
          </Stack>
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("priority", {
        id: "priority",
        header: () => (
          <Stack
            component={"span"}
            direction={"row"}
            alignItems={"center"}
            color={"#666666"}
            gap={0.5}
          >
            <PriorityHigh fontSize="small" />
            Priority
          </Stack>
        ),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("created_at", {
        id: "created_at",
        header: () => (
          <Stack
            component={"span"}
            direction={"row"}
            alignItems={"center"}
            color={"#666666"}
            gap={0.5}
          >
            <AccessTime fontSize="small" />
            Date Created
          </Stack>
        ),
        cell: (info) => info.getValue(),
      }),
    ],
    [columnHelper]
  )
  const data = useMemo<Todos[]>(
    () => [
      {
        id: 1,
        title: "Test",
        description: "Test",
        due_date: "Test",
        status: "Test",
        priority: "Test",
        created_at: "Test",
      },
      {
        id: 2,
        title: "Test",
        description: "Test",
        due_date: "Test",
        status: "Test",
        priority: "Test",
        created_at: "Test",
      },
      {
        id: 3,
        title: "Test",
        description: "Test",
        due_date: "Test",
        status: "Test",
        priority: "Test",
        created_at: "Test",
      },
      {
        id: 4,
        title: "Test",
        description: "Test",
        due_date: "Test",
        status: "Test",
        priority: "Test",
        created_at: "Test",
      },
      {
        id: 5,
        title: "Test",
        description: "Test",
        due_date: "Test",
        status: "Test",
        priority: "Test",
        created_at: "Test",
      },
      {
        id: 6,
        title: "Test",
        description: "Test",
        due_date: "Test",
        status: "Test",
        priority: "Test",
        created_at: "Test",
      },
      {
        id: 7,
        title: "Test",
        description: "Test",
        due_date: "Test",
        status: "Test",
        priority: "Test",
        created_at: "Test",
      },
    ],
    []
  )
  const rowModel = useMemo(() => getCoreRowModel(), [])
  const table = useReactTable({
    columns,
    data,
    rowCount: data.length,
    state: {
      pagination,
    },
    getCoreRowModel: rowModel,
    onPaginationChange: setPagination,
    debugTable: true,
  })
  const rowCount = table.getRowModel().rows.length

  console.log("pagination", pagination)
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

  const handleRequestSort = (property: keyof Todos) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  console.log("RENDER USER TABLE")

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < rowCount
                    }
                    checked={rowCount > 0 && selected.length === rowCount}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                {hg.headers.map((h) => (
                  <TableCell key={h.id}>
                    <TableSortLabel
                      active={true}
                      direction={orderBy === h.id ? order : "desc"}
                      onClick={() => handleRequestSort(h.id as keyof Todos)}
                    >
                      {flexRender(h.column.columnDef.header, h.getContext())}
                      {orderBy === h.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.includes(row.original.id)}
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
        count={rowCount}
        page={table.getState().pagination.pageIndex}
        rowsPerPage={table.getState().pagination.pageSize}
        onPageChange={(_, page) => table.setPageIndex(page)}
        onRowsPerPageChange={(e) => {
          table.setPageSize(Number(e.target.value))
        }}
        hasNext={!table.getCanNextPage()}
        hasPrev={!table.getCanPreviousPage()}
      />
    </Box>
  )
}
