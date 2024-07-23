import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AuthContext from "./context/authcontext";

const Templategpa = () => {
  const { index } = useParams();
  const mapping = {
    'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C+': 5,
    'o': 10, 'a+': 9, 'a': 8, 'b+': 7, 'b': 6, 'c+': 5
  };
  const { auth } = useContext(AuthContext);
  const { username, registernumber } = auth;
  const navigate = useNavigate();
  const [keys, setKeys] = useState([]);
  const [values, setValues] = useState([]);
  const [grades, setGrades] = useState(Array(keys.length).fill(''));
  const [sumofcredit, setSumofcredit] = useState(0);
  const [calculateGpaState, setCalculateGpaState] = useState(false);
  const [calculatedGpa, setCalculatedGpa] = useState(0);
  const [semester, setSemester] = useState(0);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function fetch() {
      const response = await axiosPrivate.get("/getTemplate");
      console.log(response.data);
      const templateData = { ...response.data[index] };
      setKeys([...Object.keys(templateData.template)]);
      setValues([...Object.values(templateData.template)]);
      setSemester(response.data[index].semester);
    }
    fetch();
  }, []);

  const calculateGpaEvent = () => {
    setCalculateGpaState(true);
    setCalculatedGpa(calculateSum() / sumofcredit);
  }

  const handleChange = (index, event) => {
    setCalculateGpaState(false);
    const newGrades = [...grades];
    let temp = event.target.value;
    if (temp.length > 2) {
      temp = temp.slice(0, 2);
    }
    newGrades[index] = temp;
    setGrades(newGrades);
  };

  const calculateSum = () => {
    return grades.reduce((sum, grade, index) => {
      const value = parseFloat(mapping[grade]) || 0;
      return sum + value * values[index];
    }, 0);
  };

  useEffect(() => {
    const totalCredits = values.reduce((sum, value) => sum + value, 0);
    setSumofcredit(totalCredits);
  }, [values]);

  useEffect(() => {
    setCalculatedGpa(calculateSum());
  }, [grades]);

  const saveProgressEvent = async () => {
    const response = await axiosPrivate.post("/savegpa", { registernumber, username, calculatedGpa, semester });
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <section className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Enter Your Grades</h1>
        {keys.map((key, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 mb-2 font-bold ml-1">{key}</label>
            <input
              type="text"
              placeholder="Enter your grade"
              value={grades[index]}
              onChange={(event) => handleChange(index, event)}
              className="input input-bordered w-full"
            />
          </div>
        ))}
        <div className="flex justify-center mt-4">
          <button onClick={calculateGpaEvent} className="btn btn-primary">Calculate GPA</button>
        </div>
        {calculateGpaState && (
          <div className="mt-6 text-center">
            <p className="text-lg">Calculated GPA: {calculatedGpa}</p>
            <button onClick={saveProgressEvent} className="btn btn-success mt-4">Save Progress</button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Templategpa;
