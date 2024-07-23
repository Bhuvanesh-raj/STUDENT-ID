import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./context/authcontext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import profileImg from "../images/profileImg1.jpg";

const Profile = () => {
    const { auth } = useContext(AuthContext);
    const { username, dob, registernumber, year, collegename } = auth;
    const axiosPrivate = useAxiosPrivate();
    const [usergpa, setusergpa] = useState([]);
    useEffect(() => {
        // const responce=async ()=>{
        //     const data=await axiosPrivate.get("/getusergpadata",{registernumber:registernumber.toString()});
        //     console.log(registernumber);
        //     console.log(data);
        // }
        // responce();
        const handlesubmit = async () => {
            try {
                const responce = await axiosPrivate.post("/finduser", { registernumber });
                console.log(responce.data);
                const { gpa } = responce.data;
                // console.log(gpaa.gpa);
                // gpa=gpa.filter((item)=>item.tittle!="dummy");
                console.log([...gpa]);
                setusergpa([...gpa]);
                // setdata({...responce.data});
            }
            catch (error) {
                console.error(error.responce?.data?.message || error.message);
            }
        }
        // setInterval(async ()=>handlesubmit(),2000);
        handlesubmit();

    }, []);

    return (
        <section className="p-8 max-w-lg mx-auto bg-base-200 rounded-lg shadow-lg flex flex-col items-center">
            <img
                src={profileImg}
                alt="Profile"
                className="w-32 h-32 rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <div className="mb-4 w-full">
                <p className="text-lg"><span className="font-semibold">Name:</span> {username}</p>
                <p className="text-lg"><span className="font-semibold">DOB:</span> {dob}</p>
                <p className="text-lg"><span className="font-semibold">Register Number:</span> {registernumber}</p>
                <p className="text-lg"><span className="font-semibold">Year:</span> {year}</p>
                <p className="text-lg"><span className="font-semibold">College Name:</span> {collegename}</p>
            </div>
            <div className="mb-4 w-full">
                <h3 className="text-xl font-semibold">GPA Details:</h3>
                {usergpa.length > 0 ? (
                    usergpa.map((item, index) => (
                        <p key={index} className="text-lg">{item.tittle + " " + item.gpa}</p>
                    ))
                ) : (
                    <p className="text-lg">No GPA data available.</p>
                )}
            </div>
            <div className="flex flex-col space-y-4 w-full">
                <Link to="/addplatform" className="btn btn-primary transition-transform transform hover:scale-105">
                    Add Platform
                </Link>
                <Link to="/addnewgpa" className="btn btn-primary transition-transform transform hover:scale-105">
                    Add Existing GPA
                </Link>
                <Link to="/gpa" className="btn btn-primary transition-transform transform hover:scale-105">
                    Add Custom GPA
                </Link>
            </div>
        </section>
    );
}

export default Profile;