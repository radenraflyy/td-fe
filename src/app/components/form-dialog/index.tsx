import dayjs from "dayjs"
import { Controller, useForm } from "react-hook-form"

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material"

import { Check, Flag } from "@mui/icons-material"
import { useState } from "react"
import CustomDatePicker from "../custom-date-picker"
import { TodoSchemaDefault } from "./config"
import MultipleSelectChip from "../select-add"

interface DialogProps {
  open: boolean
  onClose: () => void
  onAdd: (task: {
    title: string
    description: string
    due_date: string
    tags: string[]
  }) => void
}

export default function FormDialog({ open, onClose }: DialogProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: TodoSchemaDefault,
  })

  const [priorityAnchor, setPriorityAnchor] = useState<HTMLElement | null>(null)

  const levels = [1, 2, 3, 4]

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box component="form" onSubmit={() => handleSubmit(onClose)}>
        <DialogTitle>
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                variant="standard"
                fullWidth
                placeholder="Task title…"
                {...field}
                error={Boolean(fieldState.error)}
                sx={{ fontSize: "1.5rem", fontWeight: 500 }}
                autoFocus
              />
            )}
          />
        </DialogTitle>

        <DialogContent>
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                multiline
                minRows={1}
                fullWidth
                variant="standard"
                placeholder="Description"
                sx={{ mb: 2 }}
                {...field}
                error={Boolean(fieldState.error)}
                helperText={errors.description?.message}
              />
            )}
          />

          <Controller
            name="due_date"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                value={field.value ? dayjs(field.value) : null}
                onChange={(val) =>
                  field.onChange(val ? dayjs(val).format("YYYY-MM-DD") : "")
                }
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.due_date,
                    helperText: errors.due_date?.message,
                  },
                }}
              />
            )}
          />
          <Stack mt={2}>
            <Controller
              name="label"
              control={control}
              render={({ field }) => (
                <MultipleSelectChip
                  field={field}
                  label="Labels (type @ to trigger)"
                  options={["read", "sasa"]}
                />
              )}
            />
          </Stack>
          <Stack direction="row" mt={2}>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => {
                const open = Boolean(priorityAnchor)
                const current = field.value

                return (
                  <>
                    <Chip
                      icon={<Flag />}
                      label={`P ${current}`}
                      clickable
                      onClick={(e) => setPriorityAnchor(e.currentTarget)}
                      sx={{ cursor: "pointer" }}
                    />

                    <Menu
                      anchorEl={priorityAnchor}
                      open={open}
                      onClose={() => setPriorityAnchor(null)}
                    >
                      {levels.map((lvl) => (
                        <MenuItem
                          key={lvl}
                          selected={Number(current) === lvl}
                          onClick={() => {
                            field.onChange(lvl)
                            setPriorityAnchor(null)
                          }}
                        >
                          <ListItemIcon>
                            <Flag
                              fontSize="small"
                              sx={{
                                color:
                                  lvl === 1
                                    ? "error.main"
                                    : lvl === 2
                                    ? "warning.main"
                                    : lvl === 3
                                    ? "info.main"
                                    : "success.main",
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText>Priority {lvl}</ListItemText>
                          {Number(current) === lvl && (
                            <Check fontSize="small" />
                          )}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                )
              }}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={!isValid}>
            Add Task
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}
