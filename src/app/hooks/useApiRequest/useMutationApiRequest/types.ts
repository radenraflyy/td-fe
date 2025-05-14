import type { UseMutationOptions } from "@tanstack/react-query"
import type { AxiosRequestConfig } from "axios"

import type { AllMutationKeys } from "@/app/data-service/mutation"
import type { AxiosErrorResponse } from "@/app/types"

export interface UseMuationApiRequestProps<T> {
  key: AllMutationKeys
  data?: unknown
  config?: {
    params?: { [key: string]: string }
    query?: { [key: string]: string }
  }
  options?: UseMutationOptions<
    { data: T; message: string },
    AxiosErrorResponse,
    unknown
  > & {
    query?: AxiosRequestConfig["params"]
  }
  needAuth?: boolean
}
