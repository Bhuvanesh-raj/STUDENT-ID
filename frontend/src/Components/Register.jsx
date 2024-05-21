import React, {useState } from "react";
import axios from "./api/axios";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NewRegister=()=>{
    // const axiosPrivate=useAxiosPrivate();
    const [fullname,setfullname]=useState("");

    const [dob,setdob]=useState("01/07/2003");
    
    const [registernumber,setregisternumber]=useState("");

    const [year,setyear]=useState(1);
    
    const [collegename,setcollegename]=useState("");

    const [password,setpassword]=useState("");

    const [confirmpassword,setconfirmpassword]=useState("");

    const navigate=useNavigate();
    const nameregex=/^[a-zA-Z]{3,}$/;
    const dobRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;
    const registernumberregex=/^\d{5,}$/;
    const collegenameregex=/^[a-zA-Z\s]+$/;
    const passwordregex=/^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_])[A-Za-z0-9\W_]+$/;
    
    // useEffect(()=>{
    //     validfullname.current=(nameregex.test(fullname));
    //     validdob.current=(dobRegex.test(dob));
    //     validregisternum.current=(registernumberregex.test(registernum));
    //     validcollegename.current=(collegenameregex.test(collegename));
    //     validpassword.current=(passwordregex.test(password));
    //     if(password==confirmpassword){
    //         validconfirmpassword.current=true;
    //     }
    //     else{
    //         validconfirmpassword.current=false;
    //     }
    // },[fullname,dob,registernum,collegename,password,confirmpassword]);
   
    // useEffect(()=>{
    //     console.log(validconfirmpassword.current);
    // },[confirmpassword,password]);
    // useEffect(()=>{
    //     console.log(validfullname.current+" "+validdob.current+" "+validregisternum.current+" "+validcollegename.current+" "+validpassword.current);
    // },[fullname,dob,registernum,collegename,password]);
   

    const registerevent=async (e)=>{
        e.preventDefault();
        // console.log(fullname+" "+dob+" "+registernum+" "+year+" "+collegename+" "+password+" "+confirmpassword);
        const responce=await axios.post("/register",{fullname,dob,registernumber,year,collegename,password});
        console.log(responce);
        if(responce.data==="success!!"){
            alert("User registerd");
            navigate("/login");
        }
        else{
            alert("invalid");
        }
    }

    const valid=!dobRegex.test(dob) || !nameregex.test(fullname) || !registernumberregex.test(registernumber) || !collegenameregex.test(collegename) ||!passwordregex.test(password) || password!==confirmpassword || year<=0 || year>5;
    return (
        <section>
            <Link to={"/"}>Home</Link>
            <form onSubmit={registerevent}>
                <label htmlFor="fullname">Fullname: </label>
                <input  
                    id="fullname"
                    type="text"
                    value={fullname}
                    onChange={(e)=>setfullname(e.target.value)}    
                />
                <label htmlFor="dob">Dob: </label>
                <input 
                    id="dob"
                    type="text"
                    placeholder="01/01/2003"
                    value={dob}
                    onChange={(e)=>setdob(e.target.value)}                 
                />

                <label htmlFor="year">Year: </label>
                <input 
                    id="year"
                    type="number"
                    value={year}
                    onChange={(e)=>setyear(e.target.value)}
                 />
                 <label htmlFor="registernumber">Registernumber: </label>
                 <input 
                    id="registernumber"
                    type="text"
                    value={registernumber}
                    onChange={(e)=>setregisternumber(e.target.value)}
                 />
                 <label htmlFor="collegename">Collegename:</label>
                 <input 
                    id="collegename"
                    type="text"
                    value={collegename}
                    onChange={(e)=>setcollegename(e.target.value)}
                    />
                <label htmlFor="password">Password: </label>
                <input
                    id="password"
                    type="text"
                    value={password}
                    onChange={(e)=>setpassword(e.target.value)
                    }
                />
                <label htmlFor="confirmpassword">Confirm password</label>
                <input
                    id="confirmpassword"
                    type="text"
                    value={confirmpassword}
                    onChange={(e)=>setconfirmpassword(e.target.value)}    
                />
                <button disabled={valid}>Submit</button>
                {/* <button disabled={!validfullname.current ||!validpassword.current || !validregisternum.current || !validdob.current || !validcollegename.current || confirmpassword!==password || year<=0 || year>5} >Submit</button> */}
            </form>
        </section>
    )
}

export default NewRegister;