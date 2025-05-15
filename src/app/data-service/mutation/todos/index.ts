import type { MutationDataService } from "../../types"

export type TodoMutationKeys =
  | "create-todos"
  | "create-label"
  | "create-comment"

export const todoMutations: MutationDataService<TodoMutationKeys> = {
  "create-todos": {
    url: "/todo",
    method: "POST",
    refetchQueries: [],
  },
  "create-label": {
    url: "/todo/label",
    method: "POST",
    refetchQueries: ['list-labels'],
  },
  "create-comment": {
    url: "/todo/comment/:todo_id",
    method: "POST",
    refetchQueries: [],
  },
}
