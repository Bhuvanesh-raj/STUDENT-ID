import AuthContext from "../Components/context/authcontext";
import { useContext } from "react";

const getauth=()=>{

    const {auth}=useContext(AuthContext);
    return auth;
}

module.exports=getauth;