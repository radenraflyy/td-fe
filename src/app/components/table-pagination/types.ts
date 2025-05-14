import type { ChangeEvent } from "react"

import type { SelectChangeEvent } from "@mui/material"

export type TablePaginationProps = {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (e: ChangeEvent<unknown>, page: number) => void
  onRowsPerPageChange: (e: SelectChangeEvent<unknown>, value: number) => void
  isLoading?: boolean
  unknownTotal?: boolean
  hasNext?: boolean
  hasPrev?: boolean
}
