import type { MutationDataService } from "../../types"

export type TodoMutationKeys =
  | "create-todos"
  | "create-label"
  | "create-comment"
  | "update-todo"
  | "delete-todo"
  | "update-detail-todo"

export const todoMutations: MutationDataService<TodoMutationKeys> = {
  "create-todos": {
    url: "/todo",
    method: "POST",
    refetchQueries: ["list-todos"],
  },
  "create-label": {
    url: "/todo/label",
    method: "POST",
    refetchQueries: ["list-labels"],
  },
  "create-comment": {
    url: "/todo/comment/:todo_id",
    method: "POST",
    refetchQueries: ['detail-todo'],
  },
  "update-todo": {
    url: "/todo",
    method: "PATCH",
    refetchQueries: ["list-todos"],
  },
  "delete-todo": {
    url: "/todo/:todo_id",
    method: "DELETE",
    refetchQueries: ["list-todos"],
  },
  "update-detail-todo": {
    url: "/todo/detail/:todo_id",
    method: "PATCH",
    refetchQueries: ['list-todos'],
  },
}
