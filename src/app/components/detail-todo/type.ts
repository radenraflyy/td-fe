export interface FormDialogProps {
  info: {
    open: boolean
    todoId: string
  }
  onClose: () => void
}

export interface LabelTodo {
  Id: string
  Name: string
}

export interface TodoComment {
  name: string
  comment: string
  created_at: string
}

export interface TodoDetail {
  name: string
  title: string
  description: string
  due_date: string
  is_done: boolean
  priority: string
  label: LabelTodo[]
  comment: TodoComment[] | null
}

export type GetDetailTodoResponse = TodoDetail
