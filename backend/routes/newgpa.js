const express=require("express");
const {gpa}=require("../models/mongodatabase");
// const { route } = require("./login");
const router=express.Router();
const r=router.route("/");
r.post((req,res)=>{
    const data=req.body.data;
    const sem=req.body.semester;
    const branch=req.body.branch;
    const year=req.body.year;
    const template=new gpa({    
        template:data,
        branch:branch,
        semester:sem,
        year:year
    }
    );
    template.save();
    res.send("success");
});
module.exports=router;