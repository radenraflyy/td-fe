import { useCallback } from "react"

import { AxiosError, type AxiosRequestConfig } from "axios"

import type { SuccessResponse } from "@/app/types"
import { axiosWithoutAuth } from "@/app/utils/axiosWithoutAuth"
import { useLocation } from "react-router-dom"

import type { ResponsePayload } from "./types"

//eslint-disable-next-line @typescript-eslint/no-explicit-any
function useAxiosWithoutAuth<T = any>() {
  const { pathname } = useLocation()
  const axiosFetch = useCallback(
    async (config: AxiosRequestConfig) => {
      if (!axiosWithoutAuth.defaults.baseURL)
        throw { message: "base url required" }
      axiosWithoutAuth.defaults.headers.common["clientPath"] = pathname
      if (!config.url) return
      if (config.url.match(/undefined/g)) return

      return await axiosWithoutAuth<SuccessResponse<T>>(config).catch(
        async (err: AxiosError<ResponsePayload>) => {
          if (![401].includes(err.response?.status || 0)) throw err
        }
      )
    },
    [pathname]
  )

  return axiosFetch
}

export default useAxiosWithoutAuth
