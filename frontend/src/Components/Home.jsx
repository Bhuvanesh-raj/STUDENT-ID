import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/authcontext";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
const Home=()=>{
    const {auth}=useContext(AuthContext);
    const navigate=useNavigate();
    const loggedin=auth.loggedin;
    const roles=auth.roles || [];
    if(loggedin){
        if(roles.includes(100)){
            return (
                <>
                    <h1>Welcome to Admin Page</h1>
                    <Link to={"/admin"}>adminpage</Link>
                </>
            )
        }
        return (
            <section>
            <Profile/>
            {/* <p>Home page</p>
            <Link to={"/login"}>Login</Link>
            <br/>
            <br/>
            <Link to={"/register"}>SignUp</Link>
            <br/>
            <br/>
            <Link to={"/gpa"}>Gpa</Link>
            <br/>
            <br/>
            <Link to={"/profile"}>profile</Link>
            <br/>
            <br/>
            <Link to={"addplatform"}><button>Addplatform</button></Link> */}
        </section>
        )
    }
    else{
        return (
            <section>
            <p>Home page</p>
            <Link to={"/login"}>Login</Link>
            <br/>
            <br/>
            <Link to={"/register"}>SignUp</Link>
            <br/>
        </section>
        )
    }
}

export default Home;