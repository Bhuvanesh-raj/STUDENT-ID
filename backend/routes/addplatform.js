const express=require("express");
const router=express.Router();
const Addplatform=router.route("/");
const {users:Users}=require("../models/mongodatabase");
const md5 = require("md5");


Addplatform.post(async (req,res)=>{
        const {platformusername,platform,username}=req.body;
        console.log(platformusername+" "+platform+" "+username);
        const userdata=await Users.find({username:username});
        const platforminfo=userdata[0].competitivecoding;
        platforminfo[`${platform}`]=platformusername;
        console.log(platforminfo);
        try{
            const updatedinfo=await Users.updateOne({username:username},{$set:{competitivecoding:platforminfo}});
            res.sendStatus(200);
            // console.log()
        }
        catch(e){
            console.log("error occured while updataing the competitve coding info"+e)
        }
        // res.send("success");
        // res.sendStatus(200);
})

module.exports=router;