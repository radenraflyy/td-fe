import type { QueriesDataService } from "../../types"

export type TodosQueriesDataKeys = "list-todos" | "list-labels"

export const todosQueries: QueriesDataService<TodosQueriesDataKeys> = {
  "list-todos": "/todo/list-todo",
  "list-labels": "/todo/list-label ",
}
