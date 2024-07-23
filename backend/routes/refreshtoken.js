const express=require("express");
const router=express.Router();
const refreshtoken=router.route("/");
const {users:Users}=require("../models/mongodatabase");
const jwt=require("jsonwebtoken");

refreshtoken.get(async (req,res)=>{
    const cookie=req.cookies;
    if(!cookie?.jwt) res.sendStatus(401); //unauthorized
    else{
        const refreshtoken=cookie.jwt;
        const founduser=await Users.find({refreshtoken:refreshtoken});
        console.log(founduser);
        if(!founduser) return res.sendStatus(403);
        jwt.verify(
            refreshtoken,
            process.env.REFRESH_TOKEN,
            (err,decoded)=>{
                    if(err || founduser[0].username!==decoded.userInfo.username){
                        // console.log(decoded.userInfo.username);
                        // console.log(founduser[0].username);
                        return res.sendStatus(403);
                    }
                    else{
                        const accesstoken=jwt.sign(
                            {username:founduser[0].username},
                            process.env.ACCESS_TOKEN,
                            {expiresIn:'20s'}
                        )
                        console.log(accesstoken);
                        res.json({accesstoken});
                    }
            }
        )

    }
    
});

module.exports=router;