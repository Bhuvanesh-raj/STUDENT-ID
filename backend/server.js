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
// const whitelist=['http://localhost:3000','http://172.20.10.2:3000'];
// var corsOption={
//     origin:"http://localhost:3000",
//     optionsSuccessStatus:200
// }

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

const corsOptions = {
    origin:["http://localhost:3001","http://localhost:3000"],
    // origin: ['celadon-cendol-c0aba0.netlify.app','localhost:3000'],
    credentials: true, // This allows the server to accept cookies from the client
};

// const corsOption={
//     origin:
//         (origin,callback)=>{
//             console.log(origin);
//             if(whitelist.indexOf(origin)!==-1){
//                 callback(null,true);
//             }
//             else{
//                 console.log("error occured"); 
//                 callback(new Error("not allowed by cors"));
//             }
//         }
//         // optionsSuccessStatus:200   
// }
// app.use((req,res,next)=>{
//     console.log(req.hostname);
//     next();
// });
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("db connected successfully")).catch(()=>console.log("err occured in connecting db"));
app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());
app.get("/*",(req,res,next)=>{
    console.log("request came");
    next()
}
);
// console.log("request came");
app.use("/login",require("./routes/login"));
app.use("/register",require("./routes/register"));
// app.use(verifyJWT);  
app.use("/newgpa",require("./routes/newgpa"));
app.use("/adminsearch",require("./routes/adminsearch"));
// app.use("/refresh",require("./routes/refreshtoken"));
app.use("/addgpa",require("./routes/addgpa"));
app.use("/getTemplate",require("./routes/getTemplate"));
app.use("/addplatform",require("./routes/addplatform"));
app.use("/savegpa",require("./routes/savegpa"));
app.use("/getusergpadata",require("./routes/getusergpadata"));
app.use("/finduser",require("./routes/finduser"));
app.use("/contact", require('./routes/contact'));


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


