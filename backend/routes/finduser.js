const express=require("express");
const { users } = require("../models/mongodatabase");
const router=express.Router();
const r=router.route("/");


r.post(async (req,res)=>{
    const {registernumber}=req.body;
    const responce=await users.find({registernumber});
    console.log(responce);
    res.json(responce[0]);
    // res.send({...responce[0]});
})

module.exports=router;