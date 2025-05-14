// AppLayout.tsx
import MenuIcon from "@mui/icons-material/Menu"
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import React from "react"
import Sidebar from "./components/sidebar"
import UserTable from "./components/table"
import SearchBar from "./components/searchbar"

const drawerWidth = 250

export default function AppLayout() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [open, setOpen] = React.useState(true)

  const handleDrawerToggle = () => {
    setOpen((o) => !o)
  }

  console.log("RENDER USER APP")

  return (
    <Box sx={{ display: "flex" }}>
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{ zIndex: theme.zIndex.drawer + 1 }}
          color="default"
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              TODO ORIST
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Box
        component="nav"
        sx={{
          width: { md: open ? drawerWidth : "100" },
          flexShrink: { md: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Sidebar
          variant={isMobile ? "temporary" : "persistent"}
          open={open}
          onClose={handleDrawerToggle}
        />
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: isMobile ? theme.mixins.toolbar.minHeight : 0,
        }}
      >
        {isMobile && <Toolbar />}

        <SearchBar />
        <UserTable />
      </Box>
    </Box>
  )
}
