import axios, { AxiosInstance } from 'axios';
import { cookies } from 'next/headers';
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL
let auth = "";
try {
    auth = cookies().get("token")?.value ?? ""
} catch (err) { }
const serverClient: AxiosInstance = axios.create({
    baseURL: backendURL,
    headers: {
        authorization: auth,
    }
});
export default serverClient;
