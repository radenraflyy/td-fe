import React from "react"

import { Box, Button, type ButtonProps, CircularProgress } from "@mui/material"

interface PropsButtonLoading extends ButtonProps {
  loading: boolean
  text: string
}

const ButtonLoading: React.FC<PropsButtonLoading> = ({
  loading,
  text,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={loading || props.disabled}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: "absolute",
            color: "white",
          }}
        />
      )}
      <Box
        component={"span"}
        style={{ visibility: loading ? "hidden" : "visible" }}
      >
        {text}
      </Box>
    </Button>
  )
}

export default ButtonLoading
