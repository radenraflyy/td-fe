import type { QueriesDataService } from "../../types"

export type TodosQueriesDataKeys = "list-todos"

export const todosQueries: QueriesDataService<TodosQueriesDataKeys> = {
  "list-todos": "todos",
}
