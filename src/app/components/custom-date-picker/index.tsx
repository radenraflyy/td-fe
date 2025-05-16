import { forwardRef } from "react"

import { FormHelperText, InputLabel as MuiInputLabel } from "@mui/material"
import { styled } from "@mui/system"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs"


import colorsPalette from "@/constant/colors"
import type { TCustomDatePickerProps } from "./types"

const InputLabel = styled(MuiInputLabel)(() => ({
  marginTop: "0.5rem",
  "& .MuiFormLabel-asterisk": {
    color: "red",
  },
}))

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
            actionBar: {
              actions: ["clear", "accept"],
            },
            day: {
              sx: {
                borderRadius: "12px",
                "&.MuiPickersDay-root.Mui-selected": {
                  backgroundColor: colorsPalette["winter-wizard-500"],
                },
                ":not(.Mui-selected)": {
                  backgroundColor: colorsPalette["richblack-200"],
                  borderColor: colorsPalette["winter-wizard-500"],
                },
                ":hover": {
                  backgroundColor: colorsPalette["richblack-100"],
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
