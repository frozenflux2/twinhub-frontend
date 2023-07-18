import Login from "pages/Auth/Login"
import Signup from "pages/Auth/Signup"
import Chatting from "pages/Chat"
import Credits from "pages/Credits"
import Dashboard from "pages/Dashboard"
import type { PathRouteProps } from "react-router-dom"

export const routes: Array<PathRouteProps> = [
    {
        path: "/index",
        element: <Dashboard />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/chat/:id",
        element: <Chatting />
    },
    {
        path: "/payment",
        element: <Credits />
    }
]

export const privateRoutes: Array<PathRouteProps> = []
