import React, { useState, useEffect } from "react";
import axios from "./api/axios";
import Gpaboxcomponent from "./Gpaboxcomponent";
import { Link, useNavigate } from "react-router-dom";

const Addnewgpa = () => {
    const [templatedata, settemplatedata] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetch() {
            const response = await axios.get("/getTemplate");
            console.log(response.data);
            settemplatedata([...response.data]);
        }
        fetch();
    }, []);

    const handleclick = (index) => {
        navigate(`/newgpa/${index}`);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
            <section className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Available GPA Templates</h1>
                <Link to="/" className="btn btn-primary mb-4 ml-2">Home</Link>
                {templatedata.length > 0 ? templatedata.map((item, index) => (
                    <div key={index} className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
                        <Gpaboxcomponent data={item} />
                        <button
                            onClick={() => handleclick(index)}
                            className="btn btn-primary ml-4"
                        >
                            Enter
                        </button>
                    </div>
                )) : (
                    <p className="text-center text-gray-500">There are no templates available</p>
                )}
            </section>
        </div>
    );
}

export default Addnewgpa;
