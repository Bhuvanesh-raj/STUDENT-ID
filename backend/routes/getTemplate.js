const express=require("express");
const {gpa}=require("../models/mongodatabase");
const Router=express.Router();

const GT=Router.route("/");


GT.get(async (req,res)=>{
    const responce=await gpa.find({}); 
    console.log(typeof responce);
    res.send(responce);
})

module.exports=Router;