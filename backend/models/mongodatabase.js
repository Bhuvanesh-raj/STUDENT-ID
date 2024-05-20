const { json } = require("body-parser");
const mongoose=require("mongoose");
// const UserSchema=mongoose.Schema({
//     username:String,
//     password:String,
//     roles:Array,
//     refreshtoken:String
// });

const UserSchema=mongoose.Schema({
    username:String,
    password:String,
    dob:String,
    registernumber:String,
    year:Number,
    collegename:String,
    roles:Array,
    competitivecoding:Object,
    gpa:Array
});

const GpaSchema=mongoose.Schema({
    year:Number,
    template:JSON,
    branch:String,
    semester:Number
});

const users=new mongoose.model("users",UserSchema);
const gpa=new mongoose.model("gpa",GpaSchema);
module.exports={users,gpa};