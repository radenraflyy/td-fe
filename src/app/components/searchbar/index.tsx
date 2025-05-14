import { Search } from "@mui/icons-material"
import { InputAdornment, OutlinedInput } from "@mui/material"

const SearchBar = () => {
  return (
    <OutlinedInput
      fullWidth
      sx={{ mb: 2 }}
      id="outlined-adornment-amount"
      startAdornment={
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      }
      placeholder="Search..."
    />
  )
}

export default SearchBar
