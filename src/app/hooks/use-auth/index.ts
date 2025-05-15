import { useCallback } from "react"

import axiosWithAuth from "@/app/utils/axiosWithAuth"
import { useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

import { axiosWithoutAuth } from "../../utils/axiosWithoutAuth"
import { useAuthCtx } from "@/app/context/AuthContext"

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
  const { setLogin, logout } = useAuthCtx()

  const signIn = useCallback(
    async (value: { email: string; password: string }) => {
      const newValue = value.email.includes("@")
        ? value.email
        : value.email.replace(/^62|^0/, "")
      const { data: result } = await axiosWithoutAuth<Response>({
        method: "POST",
        url: "/auth/login",
        data: {
          email: newValue,
          password: value.password,
        },
      })
      const { data } = result
      setLogin()
      axiosWithAuth.defaults.headers.common["Authorization"] =
        "Bearer " + data.accessToken
      return result
    },
    [setLogin]
  )

  const signOut = useCallback(async () => {
    try {
      const result = await axiosWithoutAuth.get(`/auth/logout`, {
        withCredentials: true,
      })
      axiosWithAuth.defaults.headers.common["Authorization"] = ""
      localStorage.removeItem("isLoggedIn")
      navigate("/auth/login", { replace: true })
      queryClient.clear()
      logout()
      return result.data.message
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.error || "Something went wrong")
      }
    }
  }, [navigate, queryClient, logout])

  return { signIn, signOut }
}
