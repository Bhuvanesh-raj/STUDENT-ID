import AuthContext from "./context/authcontext";
import { createContext, useContext } from "react";
const Profile=()=>{
    const {auth}=useContext(AuthContext);
    return (
        <section>
            <p>Name: {auth.username}</p>
            <p>DOB: {auth.dob}</p>
            <p>Registernumber: {auth.registernumber}</p>
            <p>Year: {auth.year}</p>
            <p>College name: {auth.collegename}</p>
            
        </section>
    )
}

export default Profile;