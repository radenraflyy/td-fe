import type { QueriesDataService } from "../../types"

export type TodosQueriesDataKeys = "list-todos" | "list-labels"

export const todosQueries: QueriesDataService<TodosQueriesDataKeys> = {
  "list-todos": "todos",
  "list-labels": "/todo/list-label ",
}
