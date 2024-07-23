const express=require("express");
const Router=express.Router();
const {users:Users}=require("../models/mongodatabase");
const adminsearch=Router.route("/");

adminsearch.post(async (req,res)=>{
    const username=req.body.username;
    console.log("the entered username is "+username);
    const responce=await Users.find({username:username});
    res.json(responce);
})

module.exports=Router;