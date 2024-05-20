import { useContext} from "react"
import AuthContext from "./context/authcontext"
import Layout from "./Layout";
import {Navigate,useLocation } from "react-router-dom";

const Requireauth=({allowedroles})=>{
    const {auth}=useContext(AuthContext);
    const user=auth?.username || "";
    const location=useLocation();
    const roles=auth?.roles || [];   
    return ( 
        roles.map((role)=> allowedroles.includes(role)).includes(true)?<Layout/>:(user.length!==0?<p>unautorised</p>:<Navigate to={"/login"} state={{from:location}} replace/>
        )
    )
}   

export default Requireauth;