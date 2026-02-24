import type { RouteObject } from "react-router-dom";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import ProtectedRoute from "./ProtectedRoute";

const routes: RouteObject[] =[
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <ProtectedRoute>
      <Login/>
    </ProtectedRoute>,
  }
]

export default routes;