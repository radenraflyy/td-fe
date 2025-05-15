import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import MainLayout from "./layouts/MainLayout"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import NotFound from "./pages/notofund"
import Todos from "./pages/todos"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Todos />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
