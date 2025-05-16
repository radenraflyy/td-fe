import React, { useEffect, useImperativeHandle, useRef, useState } from "react"

import {
  Snackbar,
  type SnackbarOrigin,
  Stack,
  Typography
} from "@mui/material"

import ErrorAnimate from "@/assets/gifs/error_animate_no_background.gif"
import SuccessAnimate from "@/assets/gifs/success_animate_no_background.gif"

type TSnackBarProps = {
  variant: "success" | "error"
  content: string
  closeDuration?: number
  snackbarOrigin?: SnackbarOrigin
}
type PSnackBarRef = {
  open(props: TSnackBarProps): void
}

const SnackBarCustom = () => {
  const [open, setOpen] = React.useState(false)
  const [property, setProperty] = useState<TSnackBarProps>()
  const snackBarRef = useRef<PSnackBarRef>(null)

  useImperativeHandle(snackBarRef, () => ({
    open(props: TSnackBarProps) {
      setProperty({ ...props })
      setOpen(true)
    },
  }))

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    new SnackBarResultController(snackBarRef)
  }, [snackBarRef])

  return (
    <Snackbar
      anchorOrigin={
        property?.snackbarOrigin || { horizontal: "center", vertical: "bottom" }
      }
      open={open}
      autoHideDuration={property?.closeDuration || 5000}
      onClose={handleClose}
    >
      <Stack
        flexDirection={"row"}
        gap={"1rem"}
        alignItems={"center"}
        bgcolor={"#0A0B0D"}
        px={"1rem"}
        py={"0.75rem"}
        borderRadius={"0.83rem"}
        maxWidth={"21.25rem"}
      >
        <img
          src={property?.variant === "error" ? ErrorAnimate : SuccessAnimate}
          alt={"icon"}
          style={{ width: "20px", height: "20px" }}
          height={20}
          width={20}
        />
        {typeof property?.content == "string" ? (
          <Typography
            fontSize={"12px"}
            lineHeight={"18px"}
            fontWeight={600}
            align="center"
            sx={{
              color: "white !important",
              overflowWrap: "break-word",
              wordBreak: "break-word",
              whiteSpace: "normal",
            }}
          >
            {property?.content}
          </Typography>
        ) : (
          property?.content
        )}
      </Stack>
    </Snackbar>
  )
}

export class SnackBarResultController {
  private static snackBarRef: React.RefObject<PSnackBarRef | null>

  constructor(ref: React.RefObject<PSnackBarRef | null>) {
    SnackBarResultController.snackBarRef = ref
  }

  static open = (props: TSnackBarProps) => {
    SnackBarResultController.snackBarRef.current?.open(props)
  }
}

export default SnackBarCustom
