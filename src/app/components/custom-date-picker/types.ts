import type { DatePickerProps } from "@mui/x-date-pickers"
import { Dayjs } from "dayjs"

export type TCustomDatePickerProps<TDate extends Dayjs> = Omit<
  DatePickerProps<TDate>,
  "label"
> & {
  labelText?: string
  requiredLabel?: boolean
  error?: boolean
  helperText?: string | null
  maxDate?: Dayjs
}
