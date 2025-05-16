import type { Theme } from "@emotion/react"
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/700.css"
import {
  type Components,
  type CssVarsTheme,
  type Palette,
  type TypographyVariantsOptions,
  createTheme,
} from "@mui/material/styles"
import colorsPalette from "./colors"
declare module "@mui/material/styles" {
  interface TypographyVariantsOptions {
    Display1?: React.CSSProperties
    Display2?: React.CSSProperties
    Display3?: React.CSSProperties
    Display4?: React.CSSProperties
    Heading1?: React.CSSProperties
    Heading2?: React.CSSProperties
    Heading3?: React.CSSProperties
    Heading4?: React.CSSProperties
    Body1?: React.CSSProperties
    Body2?: React.CSSProperties
    Body3?: React.CSSProperties
    Body4?: React.CSSProperties
  }
}
declare module "@mui/material" {
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

declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    neutral: true
    white: true
  }
}

const muiTypographyTheme:
  | TypographyVariantsOptions
  | ((palette: Palette) => TypographyVariantsOptions)
  | undefined = {
  fontFamily: "Poppins",
  button: {
    textTransform: "none",
    color: colorsPalette["richblack-300"],
  },
  Display1: {
    fontSize: "3.375rem !important",
    lineHeight: "4.725rem !important",
  },
  Display2: {
    fontSize: "3rem !important",
    lineHeight: "4.2rem !important",
  },
  Display3: {
    fontSize: "2rem !important",
    lineHeight: "2.8rem !important",
  },
  Display4: {
    fontSize: "1.75rem !important",
    lineHeight: "2.45rem !important",
  },
  Heading1: {
    fontSize: "1.5rem !important",
    fontWeight: 700,
    lineHeight: "2.1rem !important",
  },
  Heading2: {
    fontSize: "1.25rem !important",
    lineHeight: "1.75rem !important",
  },
  Heading3: {
    fontSize: "1.125rem !important",
    lineHeight: "1.35rem !important",
  },
  Heading4: { fontSize: "1rem !important", lineHeight: "1.2rem !important" },
  Body1: {
    fontSize: "0.875rem !important",
    lineHeight: "1.313rem !important",
  },
  Body2: {
    fontSize: "0.75rem !important",
    lineHeight: "1.125rem !important",
  },
  Body3: {
    fontSize: "0.688rem !important",
    lineHeight: "1.031rem !important",
  },
  Body4: {
    fontSize: "0.625rem !important",
    lineHeight: "0.938rem !important",
  },
  allVariants: {
    color: `${colorsPalette["richblack-500"]}`,
  },
}
const muiComponentsDesktopTheme:
  | Components<Omit<Theme, "components" | "palette"> & CssVarsTheme>
  | undefined = {
  MuiTable: {
    styleOverrides: {
      root: {
        border: `0px`,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: "none",
      },
    },
  },

  MuiPopover: {
    styleOverrides: {
      paper: {
        boxShadow: "none",
        borderRadius: "0.5rem",
        paddingRight: "0.4rem !important",
        paddingLeft: "0.4rem !important",
        paddingTop: "0.5rem !important",
        paddingBottom: "0.5rem !important",
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        // fontFamily,
        backgroundColor: "#000",
        color: "#fff",
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      sx: {
        borderRadius: "0.5rem",
        bgcolor: "white",
        "& .MuiInputBase-root.Mui-disabled": {
          bgcolor: colorsPalette["richblack-100"],
        },
      },
    },
  },
  MuiButton: {
    variants: [
      {
        props: { variant: "outlined" },
        style: {
          "--variant-outlinedBorder": colorsPalette["richblack-200"],
          color: `${colorsPalette["richblack-500"]} !important`,
          "&:hover": {
            color: `${colorsPalette["richblack-400"]} !important`,
            borderColor: colorsPalette["richblack-200"],
          },
        },
      },
      {
        props: { variant: "text" },
        style: {
          color: `${colorsPalette["midnight-blue-500"]} !important`,
        },
      },
      {
        props: { variant: "contained" },
        style: {
          backgroundColor: `${colorsPalette["winter-wizard-500"]} `,
          color: `${colorsPalette["richblack-500"]} !important`,
        },
      },
    ],
    defaultProps: {
      sx: {
        borderRadius: "0.5rem",
        padding: "12px 24px 12px 24px",
        height: "2.813rem",
        boxShadow: "none",
        "&.MuiButton-sizeSmall": {
          height: "2.313rem",
        },
      },
    },
  },
  MuiInputLabel: {
    defaultProps: {
      sx: {
        fontSize: "0.75rem",
        marginBottom: "0.4rem",
        marginTop: "1rem",
        color: colorsPalette["richblack-300"],
        "& .MuiFormLabel-asterisk": {
          marginLeft: "0.1rem",
          color: "red",
        },
      },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        "& fieldset": {
          borderColor: colorsPalette["richblack-300"],
          borderRadius: "0.5rem !important",
        },
        fontSize: "0.875rem !important",
        lineHeight: "1.313rem !important",
      },
    },
  },

  MuiFormHelperText: {
    styleOverrides: {
      root: {
        // fontFamily,
        position: "absolute",
        bottom: "-1.6em",
        marginLeft: 0,
        color: colorsPalette["pomegranate-500"],
      },
    },
  },

  MuiSelect: {
    defaultProps: {
      sx: {
        padding: "10px, 16px, 10px, 16px",
        borderColor: colorsPalette["richblack-200"],
        backgroundColor: "#FFFFFF",
        borderRadius: "0.5rem",
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        "&.MuiPopover-paper": {
          padding: 0,
        },
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      list: {
        padding: 0,
        "&:hover": {
          borderRadius: "0.5rem",
        },
      },
      root: {
        "& .Mui-selected": {
          borderRadius: "0.5rem",
          backgroundColor: `${colorsPalette["richblack-100"]} !important`,
          color: colorsPalette["richblack-300"],
        },
        "& .MuiMenuItem-root:hover": {
          borderRadius: "0.5rem",
        },
        marginBottom: "2rem",
      },
    },
  },

  MuiDialog: {
    styleOverrides: {
      root: {
        "& .MuiPaper-root": {
          borderRadius: "0.75rem",
          overflow: "hidden",
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: 700,
      },
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        paddingLeft: "1.5rem !important",
        paddingRight: "1.5rem !important",
      },
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      listbox: {
        padding: 0,
        '& .MuiAutocomplete-option[aria-selected="true"]': {
          borderRadius: "0.5rem",
          backgroundColor: `${colorsPalette["richblack-100"]} !important`,
          color: colorsPalette["richblack-300"],
        },
      },
    },
  },
  MuiTableContainer: {
    styleOverrides: {
      root: {
        width: "100%",
        overflowX: "auto",
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        "&.MuiTableRow-hover:hover": {
          cursor: "pointer",
          transition: "background-color 0.2s ease-in-out",
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: colorsPalette["richblack-100"],
          },
          "&:active": {
            backgroundColor: colorsPalette["richblack-200"],
          },
        },
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E6E6E8",
      },
    },
  },
  MuiCheckbox: {
    defaultProps: {
      sx: {
        "&.Mui-checked": {
          color: "white",
        },
        "&.MuiSvgIcon-root": {
          backgroundColor: "red",
        },

        "&.Mui-checked .MuiSvgIcon-root": {
          backgroundColor: colorsPalette["winter-wizard-500"],
          borderRadius: "0.2rem",
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        fontFamily: "Poppins, sans-serif",
        fontSize: "0.75rem",
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        fontFamily: "Poppins, sans-serif",
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        fontFamily: "Poppins, sans-serif",
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        fontFamily: "Poppins, sans-serif",
      },
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: {
        fontFamily: "Poppins, sans-serif",
      },
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: {
        fontFamily: "Poppins, sans-serif",
      },
    },
  },
}
export const muiTheme = createTheme({
  shape: {
    borderRadius: 5,
  },
  palette: {
    primary: {
      main: colorsPalette["winter-wizard-500"],
    },
    secondary: {
      main: colorsPalette["richblack-300"],
    },
    success: {
      main: colorsPalette.emerald,
    },
    error: {
      main: colorsPalette["pomegranate-500"],
    },
  },
  typography: muiTypographyTheme,
  components: muiComponentsDesktopTheme,
})
