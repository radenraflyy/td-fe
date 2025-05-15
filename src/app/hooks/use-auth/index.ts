import { useCallback } from "react"

import axiosWithAuth from "@/app/utils/axiosWithAuth"
import { useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

import { axiosWithoutAuth } from "../../utils/axiosWithoutAuth"

type User = {
  userId: string
  name: string
  email: string
  phone: string
}

type Response = {
  message: string
  data: {
    user: User
    isVerified: boolean
    hasFillQuestionnaire: boolean
    accessToken: string
  }
}

export const useAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const signIn = useCallback(
    async (value: { emailPhone: string; password: string }) => {
      const newValue = value.emailPhone.includes("@")
        ? value.emailPhone
        : value.emailPhone.replace(/^62|^0/, "")
      const { data: result } = await axiosWithoutAuth<Response>({
        method: "POST",
        url: "/auth/login",
        data: {
          email_phone: newValue,
          password: value.password,
        },
      })
      const { data } = result

      axiosWithAuth.defaults.headers.common["Authorization"] =
        "Bearer " + data.accessToken
      return result
    },
    []
  )

  const forgotPassword = useCallback(async (value: { email: string }) => {
    const { data: result } = await axios.post<Response>(
      `/auth/send-reset-password/${value.email}`
    )
    return result
  }, [])

  const signOut = useCallback(async () => {
    try {
      const result = await axiosWithoutAuth.get(`/auth/logout`, {
        withCredentials: true,
      })
      axiosWithAuth.defaults.headers.common["Authorization"] = ""
      navigate("/auth/login", { replace: true })
      queryClient.clear()
      return result.data.message
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.error || "Something went wrong")
      }
    }
  }, [navigate, queryClient])

  return { signIn, signOut, forgotPassword }
}
