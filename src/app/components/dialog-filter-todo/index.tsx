import CloseIcon from "@mui/icons-material/Close"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import { useState } from "react"
import CustomDatePicker from "../custom-date-picker"
import type { ColumnFiltersState } from "@tanstack/react-table"

export interface LabelOption {
  label: string
  value: string | number | boolean
}

interface FilterDialogProps {
  open: boolean
  onClose: () => void
  onApply: (filters: ColumnFiltersState) => void
}

export default function FilterDialog({
  open,
  onClose,
  onApply,
}: FilterDialogProps) {
  const statusOptions: LabelOption[] = [
    { value: false, label: "Not Done" },
    { value: true, label: "Done" },
  ]
  const priorityOptions: LabelOption[] = [
    {
      value: 1,
      label: "Priority 1",
    },
    {
      value: 2,
      label: "Priority 2",
    },
    {
      value: 3,
      label: "Priority 3",
    },
    {
      value: 4,
      label: "Priority 4",
    },
  ]

  const [filtering, setFiltering] = useState<{
    priority: string
    status: string
    selectedDate: Dayjs | null
  }>({
    priority: "",
    status: "",
    selectedDate: null,
  })

  const handleReset = () => {
    setFiltering({
      priority: "",
      status: "",
      selectedDate: null,
    })
    onApply([])
    onClose()
  }

  const handleApply = () => {
    const filters: ColumnFiltersState = []

    if (filtering.priority)
      filters.push({ id: "priority", value: Number(filtering.priority) })
    if (filtering.status)
      filters.push({ id: "is_done", value: filtering.status === "true" })
    if (filtering.selectedDate)
      filters.push({ id: "due_date", value: filtering.selectedDate })

    onApply(filters)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Filter
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3} mt={1}>
          <FormControl fullWidth size="small" variant="outlined">
            <Typography variant="body2">Status</Typography>
            <Select
              labelId="status-label"
              value={filtering.status}
              onChange={(e) =>
                setFiltering({ ...filtering, status: e.target.value })
              }
              displayEmpty
            >
              {statusOptions.map((opt, index) => (
                <MenuItem key={index} value={String(opt.value)}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" variant="outlined">
            <Typography variant="body2">Priority</Typography>
            <Select
              labelId="priority-label"
              value={filtering.priority}
              onChange={(e) =>
                setFiltering({ ...filtering, priority: e.target.value })
              }
              displayEmpty
            >
              {priorityOptions.map((opt, index) => (
                <MenuItem key={index} value={String(opt.value)}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" variant="outlined">
            <Typography variant="body2">Due Date</Typography>
            <CustomDatePicker
              value={filtering.selectedDate}
              onChange={(newValue) =>
                setFiltering({ ...filtering, selectedDate: newValue })
              }
              requiredLabel={true}
              error={false}
              helperText=""
              maxDate={dayjs().add(1, "year")}
            />
          </FormControl>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, justifyContent: "space-between" }}>
        <Button color="error" onClick={handleReset}>
          Hapus Filter
        </Button>
        <Button variant="contained" color="error" onClick={handleApply}>
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  )
}
