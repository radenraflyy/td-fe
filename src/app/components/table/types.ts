export type Order = "asc" | "desc"

type ColumnSort = {
  id: string
  desc: boolean
}
export type SortingState = ColumnSort[]

export interface TodoItem {
  id: string
  title: string
  description: string
  due_date: string
  is_done: boolean
  priority: string
  created_at: string
}

export interface TodoData {
  items: TodoItem[]
  totalItems: number
  page: number
  perPage: number
}
