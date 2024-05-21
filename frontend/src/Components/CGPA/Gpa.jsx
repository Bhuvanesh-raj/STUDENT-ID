import {useState,useEffect} from "react";
import Subject from "./Subjects";
import AuthContext from "../context/authcontext";
import { useContext } from "react";
import { useNavigate ,useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";

const Gpa=()=>{
    const {auth}=useContext(AuthContext);
    const [calculatedgpa,setcalculatedgpa]=useState();
    const [gpa,addgpa]=useState([]);
    const [count,setcount]=useState(1);
    const [credit,setcredit]=useState(0);
    const [grade,setgrade]=useState("");
    const [subject,setsubject]=useState(`Subject ${count}`);
    const [proceed,setproceed]=useState(false);
    const [inputtittle,setinputtittle]=useState("");
    const axiosPrivate=useAxiosPrivate();
    const navigate=useNavigate();
    const location=useLocation();
    useEffect(()=>{
        if(gpa.length==0){
            setproceed(false);
        }
    },[gpa]);

    const submitevent=(e)=>{
        e.preventDefault();
        const data={
            count,subject,credit,grade
        }
        addgpa([...gpa,data]);
        setcount(count+1);
        setsubject(`Subject ${count+1}`)
        setcredit(0);
        setgrade("");
    }

    const savegpaevent=async (e)=>{
        e.preventDefault();
        const responce=await axiosPrivate.post("/addgpa",{tittle:inputtittle,gpa:gpa,username:auth.username,calculatedgpa:calculatedgpa});
        if(responce.status===200){
            navigate("/");
        }
        else if(responce.status===403){
            navigate("/login",{state:{from:location},replace:true});
        }
    }
    const calculategpa=()=>{
        
        console.log(gpa);
        const numequ={
            'O':10,
            'A+':9,
            'A':8,
            'B+':7,
            'B':6
        }
        let product=0;
        let totalcredit=0;
        gpa.forEach((sub)=>{
            product+= Number(sub.credit)*numequ[sub.grade];
            totalcredit+=Number(sub.credit);
        })
        setcalculatedgpa(product/totalcredit);
        setproceed(true);
    }
    useEffect(()=>{
        // console.log("the gpa array:");
        console.log(gpa);
        setcalculatedgpa("");
    },[gpa]);

    return (
        <div><h1>this is gpa page</h1>
        <Link to={"/"}>Home</Link>
        <section >
            <form onSubmit={submitevent}>
                <label htmlFor="Subject">Subject: </label>
                <input
                    id="Subject"
                    type="text"
                    value={subject}
                    onChange={(e)=>setsubject(e.target.value)}
                    />
                <label htmlFor="Grade">Grade: </label>
                <input
                    id="Grade"
                    type="text"
                    value={grade}
                    onChange={(e)=>setgrade(e.target.value)}
                /> 
                <label htmlFor="Credit">Credit: </label>
                <input 
                    id="Credit"
                    type="number"
                    value={credit}
                    onChange={(e)=>setcredit(e.target.value)}
                />
                <button>Add</button>
            </form>
            {gpa.length?gpa.map((sub,index)=> <Subject key={index} index={index} sub={sub} gpa={gpa} addgpa={addgpa}/>):<></>}
            <button onClick={calculategpa} disabled={!gpa.length}>Calculate</button>
            <p>{calculatedgpa}</p>
            <label htmlFor="inputtittle" hidden={!proceed || !gpa.length}>Tittle</label>
            <input
                id="inputtittle"
                type="text"
                value={inputtittle}
                onChange={(e)=>setinputtittle(e.target.value)}
                hidden={!proceed || !gpa.length}
            />
            <button
                hidden={!proceed || !gpa.length} disabled={!proceed} onClick={savegpaevent}>Save progress</button>

        </section>
        </div>
    )
}
export default Gpa;