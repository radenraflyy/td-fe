import dayjs from "dayjs"
import { Controller, useForm } from "react-hook-form"

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material"

import useMutationApiRequest from "@/app/hooks/useApiRequest/useMutationApiRequest"
import useQueryApiRequest from "@/app/hooks/useApiRequest/useQueryApiRequest"
import { yupResolver } from "@hookform/resolvers/yup"
import { AxiosError } from "axios"
import ButtonLoading from "../ButtonLoading"
import CustomDatePicker from "../custom-date-picker"
import { InputSelectedChip } from "../input-select-chip"
import MultipleSelectChip, { type LabelOption } from "../select-add"
import { SnackBarResultController } from "../snackbar"
import { type Todo, TodoSchema } from "./config"

interface DialogProps {
  open: boolean
  onClose: () => void
}

export default function FormDialog({ open, onClose }: DialogProps) {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(TodoSchema),
  })

  const { data: listLabels } = useQueryApiRequest<LabelOption[]>({
    key: "list-labels",
  })
  const { mutateAsync, isPending } = useMutationApiRequest<Todo>({
    key: "create-todos",
  })

  const onSubmit = handleSubmit((data) => {
    try {
      console.log("data", data)
      mutateAsync(data)
      reset()
      onClose()
    } catch (error) {
      if (error instanceof AxiosError) {
        SnackBarResultController.open({
          content: error.response?.data.error,
          variant: "error",
          closeDuration: 3000,
          snackbarOrigin: { horizontal: "center", vertical: "top" },
        })
      }
    }
  })

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box component="form" onSubmit={onSubmit}>
        <DialogTitle>
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Typography variant="subtitle2" component="label">
                  Title
                </Typography>
                <TextField
                  variant="standard"
                  fullWidth
                  placeholder="Task title…"
                  {...field}
                  error={Boolean(fieldState.error)}
                  sx={{ fontSize: "1.5rem", fontWeight: 500 }}
                  autoFocus
                />
              </>
            )}
          />
        </DialogTitle>

        <DialogContent>
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Typography variant="subtitle2" component="label">
                  Description
                </Typography>
                <TextField
                  multiline
                  minRows={1}
                  fullWidth
                  variant="standard"
                  placeholder="Description"
                  sx={{ mb: 2 }}
                  {...field}
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                />
              </>
            )}
          />

          <Controller
            name="due_date"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <Typography variant="subtitle2" component="label">
                  Due Date
                </Typography>
                <CustomDatePicker
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(val) =>
                    field.onChange(val ? dayjs(val).format("YYYY-MM-DD") : "")
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: Boolean(fieldState.error),
                      helperText: fieldState.error?.message,
                    },
                  }}
                />
              </>
            )}
          />
          <Stack mt={2}>
            <Controller
              name="label"
              control={control}
              render={({ field }) => (
                <>
                  <Typography variant="subtitle2" component="label">
                    Label
                  </Typography>
                  <MultipleSelectChip
                    field={field}
                    options={listLabels || []}
                  />
                </>
              )}
            />
          </Stack>
          <Stack direction="row" mt={2}>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => {
                return (
                  <Box display={"flex"} flexDirection={"column"} gap={0.5}>
                    <Typography variant="subtitle2" component="label">
                      Priority
                    </Typography>
                    <InputSelectedChip
                      value={field.value ? Number(field.value) : undefined}
                      onChange={field.onChange}
                    />
                  </Box>
                )
              }}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <ButtonLoading
            type="submit"
            variant="contained"
            disabled={!isValid}
            loading={isPending}
            text={"Add Task"}
          />
        </DialogActions>
      </Box>
    </Dialog>
  )
}
