import React, { useState, useEffect, useRef } from "react";
import axios from "./api/axios";
import { useContext } from "react";
import AuthContext from "./context/authcontext";
import { useNavigate, useLocation } from "react-router-dom";
// import userefreshtoken from "../hooks/userefreshtoken";
const Login = () => {
    const { setauth } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from || "/";
    const usernameinput = useRef();
    // const errfocus=useRef();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const [success, setsuccess] = useState(false);
    const [err, seterr] = useState("");
    // const navigate=useNavigate();
    useEffect(() => {
        seterr("");
    }, [username, password]);

    useEffect(() => {
        usernameinput.current.focus();
    }, []);
    const submitevent = async (e) => {
        e.preventDefault();
        console.log(username + " " + password);
        try {
            let responce = await axios.post("/login", { username, password });
            console.log(responce);
            if (responce.status === 401 || responce.status == 403) {
                alert("Invalid username or password");
                // responce.data=[];
                throw new Error("not authenticated");
            }
            if (responce.data) {
                const { accesstoken, roles, dob, registernumber, year, collegename } = responce.data;
                setauth({ username, accesstoken, roles, dob, registernumber, year, collegename, loggedin: true });
                setsuccess(true);
                navigate(from);
            }
        }
        catch (e) {
            // console.log(e.status);
            alert("ERROR OCCURED");
        }
    }
    return (
        (success ?
            <p>successfully logged in!!</p>
            :
            <section className="flex flex-col items-center p-8">
                {err ? <p className="text-red-500">{err}</p> : <></>}
                {/* <p>Error block!!</p> */}
                <form onSubmit={submitevent} className="w-full max-w-md bg-base-200 p-8 rounded-lg shadow-lg">
                    <div className="form-control mb-4">
                        <label htmlFor="username" className="label">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            ref={usernameinput}
                            required
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            className="input input-bordered"
                        />
                    </div>

                    <div className="form-control mb-4">
                        <label htmlFor="password" className="label">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            required
                            autoComplete="off"
                            onChange={(e) => setpassword(e.target.value)}
                            className="input input-bordered"
                        />
                    </div>

                    <button className="btn btn-primary" disabled={!username || !password}>
                        Submit
                    </button>
                </form>
                <button className="btn btn-link" onClick={() => navigate("/register")}>
                    New User?
                </button>
                {/* <button onClick={()=>refresh()}>getrefreshtoken</button> */}
            </section>
        )
    );
}

export default Login;