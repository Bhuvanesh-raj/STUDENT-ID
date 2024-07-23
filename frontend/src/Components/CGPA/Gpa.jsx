import { useState, useEffect } from "react";
import Subject from "./Subjects";
import AuthContext from "../context/authcontext";
import { useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Gpa = () => {
    const { auth } = useContext(AuthContext);
    const [calculatedgpa, setcalculatedgpa] = useState();
    const [gpa, addgpa] = useState([]);
    const [count, setcount] = useState(1);
    const [credit, setcredit] = useState(0);
    const [grade, setgrade] = useState("");
    const [subject, setsubject] = useState(`Subject ${count}`);
    const [proceed, setproceed] = useState(false);
    const [inputtittle, setinputtittle] = useState("");
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (gpa.length === 0) {
            setproceed(false);
        }
    }, [gpa]);

    const submitevent = (e) => {
        e.preventDefault();
        const data = {
            count, subject, credit, grade
        }
        addgpa([...gpa, data]);
        setcount(count + 1);
        setsubject(`Subject ${count + 1}`);
        setcredit(0);
        setgrade("");
    }

    const savegpaevent = async (e) => {
        e.preventDefault();
        const response = await axiosPrivate.post("/addgpa", { tittle: inputtittle, gpa: gpa, username: auth.username, calculatedgpa: calculatedgpa });
        if (response.status === 200) {
            navigate("/");
        } else if (response.status === 403) {
            navigate("/login", { state: { from: location }, replace: true });
        }
    }

    const calculategpa = () => {
        const numequ = {
            'O': 10,
            'A+': 9,
            'A': 8,
            'B+': 7,
            'B': 6
        }
        let product = 0;
        let totalcredit = 0;
        gpa.forEach((sub) => {
            product += Number(sub.credit) * numequ[sub.grade];
            totalcredit += Number(sub.credit);
        })
        setcalculatedgpa(product / totalcredit);
        setproceed(true);
    }

    useEffect(() => {
        setcalculatedgpa("");
    }, [gpa]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="p-6 bg-white text-black w-1/2">
                <h1 className="text-3xl font-bold mb-4 text-center">Add your Custom GPA</h1>
                <Link to="/" className="btn btn-primary mb-4">Home</Link>
                <section className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <form onSubmit={submitevent} className="grid grid-cols-1 gap-4">
                        <div>
                            <label htmlFor="Subject" className="block mb-1">Subject:</label>
                            <input
                                id="Subject"
                                type="text"
                                value={subject}
                                onChange={(e) => setsubject(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="Grade" className="block mb-1">Grade:</label>
                            <input
                                id="Grade"
                                type="text"
                                value={grade}
                                onChange={(e) => setgrade(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="Credit" className="block mb-1">Credit:</label>
                            <input
                                id="Credit"
                                type="number"
                                value={credit}
                                onChange={(e) => setcredit(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button className="btn btn-secondary mt-4 w-1/2">Add</button>
                        </div>
                    </form>
                    {gpa.length ? gpa.map((sub, index) => <Subject key={index} index={index} sub={sub} gpa={gpa} addgpa={addgpa} />) : <></>}
                    <div className="flex justify-center">
                        <button onClick={calculategpa} disabled={!gpa.length} className="btn btn-primary mt-4">Calculate</button>
                    </div>
                    {calculatedgpa && <p className="mt-4 text-lg">Calculated GPA: {calculatedgpa}</p>}
                    <div className={`mt-4 ${!proceed || !gpa.length ? 'hidden' : ''}`}>
                        <label htmlFor="inputtittle" className="block mb-1">Title</label>
                        <input
                            id="inputtittle"
                            type="text"
                            value={inputtittle}
                            onChange={(e) => setinputtittle(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <div className="flex justify-center">
                            <button onClick={savegpaevent} disabled={!proceed} className="btn btn-success mt-4">Save progress</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
export default Gpa;
