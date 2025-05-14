import type { QueriesDataService } from "../types"
import { todosQueries, type TodosQueriesDataKeys } from "./todos"

export type AllQueriesKeys = TodosQueriesDataKeys

export const allQueries: QueriesDataService<AllQueriesKeys> = {
  ...todosQueries,
}
