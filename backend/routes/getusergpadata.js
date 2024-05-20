const express=require("express");
const { users } = require("../models/mongodatabase");
const router=express.Router();
const r=router.route("/");

r.get(async (req,res)=>{
    const {registernumber}=req.body;
    const responce=await users.find({registernumber});
    console.log(responce[0]?.gpa[0]);
    res.json(responce[0]?.gpa[0]);
});

module.exports=router;