import React, { useState ,useEffect} from "react";
import axios from "./api/axios";
import Gpaboxcomponent from "./Gpaboxcomponent";
import { useNavigate } from "react-router-dom";
const Addnewgpa=()=>{
    const [templatedata,settemplatedata]=useState([{semester:4}]);
    // const {auth}=useContext(AuthContext);
    const navigate=useNavigate();
    useEffect(()=>{
        async function fetch(){
            const responce=await axios.get("/getTemplate");
            console.log(responce.data);
            settemplatedata([...responce.data]);
        }
        fetch();
    },[]);

    const handleclick=(index)=>{
        navigate(`/newgpa/${index}`);
    }
    return( 
        <section>
            {templatedata.map((item)=>(
                <section key={templatedata.indexOf(item)} onClick={()=>handleclick(templatedata.indexOf(item))}>
                    <Gpaboxcomponent data={item}/>
                </section>
            ))}
            </section>
        );
    
}

export default Addnewgpa;