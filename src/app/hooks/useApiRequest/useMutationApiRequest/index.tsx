import { useMutation, useQueryClient } from "@tanstack/react-query"

import { allMutations } from "@/app/data-service/mutation"
import type { AxiosErrorResponse } from "@/app/types"

import useAxiosWithAuth from "../../use-axios-with-auth"
import useAxiosWithoutAuth from "../../use-axios-without-auth"
import type { UseMuationApiRequestProps } from "./types"
import { constructUrl } from "@/app/utils/constructUrl"

function useMutationApiRequest<T = unknown>({
  key,
  data = {},
  options = {},
  config,
  needAuth = true,
}: UseMuationApiRequestProps<T>) {
  const queryClient = useQueryClient()
  const { method, refetchQueries, url } =
    allMutations[key as keyof typeof allMutations]
  const replacedUrl = constructUrl(url, config)

  const axiosWithAuth = useAxiosWithAuth()
  const axiosWithoutAuth = useAxiosWithoutAuth()
  const axiosFetch = needAuth ? axiosWithAuth : axiosWithoutAuth

  const fetchData = async (
    inputData?: unknown
  ): Promise<{ data: T; message: string }> => {
    const requestData = inputData || data

    const response = await axiosFetch({
      method,
      url: replacedUrl,
      data: requestData,
      params: options.query,
    })
    if (response && response.data) {
      return response.data
    }

    throw new Error("Response data is missing")
  }
  const invalidQueries = (refetchQueries: string[]) => {
    if (!refetchQueries || refetchQueries.length === 0) {
      return
    }

    const regexPattern = refetchQueries
      .map((query) => `\\b${query}\\b`)
      .join("|")
    const regex = new RegExp(regexPattern, "i")

    queryClient.refetchQueries({
      predicate: (query) =>
        query.queryKey.some(
          (key) => typeof key === "string" && regex.test(key)
        ),
    })
  }

  const mutateOption: typeof options = {
    retry: 1,
    onError: (error: AxiosErrorResponse) => {
      alert(error.response?.data.error || 'Something went wrong')
    },
    onSuccess: () => {
      invalidQueries(refetchQueries || [])
    },
    ...options,
  }

  const mutate = useMutation({
    mutationFn: fetchData,
    ...mutateOption,
  })

  return mutate
}

export default useMutationApiRequest
