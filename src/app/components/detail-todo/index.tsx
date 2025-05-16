import useQueryApiRequest from "@/app/hooks/useApiRequest/useQueryApiRequest"
import { formatDateTime } from "@/app/utils/formatDate"
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
import React from "react"
import CommentForm from "../comment-form"
import type {
  FormDialogProps,
  GetDetailTodoResponse,
  TodoComment,
} from "./type"

export default function DetailTodo({ info, onClose, onAdd }: FormDialogProps) {
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

  const commentsWithName: TodoComment[] = data?.comment
    ? data.comment.map((c) => ({
        name: data.name,
        comment: c.comment,
        created_at: c.created_at,
      }))
    : []
  return (
    <Dialog open={info.open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Checkbox checked={data?.is_done} disableRipple disabled />
          <TextField
            placeholder="Task title…"
            variant="standard"
            fullWidth
            defaultValue={data?.title}
            InputProps={{ disableUnderline: true }}
            sx={{ fontSize: "1.5rem", fontWeight: 500 }}
          />
        </Stack>
      </DialogTitle>

      <DialogContent dividers sx={{ display: "flex", p: 0 }}>
        <Box flex={1} p={3}>
          <TextField
            placeholder="Description"
            multiline
            minRows={1.5}
            fullWidth
            defaultValue={data?.description}
            variant="standard"
            sx={{ mb: 2 }}
          />

          <Stack direction="row" spacing={1} mb={3}>
            <CommentForm comments={commentsWithName} todoId={info.todoId} />
          </Stack>
        </Box>

        <Divider orientation="vertical" flexItem />
        <Box width={240} p={3}>
          <ListItem
            label="Date"
            endElement={
              <Typography variant="body2">
                {data?.due_date ? formatDateTime(data.due_date) : "–"}
              </Typography>
            }
          />
          <ListItem
            label="Priority"
            endElement={<Typography>Priority {data?.priority}</Typography>}
          />
          <ListItem
            label="Labels"
            endElement={
              <Stack direction="column" spacing={1} alignItems={"flex-end"}>
                {data?.label?.map((label, idx) => (
                  <Typography key={label.Id} variant="body2">
                    {idx + 1}. {label.Name} || '-'
                  </Typography>
                ))}
              </Stack>
            }
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={() => onAdd({})}>
          Add task
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function ListItem({
  label,
  endElement,
}: {
  label: string
  endElement: React.ReactNode
}) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      {endElement}
    </Box>
  )
}
