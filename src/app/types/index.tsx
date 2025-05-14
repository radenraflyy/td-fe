import type { AxiosError } from "axios"

export interface ErrorResponse {
  error: string
}
export interface AxiosErrorResponse extends AxiosError<ErrorResponse> {
  statusCode: number
}

export interface SuccessResponse<T = unknown> {
  message: string
  data: T
}

export interface Data<T> {
  page: number
  perPage: number
  totalItems: number
  items: T[]
}
