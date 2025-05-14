// mui-theme.ts
import type { CSSProperties } from "react"
import { createTheme } from "@mui/material/styles"
import { colors } from "@mui/material"

declare module "@mui/material/styles" {
  interface TypographyVariantsOptions {
    Display1?: CSSProperties
    Display2?: CSSProperties
    Display3?: CSSProperties
    Display4?: CSSProperties
    Heading1?: CSSProperties
    Heading2?: CSSProperties
    Heading3?: CSSProperties
    Heading4?: CSSProperties
    Body1?: CSSProperties
    Body2?: CSSProperties
    Body3?: CSSProperties
    Body4?: CSSProperties
  }

  interface TypographyVariants {
    Display1: CSSProperties
    Display2: CSSProperties
    Display3: CSSProperties
    Display4: CSSProperties
    Heading1: CSSProperties
    Heading2: CSSProperties
    Heading3: CSSProperties
    Heading4: CSSProperties
    Body1: CSSProperties
    Body2: CSSProperties
    Body3: CSSProperties
    Body4: CSSProperties
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    Display1: true
    Display2: true
    Display3: true
    Display4: true
    Heading1: true
    Heading2: true
    Heading3: true
    Heading4: true
    Body1: true
    Body2: true
    Body3: true
    Body4: true
  }
}

export const muiTheme = createTheme({
  typography: {
    fontFamily: "'Nunito', sans-serif",
  },
  palette: {
    error: {
      main: colors.red[500],
      light: colors.red[300],
      dark: colors.red[700],
    },
    warning: {
      main: colors.orange[500],
      light: colors.orange[300],
      dark: colors.orange[700],
    },
    secondary: {
      main: colors.grey[500],
      light: colors.grey[300],
      dark: colors.grey[700],
    },
  },
})
