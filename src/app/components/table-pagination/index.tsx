import { useCallback, useMemo } from "react"

import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"
import {
  Box,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
  Typography,
} from "@mui/material"
import type { SelectChangeEvent } from "@mui/material"
import { Stack } from "@mui/material"

import colors from "@/constant/colors"

import type { TablePaginationProps } from "./types"

const TablePagination: React.FC<TablePaginationProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  isLoading,
  unknownTotal,
  hasNext,
  hasPrev,
}) => {
  const rowsPerPageList: number[] = [5, 10, 25, 50, 100, 200]
  const desc = useMemo(() => {
    let start = rowsPerPage * (page - 1)
    if (count > 0) start += 1
    let end = start + rowsPerPage - 1
    if (end > count) end = count
    return `${start}-${end} dari ${count} Data`
  }, [page, rowsPerPage, count])

  const totalPage = useMemo(() => {
    return Math.ceil(count / rowsPerPage)
  }, [count, rowsPerPage])

  const handleRowsPerPageCHange = useCallback(
    (e: SelectChangeEvent<unknown>) => {
      onRowsPerPageChange(e, e.target.value as number)
    },
    [onRowsPerPageChange]
  )
  return (
    <Box>
      <Box
        sx={{
          display: "inline-block",
          backgroundColor: "green",
          width: "99.85%",
          border: `1px solid ${colors["general/richblack-200"]}`,
          borderTop: "none",
          borderBottomLeftRadius: "0.75rem",
          borderBottomRightRadius: "0.75rem",
          overflow: "hidden",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          p="1rem"
          sx={{
            bgcolor: "white !important",
          }}
        >
          <Box display="flex" alignItems="center" gap={"1rem"}>
            {isLoading ? (
              <Skeleton width={"15rem"} height={"1.89rem"} />
            ) : (
              <>
                <Typography variant="body2">Data Yang Ditampilkan:</Typography>
                <Select
                  value={rowsPerPage}
                  size="small"
                  onChange={handleRowsPerPageCHange}
                >
                  {rowsPerPageList.map((item) => (
                    <MenuItem value={item} key={item}>
                      <Typography variant="Body2" fontWeight={400}>
                        {item}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
          </Box>
          <Box display="flex" alignItems="center">
            {isLoading ? (
              <Skeleton width={"20rem"} height={"1.89rem"} />
            ) : (
              <>
                {unknownTotal ? (
                  <Stack direction="row">
                    <ArrowBackIos
                      color={hasPrev ? "action" : "disabled"}
                      sx={hasPrev ? { cursor: "pointer" } : {}}
                      onClick={
                        hasPrev ? (e) => onPageChange(e, page - 1) : undefined
                      }
                    />
                    <ArrowForwardIos
                      color={hasNext ? "action" : "disabled"}
                      sx={hasNext ? { cursor: "pointer" } : {}}
                      onClick={
                        hasNext ? (e) => onPageChange(e, page + 1) : undefined
                      }
                    />
                  </Stack>
                ) : (
                  <>
                    <Typography variant="Body2" fontWeight={400}>
                      {desc}
                    </Typography>
                    <Pagination
                      count={totalPage}
                      page={page}
                      onChange={onPageChange}
                    />
                  </>
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default TablePagination
