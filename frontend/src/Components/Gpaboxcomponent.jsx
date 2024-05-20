import React from "react";

const Gpaboxcomponent=({data})=>{
    const {semester,year,branch}=data;

    return (
        <li>
            <ul>{semester}</ul>
            <ul>{year}</ul>
            <ul>{branch}</ul>
        </li>
        );
}

export default Gpaboxcomponent;