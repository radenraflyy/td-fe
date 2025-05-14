import { forwardRef } from "react"

import {
  Button,
  DialogActions,
  FormHelperText,
  InputLabel as MuiInputLabel,
} from "@mui/material"
import { styled } from "@mui/system"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import type { PickersActionBarProps } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs"

import colors from "@/constant/colors"

import type { TCustomDatePickerProps } from "./types"

const InputLabel = styled(MuiInputLabel)(() => ({
  marginTop: "0.5rem",
  "& .MuiFormLabel-asterisk": {
    color: "red",
  },
}))

const ActionBar = (props: PickersActionBarProps) => {
  const { onAccept, onClear, className } = props
  return (
    <DialogActions
      className={className}
      sx={{ borderTop: `0.7px solid ${colors.secondary}` }}
    >
      <Button onClick={onClear} sx={{ borderRadius: "16px" }}>
        Reset
      </Button>
      <Button
        onClick={onAccept}
        variant="contained"
        sx={{ borderRadius: "16px" }}
      >
        Simpan
      </Button>
    </DialogActions>
  )
}

const CustomDatePicker = forwardRef<
  HTMLDivElement,
  TCustomDatePickerProps<Dayjs>
>((props, ref) => {
  const {
    slotProps,
    slots,
    labelText,
    requiredLabel,
    closeOnSelect,
    error,
    helperText,
    maxDate,
  } = props
  return (
    <>
      {labelText && (
        <InputLabel required={requiredLabel}>{labelText}</InputLabel>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id">
        <DatePicker
          {...props}
          ref={ref}
          maxDate={maxDate}
          closeOnSelect={closeOnSelect || false}
          slotProps={{
            day: {
              sx: {
                borderRadius: "12px",
                "&.MuiPickersDay-root.Mui-selected": {
                  backgroundColor: colors["primary"],
                },
                ":not(.Mui-selected)": {
                  backgroundColor: colors["neutral-100"],
                  borderColor: colors["primary"],
                },
                ":hover": {
                  backgroundColor: colors["neutral-300"],
                },
                ...slotProps?.day,
              },
            },
            textField: {
              placeholder: "Pilih tanggal",
              ...slotProps?.textField,
            },
            ...slotProps,
          }}
          slots={{
            actionBar: ActionBar,
            ...slots,
          }}
        />
        {error && <FormHelperText>{helperText}</FormHelperText>}
      </LocalizationProvider>
    </>
  )
})

CustomDatePicker.displayName = "CustomDatePicker"

export default CustomDatePicker
