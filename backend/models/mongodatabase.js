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

const users=new mongoose.model("users",UserSchema);
module.exports=users;