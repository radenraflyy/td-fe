import { Stack, Typography } from "@mui/material"

export default function NotFound() {
  return (
    <Stack textAlign={"center"} p={2}>
      <Typography variant="h1">404 - Halaman tidak ditemukan</Typography>
      <Typography>Oops! Halaman yang kamu cari tidak ada.</Typography>
    </Stack>
  )
}
