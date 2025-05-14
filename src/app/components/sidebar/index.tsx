import {
  Add,
  CheckCircle,
  Event,
  Inbox,
  Label,
  Menu,
  Today,
} from "@mui/icons-material"
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { useState } from "react"
import FormDialog from "../form-dialog"

const drawerWidth = 250
const miniWidth = 56

interface SidebarProps {
  variant: "persistent" | "temporary"
  open: boolean
  onClose: () => void
}

export default function Sidebar({ variant, open, onClose }: SidebarProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [opeModal, setOpeModal] = useState(false)

  return (
    <Drawer
      variant={variant}
      open={isMobile ? open : true}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        "&.MuiDrawer-root": {
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
        width: open ? drawerWidth : miniWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        "& .MuiDrawer-paper": {
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          width: open ? drawerWidth : miniWidth,
          boxSizing: "border-box",
          overflowX: "hidden",
          backgroundColor: "#FCFAF8",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          p: 1,
        }}
      >
        {open && (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar />
            <Typography variant="h6">Raden</Typography>
          </Stack>
        )}
        <IconButton onClick={onClose} size="small">
          <Menu />
        </IconButton>
      </Box>

      <List>
        {[
          { icon: <Add />, label: "Add task", action: () => setOpeModal(true) },
          { icon: <Inbox />, label: "Inbox", badge: "8", action: () => {} },
          { icon: <Today />, label: "Today", badge: "2", action: () => {} },
          { icon: <Event />, label: "Upcoming", action: () => {} },
          { icon: <Label />, label: "Filters & Labels", action: () => {} },
          { icon: <CheckCircle />, label: "Completed", action: () => {} },
        ].map(({ icon, label, badge, action }) => (
          <ListItemButton key={label} onClick={action}>
            <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
              {icon}
            </ListItemIcon>
            {open && <ListItemText primary={label} sx={{ ml: 2 }} />}
            {open && badge && (
              <Typography variant="body2" color="secondary" sx={{ ml: "auto" }}>
                {badge}
              </Typography>
            )}
          </ListItemButton>
        ))}
      </List>
      <FormDialog
        open={opeModal}
        onAdd={() => setOpeModal(false)}
        onClose={() => setOpeModal(false)}
      />
    </Drawer>
  )
}
