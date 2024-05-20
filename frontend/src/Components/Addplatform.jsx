import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "./context/authcontext";
const Addplatform=()=>{
    const [platform,setplatform]=useState("Leetcode");
    const [api,setapi]=useState("https://leetcode-stats-api.herokuapp.com/");
    const [platformusername,setplatformusername]=useState("");
    const [userdata,setuserdata]=useState("");
    const [status,setstatus]=useState("");
    const {auth}=useContext(AuthContext);
    const navigate=useNavigate();
    const axiosPrivate=useAxiosPrivate();
    const checkvaliduser=async (e)=>{
        e.preventDefault();
        const userapi=api+platformusername;
        const res=await axios(userapi);
        // res=JSON.parse(res);
        console.log("The responce is "+ res.data);
// changes
        if(platform=="Leetcode"){
            res.data.status=="success"?setuserdata(JSON.stringify(res.data)):setuserdata("No user exists");
            if(res.data.status=="success"){
                setstatus(true);
            }
            else{
                setstatus(false);
            }
        }
        else if(platform=="Codechef"){
            res.data.success=="true"?setuserdata(JSON.stringify(res.data)):setuserdata("No user exists");
            if(res.data.success=="true"){
                setstatus(true);
            }
            else{
                setstatus(false);
            }
        }
// changes
    }
    useEffect(()=>{
        setstatus(false);
        setuserdata("");
    },[platformusername]);

    const handlechange=(e)=>{
        setplatform(e.target.value);
    }
    useEffect(()=>{
        console.log(platform);
        const obj={
            Codechef:"https://codechef-api.vercel.app/",
            Leetcode:"https://leetcode-stats-api.herokuapp.com/"
            
        }
        setapi(obj[platform]);
    },[platform]);
    useEffect(()=>{
        console.log(api);
    },[api]);

    const saveevent=async (e)=>{
        e.preventDefault();
        alert("button clicked");
        alert(platform +" "+platformusername);
            const responce=await axiosPrivate.post("/addplatform",
            {username:auth.username,
             platform:platform,
             platformusername:platformusername
            });
}
    useEffect(()=>{
        setstatus("");
    },[platformusername]);

    return (
        <section>  
        <Link to={"/"}>Home</Link>
        <h1>Platform select</h1>
         <p>{status}</p>
        <form onSubmit={checkvaliduser}>
            <select onChange={handlechange}>
                <option value={"Leetcode"}>Leetcode</option>
                <option value={"Codechef"}>Codechef</option>
                <option value={"Hackerrank"}>Hackerrank</option>
                <option value={"Codeforces"}>Codeforces</option>
                <option value={"CodingNinjas"}>CodingNinjas</option>
            </select>    
            <input 
                type="text"
                value={platformusername}
                onChange={(e)=>setplatformusername(e.target.value)}
                />        
            <button>submit</button>
        </form>
        <p>
            {userdata}
        </p>

        <button disabled={!status} onClick={saveevent}>SAVE</button>
        </section>
    )
}

export default Addplatform;
