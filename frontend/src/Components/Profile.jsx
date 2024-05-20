import {useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./context/authcontext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const Profile=()=>{
    const {auth}=useContext(AuthContext);
    const {username,dob,registernumber,year,collegename}=auth;
    const axiosPrivate=useAxiosPrivate();
    // const {usernam}
    useEffect(()=>{
        const responce=async ()=>{
            const data=await axiosPrivate.get("/getusergpadata",{registernumber});
            console.log(registernumber);
            console.log(data);
        }
        responce();
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


        </section>
    )
}

export default Profile;