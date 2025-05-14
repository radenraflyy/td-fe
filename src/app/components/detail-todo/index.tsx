import { Add, RadioButtonUnchecked } from "@mui/icons-material"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import React from "react"
import CommentForm from "../comment-form"

interface FormDialogProps {
  open: boolean
  onClose: () => void
  onAdd: (data: unknown) => void
}

export default function DetailTodo({ open, onClose, onAdd }: FormDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <RadioButtonUnchecked color="disabled" />
          <TextField
            placeholder="Task title…"
            variant="standard"
            fullWidth
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
            variant="standard"
            sx={{ mb: 2 }}
          />

          <Stack direction="row" spacing={1} mb={3}>
            <CommentForm />
          </Stack>
        </Box>

        <Divider orientation="vertical" flexItem />
        <Box width={240} p={3}>
          <ListItem
            label="Date"
            endElement={
              <IconButton size="small">
                <Add />
              </IconButton>
            }
          />
          <ListItem label="Priority" endElement={<Typography>P4</Typography>} />
          <ListItem
            label="Labels"
            endElement={
              <IconButton size="small">
                <Add />
              </IconButton>
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
