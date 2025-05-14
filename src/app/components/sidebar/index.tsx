import {
  Add,
  CheckCircle,
  Event,
  Inbox,
  Label,
  Menu,
  Search,
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

  console.log("open asu", open)

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
          { icon: <Add />, label: "Add task" },
          { icon: <Search />, label: "Search" },
          { icon: <Inbox />, label: "Inbox", badge: "8" },
          { icon: <Today />, label: "Today", badge: "2" },
          { icon: <Event />, label: "Upcoming" },
          { icon: <Label />, label: "Filters & Labels" },
          { icon: <CheckCircle />, label: "Completed" },
        ].map(({ icon, label, badge }) => (
          <ListItemButton key={label}>
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
    </Drawer>
  )
}
