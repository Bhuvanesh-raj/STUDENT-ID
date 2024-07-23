const express=require("express");
const router=express.Router();
const Addgpa=router.route("/");
const {users:Users}=require("../models/mongodatabase");

Addgpa.post(async (req,res)=>{
    const {tittle,gpa,username,calculatedgpa}=req.body;
    const postgpa={...gpa,tittle:tittle,gpa:calculatedgpa};
    const getgpas=await Users.find({username:username});
    console.log(getgpas[0].gpa);
    const extracteddata=getgpas[0].gpa;
    const postdata=[...extracteddata,postgpa];
    const updategpas=await Users.updateOne({username:username},{$set:{gpa:postdata}}); 
    res.sendStatus(200);
});
 
module.exports=router;