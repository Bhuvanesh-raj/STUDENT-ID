import { useState,createContext} from "react";

const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [auth,setauth]=useState({loggedin:false});
    // useEffect(()=>{
    //         // console.log(auth);  
    // },[auth]);
  
    return (
        <AuthContext.Provider value={
            {
                auth,setauth
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;