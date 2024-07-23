import React, { useState } from "react";
import axios from "axios";
const Demo=()=>{
    const [username,setusername]=useState("");
    const [content,setcontent]=useState("");
    const [success,setsuccess]=useState(false);

    const submitevent= async (e)=>{
        e.preventDefault();
        // try{
        //     const responce=await axios(`https://leetcode-stats-api.herokuapp.com/${username}`)
        //     if(responce.data.status==='success'){
        //         setcontent(JSON.stringify(responce.data));

        //     }
        //     else{
        //         setcontent("user doesent exist!!");
        //         // console.log("no user exist!!");
        //     }
        // }
        // catch(e){
        //     console.log("there has been some error: "+e);
        // }
            
    }
    return (
        <section>
            <form onSubmit={submitevent}>
                <label htmlFor="username"/>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e)=>setusername(e.target.value)}
                    />
                <button>Submit</button>

            </form>
            <p>{content}</p>
        </section>
    )
}

export default Demo;