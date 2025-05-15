import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Outlet />
    </Box>
  )
}
