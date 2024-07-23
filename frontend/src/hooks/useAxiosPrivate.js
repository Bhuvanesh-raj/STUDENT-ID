    import { axiosPrivate } from "../Components/api/axios";
import { useContext, useEffect } from "react";
import AuthContext from "../Components/context/authcontext";
import { useLocation, useNavigate } from "react-router-dom";

const useAxiosPrivate=()=>{
    const navigate=useNavigate();
    const location=useLocation();
    const {auth,setauth}=useContext(AuthContext);

    useEffect(()=>{
        console.log("from the useaxios private");
        const requestIntercept=axiosPrivate.interceptors.request.use(
            config=>{
                if(!config.headers['Authorization']){
                    config.headers['Authorization']=`Bearer ${auth.accesstoken}`
                }
                return config;
            }
            ,(error)=>Promise.reject(error)
        )
        const responceIntercept=axiosPrivate.interceptors.response.use(
            responce=>responce,
            async(error)=>{
                // if(error?.responce?.status===403){
                    setauth({});
                    navigate("/login",{state:{from:location},replace:true});
                // }
            }

        )

        return ()=>{
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responceIntercept);
        }
    },[auth]);

    return axiosPrivate; 
}

export default useAxiosPrivate;