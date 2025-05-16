import { Close } from "@mui/icons-material"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material"
import { Stack } from "@mui/material"

import type { DialogModificationProps } from "./types"

const DialogWrapper: React.FC<DialogModificationProps> = (props) => (
  <Dialog
    {...props.options?.dialogProps}
    open={props.open}
    onClose={
      props.options?.closeOutsideDialog ? props.handlers?.onClose : () => {}
    }
    maxWidth={props.options?.dialogProps?.maxWidth || "sm"}
    fullWidth
  >
    {props.options?.title && (
      <>
        <DialogTitle
          sx={{
            borderBottom: 1,
            borderBottomColor: "#F7F7F7",
          }}
        >
          <Stack>
            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              flexDirection={"row"}
            >
              <Stack gap={"0.2rem"}>
                <Typography variant="Heading4" fontWeight={"bold"}>
                  {props.options?.title}
                </Typography>
                {props.options?.subtitle && (
                  <Typography variant="Body2" color={"#E7E7E7"}>
                    {props.options?.subtitle}
                  </Typography>
                )}
              </Stack>
              {!props.options.loading && !props.options?.hideCloseButton && (
                <IconButton
                  onClick={props.handlers?.onClose}
                  sx={{ alignSelf: "start" }}
                  size="small"
                >
                  <Close fontSize="small" />
                </IconButton>
              )}
            </Stack>
          </Stack>
        </DialogTitle>
        <Stack>
          <LinearProgress
            sx={{
              visibility: props.options?.loading ? "visible" : "hidden",
              transition: "height 0.3s ease",
            }}
          />
        </Stack>
      </>
    )}
    <DialogContent sx={{ pt: 0.75 }}>{props.children}</DialogContent>
    {props.options?.footer && (
      <DialogActions
        sx={{
          borderTop: !props.options?.hideBorderAction ? 1 : undefined,
          borderTopColor: !props.options?.hideBorderAction
            ? "#E7E7E7"
            : undefined,
          paddingX: 3,
          paddingY: 2,
        }}
      >
        {props.options?.footer}
      </DialogActions>
    )}
    {(props.options?.leftButtonTitle || props.options?.rightButtonTitle) && (
      <DialogActions
        sx={{
          borderTop: !props.options?.hideBorderAction ? 1 : undefined,
          borderTopColor: !props.options?.hideBorderAction
            ? "#E7E7E7"
            : undefined,
          paddingX: 3,
          paddingY: 2,
        }}
      >
        {props.options?.leftButtonTitle && (
          <Button
            data-test={"left-button-dialog"}
            onClick={props.handlers?.onLeftButtonClick}
            variant={props.options?.leftButtonVariant || "text"}
            loading={props.options?.leftButtonLoading}
            disabled={props.options?.leftButtonDisable}
          >
            <Typography variant="Heading4" fontWeight={"500"} color={"#06418A"}>
              {props.options?.leftButtonTitle}
            </Typography>
          </Button>
        )}
        {props.options?.leftButtonCustom && props.options?.leftButtonCustom}
        {props.options?.rightButtonTitle && (
          <Button
            data-test={"right-button-dialog"}
            onClick={props.handlers?.onRightButtonClick}
            variant={props.options?.rightButtonVariant || "contained"}
            loading={props.options?.rightButtonLoading}
            disabled={props.options?.rightButtonDisable}
            autoFocus
          >
            <Typography variant="Heading4" fontWeight={"500"}>
              {props.options?.rightButtonTitle}
            </Typography>
          </Button>
        )}
      </DialogActions>
    )}
  </Dialog>
)

export default DialogWrapper
