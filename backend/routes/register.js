const express=require("express")
const router=express.Router();
const Register=router.route("/");
const md5=require("md5");
const {users:Users}=require("../models/mongodatabase");
const rolesList=require("../config/rolesList");

Register.post((req,res)=>{
    const {fullname,dob,registernumber,year,collegename,password}=req.body;
    console.log(req.body);
    const obj=new Users({
        username:fullname,
        password:md5(password),
        dob:dob,
        registernumber:registernumber,
        year:year,
        collegename:collegename,
        roles:[rolesList.student],
        competitivecoding:{dummy:"dummy data"},
        gpa:[]
        // gpa:[{tittle:"Dummy"}]
    })
    obj.save();
    res.send("success!!").sendStatus(200);
})
.get((req,res)=>{
    res.json({
        name:"bhuvanesh raj"
    })
})

module.exports=router;