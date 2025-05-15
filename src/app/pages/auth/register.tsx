import ButtonLoading from "@/app/components/ButtonLoading"
import { yupResolver } from "@hookform/resolvers/yup"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Box,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { RegisterSchema, RegisterSchemaDefault } from "./config"

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const {
    control,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterSchema),
    defaultValues: RegisterSchemaDefault,
  })

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
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Fullname"
                type="text"
                placeholder="John Doe"
                required
                fullWidth
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                placeholder="nama@gmail.com"
                required
                fullWidth
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Password"
                type={showPassword ? "text" : "password"}
                required
                fullWidth
                error={Boolean(error)}
                helperText={error?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label="toggle password visibility"
                        tabIndex={-1} // agar tombol tidak fokus saat tab
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <ButtonLoading
            loading={false}
            text="Daftar"
            variant="contained"
            color={"error"}
            size="large"
            fullWidth
            type="submit"
            disabled={!isValid}
          />
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
