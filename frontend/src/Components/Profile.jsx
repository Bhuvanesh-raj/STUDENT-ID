import {useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./context/authcontext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const Profile=()=>{
    const {auth}=useContext(AuthContext);
    const {username,dob,registernumber,year,collegename}=auth;
    const axiosPrivate=useAxiosPrivate();
    const [usergpa,setusergpa]=useState([]);
    useEffect(()=>{
        // const responce=async ()=>{
        //     const data=await axiosPrivate.get("/getusergpadata",{registernumber:registernumber.toString()});
        //     console.log(registernumber);
        //     console.log(data);
        // }
        // responce();
        const handlesubmit=async ()=>{
            try{
                const responce=await axiosPrivate.post("/finduser",{registernumber});
                console.log(responce.data); 
                const {gpa}=responce.data;
                // console.log(gpaa.gpa);
                // gpa=gpa.filter((item)=>item.tittle!="dummy");
                console.log([...gpa]);
                setusergpa([...gpa]);
                // setdata({...responce.data});
            }
            catch(error){
                console.error(error.responce?.data?.message || error.message);
            }
        }
        // setInterval(async ()=>handlesubmit(),2000);
        handlesubmit();
        
    },[]);

    return (
        <section>
            <p>Name: {username}</p>
            <p>DOB: {dob}</p>
            <p>Registernumber: {registernumber}</p>
            <p>Year: {year}</p>
            <p>College name: {collegename}</p>
            <p>GPA details: </p>
            <Link to={"/addplatform"}>
                addplatform
            </Link>
            <br/>
            <br/>
            <Link to={"/gpa"}>
                Customgpa
            </Link>
            <br/>
            <br/>
            <Link to={"/addnewgpa"}>
                addnewgpa
            </Link>
            {usergpa.map((item,index)=><p key={index}>{item.tittle +" "+ item.gpa}</p>)}
            {/* <p>hello</p> */}
        </section>
    )
}

export default Profile;