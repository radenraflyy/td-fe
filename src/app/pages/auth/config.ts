import * as yup from "yup"

export const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
})

export const RegisterSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(6, "Name must be at least 6 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
})

export const LoginSchemaDefault: yup.InferType<typeof LoginSchema> = {
  email: "",
  password: "",
}

export const RegisterSchemaDefault: yup.InferType<typeof RegisterSchema> = {
  name: "",
  email: "",
  password: "",
}
