import axios, { AxiosInstance } from 'axios';
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
let auth = "";
try {
    auth = localStorage.getItem("auth") ?? ""
} catch (err) { }
const client: AxiosInstance = axios.create({
    baseURL: backendURL,
    headers: {
        authorization: auth,
    }
});
export default client;
