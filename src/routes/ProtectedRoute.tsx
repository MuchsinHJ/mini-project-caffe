import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom";
import { getLocalStorage } from "../utils/storage";

interface PropTypes{
  children: ReactNode;
}
const ProtectedRoute = (props: PropTypes) => {
  const {children} = props;
  const auth = getLocalStorage("auth");
  const currentRoute = useLocation().pathname;

  if(!auth && currentRoute !== "/login"){
    return <Navigate to='/login' replace/>
  }
  if(auth && currentRoute === "/login"){
    return <Navigate to='/orders' replace/>
  }

  return <>
    {children}
</>
}

export default ProtectedRoute;