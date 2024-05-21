import React ,{useState,useEffect, useContext}from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AuthContext from "../context/authcontext";


const Searchusers=()=>{
    const [username,setusername]=useState("");
    const [dob,setdob]=useState("");
    const [year,setyear]=useState(0);
    const [collegename,setcollegename]=useState("");
    const {auth}=useContext(AuthContext);
    const [registernumber,setregisternumber]=useState("");
    const [fetch,setfetch]=useState(false);
    const [data,setdata]=useState({});
    const axiosPrivate=useAxiosPrivate();
    const handlesubmit=async ()=>{
        try{
            const responce=await axiosPrivate.post("/finduser",{registernumber});
            console.log(responce.data);
            setdata({...responce.data});
        }
        catch(error){
            console.error(error.responce?.data?.message || error.message);
        }
    }
    useEffect(()=>{
        setusername(auth.username);
    },[])
    useEffect(()=>{
        setregisternumber(registernumber.slice(0,12));
    },[registernumber]);
    return (
        <section>
            <h3 >Enter the RegisterNumber: </h3>
            <input type="text" value={registernumber} onChange={(e)=>setregisternumber(e.target.value)}/>
            <button onClick={()=>handlesubmit()}>Search</button>
            <p>{data.username?JSON.stringify(data):<>No users found</>}</p>
        </section>);
}

export default Searchusers;