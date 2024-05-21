import axios from "axios";
// require("dotenv").config();
// const BASE_URL="https://student-data-management-ig7q.onrender.com";
// const BASE_URL=process.env.REACT_APP_BACKEND_URL;
// const BASE_URL="http://172.20.10.2:3500";
const BASE_URL='http://localhost:3500';

export const axiosPrivate=axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
    headers:{"Content-Type":'application/json'}
})

export default axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
    headers:{"Access-Control-Allow-Credentials": true}
});
