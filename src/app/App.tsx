import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import MainLayout from "./layouts/MainLayout"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import NotFound from "./pages/notofund"
import Todos from "./pages/todos"
import { AuthProvider } from "./context/AuthContext"
import { AuthRoute, ProtectedRoute } from "@/middleware"

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route
              path="/auth/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route
              path="/auth/register"
              element={
                <AuthRoute>
                  <Register />
                </AuthRoute>
              }
            />
          </Route>

          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Todos />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
