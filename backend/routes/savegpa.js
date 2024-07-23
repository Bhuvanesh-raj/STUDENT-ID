const express=require("express");
const router=express.Router();
const r=router.route("/");
const {users:Users}=require("../models/mongodatabase");



r.post(async (req,res)=>{
    const {username,registernumber,calculatedgpa,semester}=req.body;
    const user=await Users.find({username:username,registernumber:registernumber});
    console.log(user[0].gpa);
    const obj={
        tittle:semester,
        gpa:calculatedgpa
    }

    var updateddata=[...user[0].gpa];
    updateddata=updateddata.filter((item)=>item.tittle!=semester);
    updateddata=[...updateddata,obj];
    const update=await Users.updateOne({username:username,registernumber:registernumber},{$set:{gpa:updateddata}});
    console.log(calculatedgpa);
    console.log(semester);
    res.sendStatus(200);
});

module.exports=router;