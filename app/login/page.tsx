"use client"
import { LoadingContest } from '@/providers/Loading'
import SnakBar from '@/components/Snakbar'
import React, { useContext, useState } from 'react'
import client from '@/utils/client'
const Login = () => {
    const [opensnakbar, setOpensnakbar] = useState(false);
    const { setLoading } = useContext(LoadingContest);
    const [snakbarmessage, setSnakbarmessage] = useState<{ type: "success" | "error", message: string }>({
        type: "success",
        message: ""
    })
    const handleLogin = (formdata: FormData) => {
        setLoading(true);
        client.post("/auth/login", {
            email: formdata.get("email"),
            password: formdata.get("password")
        }).then(res => {
            setLoading(false);
            if (res.data.status) {
                const token = res.data.token;
                localStorage.setItem("auth", token);
                window.location.href = "/"
                document.cookie = `token=${token}; Path=/;`;
            }
            else {
                setOpensnakbar(true);
                setSnakbarmessage({ message: res.data.message, type: "error" })
            }
        }).catch(err => setLoading(false))
    }
    return (
        <div className='flex justify-center items-center h-[90vh]'>
            <SnakBar open={opensnakbar} onClose={() => setOpensnakbar(false)} type={snakbarmessage.type}>
                <p>{snakbarmessage.message}</p>
            </SnakBar>
            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
                <form action={handleLogin} className='flex flex-col items-center'>
                    <input name='email' type="email" id="default-search" className="block w-[300px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your Email" required />
                    <input name='password' type="password" id="default-search" className="block w-[300px] p-4 ps-10 mt-[20px] text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your password" required />
                    <button type="submit" className="mt-[30px] w-[100%] text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Login</button>
                    <a className='text-[#4e4e4e] mt-[20px] text-center w-full' href={"/registration"}>I don't have account</a>
                </form>
            </div>

        </div>
    )
}

export default Login