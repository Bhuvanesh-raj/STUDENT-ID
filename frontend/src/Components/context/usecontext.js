import { createContext,useState } from "react";

const DataContext=createContext({});

export const DataProvider=({children})=>{
    const [name,setname]=useState("");

    return <DataContext.Provider value={
        {
            name,setname        
        }
    }>
        {children}
    </DataContext.Provider>
}


export default DataContext;


