import React from "react";
import "./index.css";
// import {createBrowserRouter,RouterProvider} from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// component imports

import Login from "./Components/Login";
import Register from "./Components/Register";
import Gpa from "./Components/CGPA/Gpa";

// component imports
import { DataProvider } from "./Components/context/usecontext";
import { AuthProvider } from "./Components/context/authcontext";
// import Layout from "./Components/Layout";
import Requireauth from "./Components/Requireauth";
import Home from "./Components/Home";
import Adminpage from "./Components/Adminpage";
import Addplatform from "./Components/Addplatform";
import Profile from "./Components/Profile";
import Addnewgpa from "./Components/Addnewgpa";
import Templategpa from "./Components/Templategpa";
import Searchusers from "./Components/AdminComponents/Searchusers";
import Addtemplate from "./Components/AdminComponents/Addtemplate";
import Layout from "./Components/Layout";
import Contact from "./Components/Contact";
const reactDOM = require("react-dom/client");
// Router provider

// const router=createBrowserRouter([
//     {
//         path:"/",
//         element:<Demo/>,
//     },
//     {
//         path:"/login",
//         element:<Login/>
//     },
//     {
//         path:"/register",
//         element:<Register/>
//     }
//     ,{
//         path:"/gpa",
//         element:<Gpa/> 
//     }
// ]);


const root = reactDOM.createRoot(document.getElementById("root"));
// root.render(
//     <AuthProvider>
//             <section>
//                 {/* <DataProvider> */}
//                 <RouterProvider router={router}/>
//                 {/* </DataProvider> */}
//             </section>
//      </AuthProvider>
//     )       
// Router provider

// browser router

// backup

// root.render(
//     <DataProvider>
//         <AuthProvider>
//             <BrowserRouter>
//                 <Routes>
//                     <Route path="/" element={<Layout/>}>
//                         <Route path="/" element={<Home/>}/>
//                         <Route path="login" element={<Login/>}/>
//                         <Route path="register" element={<Register/>}/>

//                         <Route element={<Requireauth allowedroles={[100]}/>}>
//                             <Route path="admin" element={<Adminpage/>}/>
//                         </Route>
//                         <Route element={<Requireauth allowedroles={[200,300]}/>}>
//                             <Route path="profile" element={<Profile/>}/>
//                             <Route path="gpa" element={<Gpa/>}/>
//                             <Route path="addplatform" element={<Addplatform/>}/>
//                         </Route>
//                     </Route>
//                 </Routes>
//             </BrowserRouter>
//         </AuthProvider>
//      </DataProvider>
// );

// backup
// browser router
root.render(
    <DataProvider>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route exact path="" element={<Home />} />
                        <Route exact path="login" element={<Login />} />
                        <Route exact path="register" element={<Register />} />
                        <Route element={<Requireauth allowedroles={[100]} />}>
                            <Route exact path="searchusers" element={<Searchusers />} />
                            <Route exact path="addgpatemplate" element={<Addtemplate />} />
                            <Route exact path="admin" element={<Adminpage />} />
                        </Route>
                        <Route element={<Requireauth allowedroles={[200, 300]} />}>
                            <Route exact path="profile" element={<Profile />} />
                            <Route exact path="gpa" element={<Gpa />} />
                            <Route exact path="newgpa/:index" element={<Templategpa />} />
                            <Route exact path="addnewgpa" element={<Addnewgpa />} />
                            <Route exact path="addplatform" element={<Addplatform />} />
                        </Route>
                        <Route exact path="contact" element={<Contact />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </DataProvider>
);
