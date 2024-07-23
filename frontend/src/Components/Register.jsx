import React, { useState } from "react";
import axios from "./api/axios";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NewRegister = () => {
  // const axiosPrivate = useAxiosPrivate();
  const [fullname, setfullname] = useState("");

  const [dob, setdob] = useState("01/07/2003");

  const [registernumber, setregisternumber] = useState("");

  const [year, setyear] = useState(1);

  const [collegename, setcollegename] = useState("");

  const [password, setpassword] = useState("");

  const [confirmpassword, setconfirmpassword] = useState("");

  const navigate = useNavigate();
  const nameregex = /^[a-zA-Z]{3,}$/;
  const dobRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;
  const registernumberregex = /^\d{5,}$/;
  const collegenameregex = /^[a-zA-Z\s]+$/;
  const passwordregex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_])[A-Za-z0-9\W_]+$/;

  const registerevent = async (e) => {
    e.preventDefault();
    const responce = await axios.post("/register", {
      fullname,
      dob,
      registernumber,
      year,
      collegename,
      password,
    });
    console.log(responce);
    if (responce.data === "success!!") {
      alert("User registered");
      navigate("/login");
    } else {
      alert("invalid");
    }
  };

  const valid =
    !dobRegex.test(dob) ||
    !nameregex.test(fullname) ||
    !registernumberregex.test(registernumber) ||
    !collegenameregex.test(collegename) ||
    !passwordregex.test(password) ||
    password !== confirmpassword ||
    year <= 0 ||
    year > 5;

  return (
    <section className="flex flex-col items-center p-8">
      <Link to={"/"} className="btn btn-link">
        Home
      </Link>
      <form onSubmit={registerevent} className="w-full max-w-md bg-base-200 p-8 rounded-lg shadow-lg">
        <div className="form-control mb-4">
          <label htmlFor="fullname" className="label">
            Fullname
          </label>
          <input
            id="fullname"
            type="text"
            value={fullname}
            onChange={(e) => setfullname(e.target.value)}
            className="input input-bordered"
          />
        </div>
        <div className="form-control mb-4">
          <label htmlFor="dob" className="label">
            Date of Birth
          </label>
          <input
            id="dob"
            type="text"
            placeholder="01/01/2003"
            value={dob}
            onChange={(e) => setdob(e.target.value)}
            className="input input-bordered"
          />
        </div>
        <div className="form-control mb-4">
          <label htmlFor="year" className="label">
            Year
          </label>
          <input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setyear(e.target.value)}
            className="input input-bordered"
          />
        </div>
        <div className="form-control mb-4">
          <label htmlFor="registernumber" className="label">
            Register Number
          </label>
          <input
            id="registernumber"
            type="text"
            value={registernumber}
            onChange={(e) => setregisternumber(e.target.value)}
            className="input input-bordered"
          />
        </div>
        <div className="form-control mb-4">
          <label htmlFor="collegename" className="label">
            College Name
          </label>
          <input
            id="collegename"
            type="text"
            value={collegename}
            onChange={(e) => setcollegename(e.target.value)}
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
            onChange={(e) => setpassword(e.target.value)}
            className="input input-bordered"
          />
        </div>
        <div className="form-control mb-4">
          <label htmlFor="confirmpassword" className="label">
            Confirm Password
          </label>
          <input
            id="confirmpassword"
            type="password"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
            className="input input-bordered"
          />
        </div>
        <button className="btn btn-primary" disabled={valid}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default NewRegister;
