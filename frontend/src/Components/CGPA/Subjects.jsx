import React from "react";

const Subject=({sub,gpa,addgpa})=>{
    const {subject,credit,grade}=sub;
    // const id=index;
    const deletesubject=(subject)=>{
        console.log(subject);
        console.log(sub);   
        addgpa(gpa.filter((x)=>x.subject!=subject));
        // sub.filter((s)=> s.subject!=subject);
    }
    return (
        <div>
            <p>Subject :{subject} , credit:{credit} , grade: {grade}</p>
            <button onClick={()=>deletesubject(subject)}>delete</button>
        </div>
    )
}
export default Subject;