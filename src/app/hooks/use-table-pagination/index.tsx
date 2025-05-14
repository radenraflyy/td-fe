import { useEffect, useState } from "react"

import type { SelectChangeEvent } from "@mui/material"

type Props = {
  defaultValues?: {
    rowsPerPage?: number
    page?: number
    count?: number
  }
}

const useTablePagination = (props?: Props) => {
  const [count, setCount] = useState<number>(props?.defaultValues?.count || 0)
  const [page, setPage] = useState<number>(props?.defaultValues?.page || 1)
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    props?.defaultValues?.rowsPerPage || 10
  )

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }
  const handleRowsPerPageChange = (
    _: SelectChangeEvent<unknown>,
    value: number
  ) => {
    setPage(1)
    setRowsPerPage(value)
  }

  useEffect(() => {
    PageController.setSetState(setPage)
  }, [setPage])

  return {
    count,
    setCount,
    page,
    setPage,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
  }
}

export class PageController {
  static setState: React.Dispatch<React.SetStateAction<number>>
  static setSetState(s: React.Dispatch<React.SetStateAction<number>>) {
    this.setState = s
  }
  static setPage(v: number) {
    this.setState?.(v)
  }
}

export default useTablePagination
