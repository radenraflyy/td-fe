import useMutationApiRequest from "@/app/hooks/useApiRequest/useMutationApiRequest"
import { Chip, TextField } from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"
import { useTheme } from "@mui/material/styles"
import { useState, useRef } from "react"
import type { ControllerRenderProps } from "react-hook-form"

export interface LabelOption {
  id: string
  name: string
}

interface MultipleSelectChipProps {
  field: ControllerRenderProps<{
    title: string
    description: string
    due_date: Date
    priority: string | undefined
    label: (string | undefined)[] | undefined
  }>
  options: LabelOption[]
}

export default function MultipleSelectChip({
  field,
  options,
}: MultipleSelectChipProps) {
  const theme = useTheme()
  const [inputValue, setInputValue] = useState("")
  const idToName = new Map(options.map((opt) => [opt.id, opt.name]))
  const selectedIds: string[] = (
    Array.isArray(field.value) ? field.value : []
  ).filter((id): id is string => typeof id === "string")
  const selectedOptions = selectedIds
    .map((id) => (idToName.has(id) ? { id, name: idToName.get(id)! } : null))
    .filter((opt): opt is LabelOption => opt !== null)
  const loadingRef = useRef(false)

  const { mutateAsync } = useMutationApiRequest<{ id: string; name: string }>({
    key: "create-label",
  })
  const createLabelApi = async (newLabel: string) => {
    const {
      data: { id, name },
    } = await mutateAsync({ name: newLabel })
    return { id, name }
  }

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key === "Enter" &&
      inputValue.trim() !== "" &&
      !options.some((opt) => opt.name === inputValue.trim())
    ) {
      event.preventDefault()

      if (loadingRef.current) return

      loadingRef.current = true

      try {
        const newLabel = await createLabelApi(inputValue.trim())
        const newSelectedIds = [...selectedIds, newLabel.id]

        field.onChange(newSelectedIds)
        setInputValue("")
      } catch (error) {
        console.error("Gagal tambah label:", error)
      } finally {
        loadingRef.current = false
      }
    }
  }

  return (
    <Autocomplete
      multiple
      freeSolo
      options={options}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.name
      }
      value={selectedOptions}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      onChange={(_, newValue) => {
        const filteredIds = newValue
          .filter((val) => typeof val !== "string")
          .map((val) => (val as LabelOption).id)
        field.onChange(filteredIds)
      }}
      renderTags={(tagValue: readonly LabelOption[], getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            variant="outlined"
            label={option.name}
            {...getTagProps({ index })}
            key={option.id}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Type and press Enter to add"
          onKeyDown={handleKeyDown}
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
