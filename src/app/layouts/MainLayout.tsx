import React from "react"
import { useMediaQuery, useTheme } from "@mui/material"
import { Box, Toolbar, AppBar, IconButton, Typography } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import Sidebar from "../components/sidebar"
import { Outlet } from "react-router-dom"

const drawerWidth = 250

export default function MainLayout() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [open, setOpen] = React.useState(true)

  const handleDrawerToggle = () => setOpen((prev) => !prev)

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
        aria-label="sidebar"
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
        <Outlet />
      </Box>
    </Box>
  )
}
