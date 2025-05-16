import { Check, Flag } from "@mui/icons-material"
import { Chip, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import { useState } from "react"

interface InputSelectedChipProps {
  value: number | null | undefined
  onChange: (value: number) => void
}

const levels = [1, 2, 3, 4]

export function InputSelectedChip({ value, onChange }: InputSelectedChipProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  return (
    <>
      <Chip
        icon={<Flag />}
        label={`P ${value ?? ""}`}
        clickable
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ cursor: "pointer" }}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {levels.map((lvl) => (
          <MenuItem
            key={lvl}
            selected={value === lvl}
            onClick={() => {
              onChange(lvl)
              setAnchorEl(null)
            }}
          >
            <ListItemIcon>
              <Flag
                fontSize="small"
                sx={{
                  color:
                    lvl === 1
                      ? "error.main"
                      : lvl === 2
                      ? "warning.main"
                      : lvl === 3
                      ? "info.main"
                      : "success.main",
                }}
              />
            </ListItemIcon>
            <ListItemText>Priority {lvl}</ListItemText>
            {value === lvl && <Check fontSize="small" />}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
