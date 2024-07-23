import { useContext } from "react"
import AuthContext from "./context/authcontext"
import { Navigate, useLocation } from "react-router-dom";
import AuthLayout from "./AuthLayout";

const Requireauth = ({ allowedroles }) => {
    const { auth } = useContext(AuthContext);
    const user = auth?.username || "";
    const location = useLocation();
    const roles = auth?.roles || [];
    return (
        roles.map((role) => allowedroles.includes(role)).includes(true) ? <AuthLayout /> : (user.length !== 0 ? <p>unauthorised</p> : <Navigate to={"/login"} state={{ from: location }} replace />
        )
    )
}

export default Requireauth;