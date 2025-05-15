import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuthCtx } from "./app/context/AuthContext"

export const ProtectedRoute = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const { isAuthenticated } = useAuthCtx()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  return children
}

export const AuthRoute = ({ children }: Readonly<{ children: ReactNode }>) => {
  const { isAuthenticated } = useAuthCtx()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}
