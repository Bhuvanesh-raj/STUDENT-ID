import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { axiosPrivate } from "./api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const Adminpage=()=>{
    const [responcedata,setresponcedata]=useState([]);
    const axiosPrivate=useAxiosPrivate();
    const [username,setusername]=useState("");
    const getusers=async ()=>{
        alert("button clicked");
        const responce=await axiosPrivate.post("/adminsearch",{username:username});
        const data=responce.data;
        console.log(data);
        setresponcedata(data);
    }
    return (
        <section>
            <h1>the admin page</h1>
            <Link to={"/"}>Home</Link>
            <br/>
            <br/>
            <input 
                placeholder="Username"
                value={username}
                onChange={(e)=>setusername(e.target.value)
                }
            />
            <button onClick={getusers}>Search</button>
            <p>{responcedata}</p>
        </section>
    )
}


export default Adminpage;