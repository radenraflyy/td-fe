import "@/app/styles/font.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "@/app/App"
import { ThemeProvider } from "@mui/material"
import { muiTheme } from "../constant/mui-theme"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={muiTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>
)
