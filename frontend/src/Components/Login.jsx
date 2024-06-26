import React,{useState,useEffect,useRef} from "react";
import axios from "./api/axios";
import { useContext } from "react";
import AuthContext from "./context/authcontext";
import { useNavigate,useLocation} from "react-router-dom";
// import userefreshtoken from "../hooks/userefreshtoken";
const Login=()=>{
    const {setauth}=useContext(AuthContext);
    const navigate=useNavigate();
    const location=useLocation();
    const from=location?.state?.from || "/";
    const usernameinput=useRef();
    // const errfocus=useRef();
    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");

    const [success,setsuccess]=useState(false);
    const [err,seterr]=useState("");
    // const navigate=useNavigate();

    useEffect(()=>{
        seterr("");
    },[username,password]);

    useEffect(()=>{
        usernameinput.current.focus();
    },[]);
    const submitevent=async (e)=>{
        e.preventDefault();
        console.log(username+" "+password);
        try{
            let responce=await axios.post("/login",{username,password});
            if(responce.status===401 || responce.status==403){
                alert("Invalid username or password");
                // responce.data=[];
                throw new Error("not authenticated");
            }
            if(responce.data){
                const {accesstoken,roles,dob,registernumber,year,collegename}=responce.data;
                setauth({username,accesstoken,roles,dob,registernumber,year,collegename,loggedin:true});
                navigate(from);
            }
        }
        catch(e){
            // console.log(e.status);
            alert("Username or password is incorrect");
        }
    }    
    return (
        (success ? 
            <p>successfully logged in!!</p>
            :
         <section >
                {err?<p>{err}</p>:<></>}
                 {/* <p>Error block!!</p> */}
            <form onSubmit={submitevent}>
                <label htmlFor="username">Username</label>
                <input 
                    id="username"
                    type="text"
                    ref={usernameinput}
                    required
                    value={username}
                    onChange={(e)=>setusername(e.target.value)}
                />
                
                <label htmlFor="password">Password</label>
                <input 
                    id="password"
                    type="password"
                    value={password}
                    required
                    autoComplete="off"
                    onChange={(e)=>setpassword(e.target.value)}
                />
                
                <button disabled={!username || !password}>Submit</button>    
            </form>
            <button onClick={()=>navigate("/register")}>NewUser?</button>
            {/* <button onClick={()=>refresh()}>getrefreshtoken</button> */}
        </section>
      
)
    );
}

export default Login;