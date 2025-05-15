import App from "@/app/App"
import "@/app/styles/font.css"
import { ThemeProvider } from "@mui/material"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { muiTheme } from "../constant/mui-theme"
import QueryClientProviderWrapper from "./providers/query-client-provider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProviderWrapper>
      <ThemeProvider theme={muiTheme}>
        <App />
      </ThemeProvider>
    </QueryClientProviderWrapper>
  </StrictMode>
)
