export interface Todos {
  id: number
  title: string
  description: string
  due_date: string
  status: string
  priority: string
  created_at: string
}

export type Order = "asc" | "desc"
