import axios from "axios"

export const axiosWithoutAuth = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
})
