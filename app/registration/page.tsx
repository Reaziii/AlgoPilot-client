"use client"
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import SnakBar from '@/components/Snakbar'
import { LoadingContest } from '@/providers/Loading'
import client from '@/utils/client'
const Registration = () => {
    const router = useRouter();
    const [opensnakbar, setOpensnakbar] = useState(false);
    const { setLoading } = useContext(LoadingContest);
    const [snakbarmessage, setSnakbarmessage] = useState<{ type: "success" | "error", message: string }>({
        type: "success",
        message: ""
    })
    const handleRegistration = (formdata: FormData) => {
        setLoading(true);
        client.post("/auth/registration", {
            email: formdata.get("email"),
            password: formdata.get("password"),
            name: formdata.get("name")
        }).then(res => {
            setLoading(false);
            if (!res.data.status) {
                setOpensnakbar(true);
                setSnakbarmessage({ message: res.data.message, type: "error" })
            }
            else {
                window.location.href = "/verifyemail"
            }
        })
    }

    return (
        <div className='flex justify-center items-center h-[100vh]'>
            <SnakBar open={opensnakbar} onClose={() => setOpensnakbar(false)} type={snakbarmessage.type}>
                <p>{snakbarmessage.message}</p>
            </SnakBar>
            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
                <form action={handleRegistration} className='flex flex-col items-center'>
                    <input name='name' type="text" className="block w-[300px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your full name" required />
                    <input name='email' type="email" className="block w-[300px] p-4 ps-10 mt-[20px]  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your Email" required />
                    <input name='password' type="password" className="block w-[300px] p-4 ps-10 mt-[20px] text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your password" required />
                    <button type="submit" className="mt-[30px] w-[100%] text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Register</button>
                    <a className='text-[#4e4e4e] mt-[20px] text-center w-full' href={"/login"}>I already have an account</a>
                </form>
            </div>

        </div>
    )
}

export default Registration