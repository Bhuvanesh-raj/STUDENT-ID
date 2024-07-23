import React, { useState, useEffect, useContext } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AuthContext from "./context/authcontext";
import { Link } from "react-router-dom";

const COLORS = ['#68d391', '#f6e05e', '#fc8181']; // Tailwind CSS colors

const Addplatform = () => {
    const [platform, setPlatform] = useState("Leetcode");
    const [api, setApi] = useState("https://leetcode-stats-api.herokuapp.com/");
    const [platformUsername, setPlatformUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [status, setStatus] = useState("");
    const { auth } = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate();

    const checkValidUser = async (e) => {
        e.preventDefault();
        const userApi = api + platformUsername;
        try {
            const res = await axios(userApi);
            if (platform === "Leetcode") {
                if (res.data.status === "success") {
                    setUserData(res.data);
                    setStatus(true);
                } else {
                    setUserData("No user exists");
                    setStatus(false);
                }
            } else if (platform === "Codechef") {
                if (res.data.success === "true") {
                    setUserData(res.data);
                    setStatus(true);
                } else {
                    setUserData("No user exists");
                    setStatus(false);
                }
            }
        } catch (error) {
            console.error(error);
            setStatus(false);
        }
    };

    useEffect(() => {
        setStatus(false);
        setUserData(null);
    }, [platformUsername]);

    const handleChange = (e) => {
        setPlatform(e.target.value);
    };

    useEffect(() => {
        const obj = {
            Codechef: "https://codechef-api.vercel.app/",
            Leetcode: "https://leetcode-stats-api.herokuapp.com/"
        };
        setApi(obj[platform]);
    }, [platform]);

    const saveEvent = async (e) => {
        e.preventDefault();
        alert("button clicked");
        alert(platform + " " + platformUsername);
        await axiosPrivate.post("/addplatform", {
            username: auth.username,
            platform: platform,
            platformUsername: platformUsername
        });
    };

    const pieData = userData ? [
        { name: 'Easy', value: userData.easySolved },
        { name: 'Medium', value: userData.mediumSolved },
        { name: 'Hard', value: userData.hardSolved },
    ] : [];
    const lastFiveProblems = userData ? Object.entries(userData.submissionCalendar)
        .reverse() 
        .slice(0, 5) 
        .map(([timestamp, count], index) => {
            const date = new Date(parseInt(timestamp, 10) * 1000);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return {
                id: index,
                date: `${day}/${month}/${year}`,
                problemsSolved: count,
            };
        }) : [];


    const tableColumns = React.useMemo(
        () => [
            { Header: 'Date', accessor: 'date' },
            { Header: 'Submissions', accessor: 'problemsSolved' },
        ],
        []
    );

    const tableData = React.useMemo(() => lastFiveProblems, [lastFiveProblems]);

    return (
        <section className="p-8 max-w-lg mx-auto bg-gray-100 rounded-lg shadow-lg">
            <Link to="/" className="btn btn-secondary mb-4">Home</Link>
            <h1 className="text-2xl font-bold mb-4">Platform Select</h1>
            <p className="text-red-500 mb-4">{status ? "User found" : "No user exists"}</p>
            <form onSubmit={checkValidUser} className="mb-4">
                <select onChange={handleChange} className="select select-primary mb-4 w-full">
                    <option value="Leetcode">Leetcode</option>
                    <option value="Codechef">Codechef</option>
                    <option value="Hackerrank">Hackerrank</option>
                    <option value="Codeforces">Codeforces</option>
                    <option value="CodingNinjas">CodingNinjas</option>
                </select>
                <input
                    type="text"
                    value={platformUsername}
                    onChange={(e) => setPlatformUsername(e.target.value)}
                    className="input input-bordered input-primary mb-4 w-full"
                    placeholder="Enter platform username"
                />
                <button className="btn btn-primary w-full">Submit</button>
            </form>

            {userData && (
                <>
                    <div className="mb-8">
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend
                                    align="center"
                                    layout="horizontal"
                                    verticalAlign="bottom"
                                    wrapperStyle={{ paddingBottom: '20px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="text-center mt-4 text-xl font-bold">
                            Total Solved: {userData.totalSolved}
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4">Stats Table</h2>
                        <table className="table-auto w-full mb-4 stats-table">
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2">Total Questions:</td>
                                    <td className="px-4 py-2 font-bold">{userData.totalQuestions}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Acceptance Rate:</td>
                                    <td className="px-4 py-2 font-bold">{userData.acceptanceRate}%</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Ranking:</td>
                                    <td className="px-4 py-2 font-bold">{userData.ranking}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Contribution Points:</td>
                                    <td className="px-4 py-2 font-bold">{userData.contributionPoints}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Reputation:</td>
                                    <td className="px-4 py-2 font-bold">{userData.reputation}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                        <table className="table-auto w-full mb-4 last-problems-table">
                            <thead>
                                <tr>
                                    {tableColumns.map(column => (
                                        <th key={column.Header} className="px-4 py-2">{column.Header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map(row => (
                                    <tr key={row.id} className="border-t text-center">
                                        <td className="px-4 py-2">{row.date}</td>
                                        <td className="px-4 py-2 font-bold">{row.problemsSolved}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            <button
                className={`btn btn-success w-full ${!status ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={saveEvent}
                disabled={!status}
            >
                SAVE
            </button>
        </section>
    );
};

export default Addplatform;
