import { yupResolver } from "@hookform/resolvers/yup"
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
import { useForm, Controller } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { LoginSchema, LoginSchemaDefault } from "./config"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginSchema),
    defaultValues: LoginSchemaDefault,
  })

  const onSubmit = (data) => {
    console.log("Login data:", data)
  }

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
        Selamat Datang di TODO ORIST
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        mb={4}
        sx={{ fontWeight: 400 }}
      >
        Harap masuk untuk memulai
      </Typography>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={3}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                placeholder="nama@gmail.com"
                required
                fullWidth
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type={showPassword ? "text" : "password"}
                required
                fullWidth
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label="toggle password visibility"
                        tabIndex={-1}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Button
            variant="contained"
            color={"error"}
            size="large"
            fullWidth
            type="submit"
            disabled={!isValid}
          >
            Masuk
          </Button>
        </Stack>
      </Box>

      <Typography
        mt={4}
        textAlign="center"
        fontSize={14}
        color="text.secondary"
      >
        Belum punya akun?{" "}
        <Link
          component="button"
          variant="body2"
          color="error"
          fontWeight={700}
          onClick={() => navigate("/auth/register")}
          underline="hover"
        >
          Daftar di sini
        </Link>
      </Typography>
    </Paper>
  )
}

export default Login
