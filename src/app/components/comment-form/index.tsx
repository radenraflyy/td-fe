import { ExpandLess, ExpandMore } from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import React, { useState } from "react"

interface Comment {
  id: number
  author: string
  avatarColor: string
  timestamp: string
  text: string
}

const sampleComments: Comment[] = [
  {
    id: 1,
    author: "Raden R.",
    avatarColor: "#000",
    timestamp: "Today 17:00",
    text: "sasa",
  },
  {
    id: 2,
    author: "Raden R.",
    avatarColor: "#000",
    timestamp: "Today 17:00",
    text: "sasasa",
  },
]

export default function CollapsibleComments() {
  const [open, setOpen] = useState(true)
  const [comments, setComments] = useState<Comment[]>(sampleComments)
  const [newText, setNewText] = useState("")

  const handleToggle = () => setOpen((o) => !o)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newText.trim()) return
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: "You",
        avatarColor: "#1976d2",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        text: newText.trim(),
      },
    ])
    setNewText("")
  }

  return (
    <Box width={"100%"}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        onClick={handleToggle}
        sx={{ cursor: "pointer", userSelect: "none", py: 1 }}
      >
        <Typography variant="subtitle2">Comments {comments.length}</Typography>
        <IconButton size="small">
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Stack>
      <Divider />

      <Collapse in={open && comments.length > 0}>
        <Box sx={{ mt: 1, mb: 2 }}>
          {comments.map((c) => (
            <Box key={c.id} sx={{ mb: 2 }}>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <Avatar
                  sx={{ bgcolor: c.avatarColor, width: 32, height: 32 }}
                />
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="subtitle2">{c.author}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {c.timestamp}
                    </Typography>
                  </Stack>
                  <Typography variant="body2">{c.text}</Typography>
                </Box>
              </Stack>
            </Box>
          ))}
        </Box>
      </Collapse>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Stack
          direction="row"
          alignItems="flex-start"
          spacing={1}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
            p: 1,
          }}
        >
          <Avatar sx={{ bgcolor: "text.primary", width: 32, height: 32 }} />

          <TextField
            placeholder="Comment"
            variant="standard"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            multiline
            minRows={1}
            sx={{ flex: 1, "& .MuiInput-root": { px: 1 } }}
            InputProps={{ disableUnderline: true }}
          />

          <Stack direction="row" spacing={1} sx={{ ml: "auto", mt: 0.5 }}>
            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={!newText.trim()}
            >
              Comment
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
