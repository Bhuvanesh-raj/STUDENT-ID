import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/authcontext";
const Home=()=>{
    const {auth}=useContext(AuthContext);
    const loggedin=auth.loggedin;
    const roles=auth.roles || [];
    if(loggedin){
        if(roles.includes(100)){
            return (
                <section>
                    <p>Home page</p>
                    <Link to={"/login"}>Login</Link>
                    <br/>
                    <br/>
                    <Link to={"/register"}>SignUp</Link>
                    <br/>
                    <br/>
                    <Link to={"/gpa"}>Gpa</Link>
                    <br/>
                    <br/>
                    <Link to={"/admin"}>admin</Link>
                    <br/>
                    <br/>
                    <Link to={"/profile"}>profile</Link>
                    <br/>
                    <br/>
                    <Link to={"addplatform"}><button>Addplatform</button></Link>
                </section>
            )
        }
        return (
            <section>
            <p>Home page</p>
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
            <Link to={"addplatform"}><button>Addplatform</button></Link>
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