import * as yup from "yup"

export const TodoSchema = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  due_date: yup.date(),
  priority: yup.string(),
  label: yup.array().of(yup.string()),
})
