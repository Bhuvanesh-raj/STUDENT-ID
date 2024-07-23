import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const Addtemplate=()=>{
    const [semester,setsemester]=useState(0);
    const [year,setyear]=useState(0);
    const [branch,setbranch]=useState("");
    const [subjectname,setsubjectname]=useState("");
    const [credit,setcredit]=useState(0);
    const [template,settemplate]=useState({});
    const [keys,setkeys]=useState([]);
    const [values,setvalues]=useState([]);
    const axiosPrivate=useAxiosPrivate();
    const navigate=useNavigate();


    const handlesubmit=()=>{
        // settemplate([...template])
        const data=template;
        data[`${subjectname}`]=parseFloat(credit);
        settemplate({...data});
        setsubjectname("");
        setcredit("");
    }
    const SubmitEvent=async ()=>{
        const responce=await axiosPrivate.post("/newgpa",{data:template,branch,year,semester});
        console.log(branch);
        console.log(year);
        console.log(semester);
        console.log(JSON.stringify(template));
        alert("Template Posted!!!");
        // navigate("/admin");
    }
    useEffect(()=>{
        setkeys(Object.keys(template));
        setvalues(Object.values(template));
    },[template]);


    return (<>
        <p>Enter the Year Of Examimation: </p>
        <input type="number" value={year} onChange={(e)=>setyear(e.target.value)}/>

        <p>Enter the Branch</p>
        <input type="text" value={branch} onChange={(e)=>setbranch(e.target.value)}/>

        <p>Enter the semester</p>
        <input type="text" value={semester} onChange={(e)=>setsemester(e.target.value)}/>

        <p>Enter the subject name</p>
        <input type="text" value={subjectname} onChange={(e)=>setsubjectname(e.target.value)} />

        <p>Enter the credit of the subject</p>
        <input type="number" value={credit} onChange={(e)=>setcredit(e.target.value)}/>
        <button onClick={()=>handlesubmit()}> Add Subject</button>
        {
            keys.map((item,index)=>
                <p key={index}> {item}  {values[index]}</p>    
            )
        }
        <button onClick={()=>SubmitEvent()} > Submit</button>

        


    </>)
}

export default Addtemplate;