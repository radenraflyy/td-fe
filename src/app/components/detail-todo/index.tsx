import useQueryApiRequest from "@/app/hooks/useApiRequest/useQueryApiRequest"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import dayjs from "dayjs"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import CommentForm from "../comment-form"
import CustomDatePicker from "../custom-date-picker"
import { InputSelectedChip } from "../input-select-chip"
import MultipleSelectChip, { type LabelOption } from "../select-add"
import { TodoSchema } from "./config"
import type {
  FormDialogProps,
  GetDetailTodoResponse,
  TodoComment,
} from "./type"
import useMutationApiRequest from "@/app/hooks/useApiRequest/useMutationApiRequest"

export default function DetailTodo({ info, onClose }: FormDialogProps) {
  const { data } = useQueryApiRequest<GetDetailTodoResponse>({
    key: "detail-todo",
    options: {
      enabled: info.open,
    },
    config: {
      params: {
        todo_id: info.todoId,
      },
    },
  })

  const { data: listLabels } = useQueryApiRequest<LabelOption[]>({
    key: "list-labels",
  })

  const { mutateAsync } = useMutationApiRequest({
    key: "update-detail-todo",
    config: {
      params: {
        todo_id: info.todoId,
      },
    },
  })

  const commentsWithName: TodoComment[] = data?.comment
    ? data.comment.map((c) => ({
        name: data.name,
        comment: c.comment,
        created_at: c.created_at,
      }))
    : []

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(TodoSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync(data)
      onClose()
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    reset({
      title: data?.title,
      description: data?.description,
      due_date: data?.due_date ? new Date(data.due_date) : undefined,
      priority: data?.priority,
      label: data?.label?.map((l) => l.Id) || [],
    })
  }, [
    data?.description,
    data?.due_date,
    data?.label,
    data?.priority,
    data?.title,
    reset,
  ])

  return (
    <Dialog open={info.open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Checkbox checked={data?.is_done} disableRipple disabled />
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <TextField
                placeholder="Task title…"
                variant="standard"
                fullWidth
                {...field}
                InputProps={{ disableUnderline: true }}
                sx={{ fontSize: "1.5rem", fontWeight: 500 }}
              />
            )}
          />
        </Stack>
      </DialogTitle>

      <DialogContent dividers sx={{ display: "flex", p: 0 }}>
        <Box flex={1} p={3}>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextField
                placeholder="Description"
                multiline
                {...field}
                minRows={1.5}
                fullWidth
                variant="standard"
                sx={{ mb: 2 }}
              />
            )}
          />

          <Stack direction="row" spacing={1} mb={3}>
            <CommentForm comments={commentsWithName} todoId={info.todoId} />
          </Stack>
        </Box>

        <Divider orientation="vertical" flexItem />
        <Box width={240} p={3}>
          <Stack direction="column" spacing={1} mb={2}>
            <Typography variant="subtitle2" component="label">
              Due Date
            </Typography>
            <Controller
              name="due_date"
              control={control}
              render={({ field, fieldState }) => (
                <CustomDatePicker
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(val) =>
                    field.onChange(val ? dayjs(val).format("YYYY-MM-DD") : "")
                  }
                  slotProps={{
                    textField: {
                      error: Boolean(fieldState.error),
                      helperText: fieldState.error?.message,
                    },
                  }}
                />
              )}
            />
          </Stack>
          <Stack direction="column" spacing={1} mb={2}>
            <Typography variant="subtitle2" component="label">
              Priority
            </Typography>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <InputSelectedChip
                  value={field.value ? Number(field.value) : undefined}
                  onChange={field.onChange}
                />
              )}
            />
          </Stack>
          <Stack direction="column" spacing={1}>
            <Typography variant="subtitle2" component="label">
              Labels
            </Typography>
            <Controller
              name="label"
              control={control}
              render={({ field }) => (
                <MultipleSelectChip field={field} options={listLabels || []} />
              )}
            />
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={!isDirty}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}
