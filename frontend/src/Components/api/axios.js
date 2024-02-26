import axios from "axios";
const BASE_URL="https://student-data-management-ig7q.onrender.com";

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
