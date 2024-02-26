import React from "react";
// import {createBrowserRouter,RouterProvider} from "react-router-dom";
import {BrowserRouter,Routes,Route} from "react-router-dom";
// component imports

import Login from "./Components/Login";
import Register from "./Components/Register";
import Gpa from "./Components/CGPA/Gpa";

// component imports
import {DataProvider} from "./Components/context/usecontext";
import { AuthProvider } from "./Components/context/authcontext";
import Layout from "./Components/Layout";
import Requireauth from "./Components/Requireauth";
import Home from "./Components/Home";
import Adminpage from "./Components/Adminpage";
import Addplatform from "./Components/Addplatform";
import Profile from "./Components/Profile";
const reactDOM=require("react-dom/client");
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


const root=reactDOM.createRoot(document.getElementById("root"));
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

root.render(
    <DataProvider>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                        
                        <Route element={<Requireauth allowedroles={[100]}/>}>
                            <Route path="admin" element={<Adminpage/>}/>
                        </Route>
                        <Route element={<Requireauth allowedroles={[200,300]}/>}>
                            <Route path="profile" element={<Profile/>}/>
                            <Route path="gpa" element={<Gpa/>}/>
                            <Route path="addplatform" element={<Addplatform/>}/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
     </DataProvider>
);
// browser router
