import React from "react";
 

const Calculategpa=({index})=>{
    const [templatedata,settemplatedata]=useState([{semester:4}]);
    // const {auth}=useContext(AuthContext);
    useEffect(()=>{
        async function fetch(){
            const responce=await axios.get("/getTemplate");
            console.log(responce.data);
            settemplatedata([...responce.data]);
        }
        fetch();
    },[]);

    const data=da

    return (<></>)
}

export default Calculategpa;