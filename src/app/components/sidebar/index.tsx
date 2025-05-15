import { Add, DoorBack, Inbox, Logout, Menu } from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  colors,
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
import { useLocation } from "react-router-dom"
import { useAuth } from "@/app/hooks/use-auth"

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
  const location = useLocation()
  const { signOut } = useAuth()

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
      <Stack
        direction={"column"}
        height={"100%"}
        justifyContent={"space-between"}
        py={2}
      >
        <Box>
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
              {
                icon: <Add />,
                label: "Add task",
                action: () => setOpeModal(true),
              },
              { icon: <Inbox />, label: "Inbox", path: "/" },
            ].map(({ icon, label, action, path }) => (
              <ListItemButton
                key={label}
                onClick={action}
                sx={{
                  bgcolor:
                    location.pathname === path ? colors.grey[300] : "unset",
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                  {icon}
                </ListItemIcon>
                {open && <ListItemText primary={label} sx={{ ml: 2 }} />}
              </ListItemButton>
            ))}
          </List>
        </Box>
        <Stack direction="column" alignItems="center" px={1}>
          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            onClick={signOut}
            startIcon={<Logout color="action" />}
          >
            <Typography
              fontSize={14}
              fontWeight={600}
              sx={{
                color: "GrayText",
              }}
            >
              Logout
            </Typography>
          </Button>
        </Stack>
      </Stack>
      <FormDialog open={opeModal} onClose={() => setOpeModal(false)} />
    </Drawer>
  )
}
