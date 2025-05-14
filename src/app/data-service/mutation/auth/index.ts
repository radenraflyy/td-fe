import type { MutationDataService } from "../../types"

export type AuthMutationKeys = "register"

export const authMutations: MutationDataService<AuthMutationKeys> = {
  register: {
    url: "/auth/register",
    method: "POST",
    refetchQueries: [],
  },
}
