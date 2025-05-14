import * as yup from "yup"

export const TodoSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  due_date: yup.date().required("Due date is required"),
  priority: yup.string().optional(),
  label: yup.string().optional(),
})

export type Todo = yup.InferType<typeof TodoSchema>
export const TodoSchemaDefault: Todo = {
  title: "",
  description: "",
  due_date: new Date(),
  label: "",
  priority: "",
}
