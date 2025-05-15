import { Chip, TextField } from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"
import { useTheme } from "@mui/material/styles"
import { useState } from "react"
import type { ControllerRenderProps } from "react-hook-form"

interface MultipleSelectChipProps {
  field: ControllerRenderProps<{
    title: string
    description: string
    due_date: Date
    priority: string | undefined
    label: string | undefined
  }>
  label?: string
  options: string[]
}

export default function MultipleSelectChip({
  field,
  label = "Select Labels",
  options: initialOptions,
}: MultipleSelectChipProps) {
  const theme = useTheme()
  const [options, setOptions] = useState<string[]>(initialOptions)

  return (
    <Autocomplete
      multiple
      freeSolo
      options={options}
      value={
        Array.isArray(field.value)
          ? field.value
          : field.value
          ? [field.value]
          : []
      }
      onChange={(_, newValue) => {
        const toAdd = newValue.filter((v) => !options.includes(v))
        if (toAdd.length) setOptions((opts) => [...opts, ...toAdd])
        field.onChange(newValue)
      }}
      renderTags={(tagValue: readonly string[], getTagProps) =>
        tagValue.map((option: string, index: number) => (
          <Chip
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
            key={option}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          placeholder="Type and press Enter to add"
        />
      )}
      sx={{
        width: "100%",
        "& .MuiChip-root": {
          fontWeight: theme.typography.fontWeightMedium,
        },
      }}
    />
  )
}
