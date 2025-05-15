import "@/app/styles/font.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "@/app/App"
import { ThemeProvider } from "@mui/material"
import { muiTheme } from "../constant/mui-theme"
import QueryClientProviderWrapper from "./providers/query-client-provider"
import { BrowserRouter } from "react-router-dom"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProviderWrapper>
        <ThemeProvider theme={muiTheme}>
          <App />
        </ThemeProvider>
      </QueryClientProviderWrapper>
    </BrowserRouter>
  </StrictMode>
)
