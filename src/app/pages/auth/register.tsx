import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  return (
    <Paper
      elevation={4}
      sx={{
        p: 5,
        borderRadius: 3,
        maxWidth: 600,
        width: "100%",
        flexGrow: 1,
        flexBasis: "400px",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h5" fontWeight={700} mb={1}>
        Daftarkan List Anda di TODO ORIST
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        mb={4}
        sx={{ fontWeight: 400 }}
      >
        Isi form di bawah untuk membuat akun baru
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <Stack spacing={3}>
          <TextField
            label="Fullname"
            type="text"
            required
            placeholder="John Doe"
            fullWidth
          />

          <TextField
            label="Email"
            type="email"
            required
            placeholder="nama@gmail.com"
            fullWidth
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            required
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            color={"error"}
            size="large"
            fullWidth
            type="submit"
          >
            Daftar
          </Button>
        </Stack>
      </Box>

      <Typography
        mt={4}
        textAlign="center"
        fontSize={14}
        color="text.secondary"
      >
        Sudah punya akun?{" "}
        <Link
          component="button"
          variant="body2"
          color="error"
          fontWeight={700}
          onClick={() => navigate("/auth/login")}
          underline="hover"
        >
          Daftar di sini
        </Link>
      </Typography>
    </Paper>
  )
}

export default Register
