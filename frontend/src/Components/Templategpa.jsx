import { useContext , useEffect ,useState} from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AuthContext from "./context/authcontext";
import { useNavigate } from "react-router-dom";
const Templategpa=()=>{
    const {index}=useParams();
    const mapping={
        'O':10,
        'A+':9,
        'A':8,
        'B+':7,
        'B':6,
        'C+':5,
        'o':10,
        'a+':9,
        'a':8,
        'b+':7,
        'b':6,
        'c+':5
    }
    const {auth}=useContext(AuthContext);
    const {username,registernumber}=auth;

    const navigate=useNavigate();
    const [keys,setkeys]=useState([]);
    const [values,setvalues]=useState([]);
    const [grades, setGrades] = useState(Array(keys.length).fill(''));
    const [sumofcredit,setsumofcredit]=useState(0);
    const [calculategpastate,setcalculatedgpastate]=useState(false);
    const [calculatedgpa,setcalculatedgpa]=useState(0);
    const [semester,setsemester]=useState(0);

    const axiosPrivate=useAxiosPrivate();
    useEffect(()=>{
        async function fetch(){
            const responce=await axiosPrivate.get("/getTemplate");
            console.log(responce.data);

            var x={...responce.data[index]};
            setkeys([...Object.keys(x.template)]);
            setvalues([...Object.values(x.template)]);
            setsemester(responce.data[index].semester);
        }
        fetch();
        console.log(username);
        console.log(registernumber);
        console.log(calculatedgpa);

    },[]);

    const calulategpaevent=()=>{
        setcalculatedgpastate(true);
        setcalculatedgpa(calculateSum()/sumofcredit);
    }
      const handleChange = (index, event) => {
        setcalculatedgpastate(false);
        const newGrades = [...grades];
        var temp=event.target.value;
        if(temp.length>2){
            temp=temp.slice(0,2);
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
      useEffect(()=>{
        const calculateSum = () => {
            return values.reduce((sum, value) => sum + value, 0);
          };
          setsumofcredit(calculateSum());
          
      },[values]);

      useEffect(()=>{
        setcalculatedgpa(calculateSum());
      },[grades]);

      const saveprogressevent=async ()=>{
        const responce=await axiosPrivate.post("/savegpa",{registernumber,username,calculatedgpa,semester})
        navigate("/");
      }

    return (
        <section>
           {/* <p>SEMESTER: {template.semester}</p>
           <p>BRANCH: {template.branch}</p>
           <p>YEAR: {template.year}</p>
           <p>CREDIT: {JSON.stringify(credit)}</p> */}
           {keys.map((key, index) => (
              <div key={index}>
                 <p style={{ display: 'inline-block' }}>{key}</p>
                 <input
                    type="text"
                    placeholder="enter your grade"
                    value={grades[index]}
                    onChange={(event) => handleChange(index, event)}
                />
              </div>
            ))}
            <button onClick={()=>calulategpaevent()}>Calculate GPA</button>
            {calculategpastate?<><p>calculated gpa:{calculatedgpa}</p> <button onClick={()=>saveprogressevent()}>Save progress</button></>:<></>}
        </section>
    )
}

export default Templategpa;