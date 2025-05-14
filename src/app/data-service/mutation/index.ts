import type { MutationDataService } from "../types"
import { authMutations, type AuthMutationKeys } from "./auth"
import { todoMutations, type TodoMutationKeys } from "./todos"

export type AllMutationKeys = AuthMutationKeys | TodoMutationKeys

export const allMutations: MutationDataService<AllMutationKeys> = {
  ...authMutations,
  ...todoMutations,
}
