import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const Adminpage=()=>{
    const axiosPrivate=useAxiosPrivate();
    return (
        <section>
            <h1>ADMIN PAGE</h1>
            <Link to="/searchusers" >Search Users</Link>
            <br></br>
            <Link to="/addgpatemplate">Add Gpa Template</Link>
        </section>
    )
}


export default Adminpage;