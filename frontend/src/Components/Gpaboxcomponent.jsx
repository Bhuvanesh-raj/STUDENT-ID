import React from "react";

const Gpaboxcomponent = ({ data }) => {
    const { semester, year, branch } = data;

    return (
        <div className="p-4 bg-white rounded-lg shadow-md w-full">
            <p className="text-lg font-bold">Department - {branch}</p>
            <p>Semester - {semester}</p>
            <p>Year - {year}</p>
        </div>
    );
};

export default Gpaboxcomponent;
