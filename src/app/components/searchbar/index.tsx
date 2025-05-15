import { Search } from "@mui/icons-material"
import { InputAdornment, OutlinedInput } from "@mui/material"
import React from "react"

interface SearchBarProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <OutlinedInput
      fullWidth
      id="outlined-adornment-amount"
      startAdornment={
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      }
      placeholder="Search..."
      value={value}
      onChange={onChange}
    />
  )
}

export default SearchBar
