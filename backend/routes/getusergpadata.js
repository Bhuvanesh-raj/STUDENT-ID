// const express=require("express");
// const { users } = require("../models/mongodatabase");
// const router=express.Router();
// const r=router.route("/");

// r.get(async (req,res)=>{
//     const {registernumber}=req.body;
//     console.log(registernumber);
//     const responce=await users.find({registernumber},{_id:0,gpa:1});
//     const {gpa}=responce[0];
//     res.send(gpa);
// });

// module.exports=router;

const express = require("express");
const { users } = require("../models/mongodatabase");
const router = express.Router();
const r=router.route("/");


// Using query parameters
r.get(async (req, res) => {
    const { registernumber } = req.body;
    // console.log(registernumber); // Changed to query params
    console.log("Register number from request:", registernumber);
    
    try {
        const response = await users.find({ registernumber }, { _id: 0, gpa: 1 });
        console.log("Response from MongoDB:", response);
        
        if (response.length > 0) {
            const { gpa } = response[0];
            res.json(gpa); // Sending JSON response
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
