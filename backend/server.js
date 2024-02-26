const dotenv=require("dotenv").config();
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const PORT=process.env.PORT || 3600;
const cors=require("cors");
const verifyJWT = require("./middleware/verifyJWT");
const verifyRoles = require("./middleware/verifyRoles");
const rolesList=require("./config/rolesList");
const cookieparser=require("cookie-parser");
app.use(cookieparser());

// var corsOption={
//     origin:"http://localhost:3000",
//     optionsSuccessStatus:200
// }


app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("db connected successfully")).catch(()=>console.log("err occured"));
app.use(cors());
app.use(express.json());

app.use("/login",require("./routes/login"));
app.use("/register",require("./routes/register"));
app.use(verifyJWT);  
app.use("/adminsearch",require("./routes/adminsearch"));
// app.use("/refresh",require("./routes/refreshtoken"));
app.use("/addgpa",require("./routes/addgpa"));
app.use("/addplatform",require("./routes/addplatform"));



// app.get("/users",(req,res)=>{
//   console.log(req);
//   console.log("from the users directory");
//   res.send("working!!");
// });

// const demo= (req,res)=>{
//     console.log("the user has permissions for "+Object.values(req.role));
//     res.send(`USER:${req.user} ${req.role}`);
// };

// app.get("/testingtoken",(verifyRoles(rolesList.admin,rolesList.student)))

// app.get("/",(req,res)=>{
//     res.send(
//         "hello there"
//         )
//     }
// )
app.listen(PORT,()=>{
    console.log(rolesList);
    console.log(`server started at Port ${PORT}`)
})


