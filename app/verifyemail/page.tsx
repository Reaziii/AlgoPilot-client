"use client"
import { LoadingContest } from '@/providers/Loading'
import client from '@/utils/client'
import SnakBar from '@/components/Snakbar'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
const VerifyEmail = () => {
  const [opensnakbar, setOpensnakbar] = useState(false);
  const { setLoading } = useContext(LoadingContest);
  const [snakbarmessage, setSnakbarmessage] = useState<{ type: "success" | "error", message: string, open: boolean }>({
    type: "success",
    message: "",
    open: false,
  })
  const router = useRouter();
  const handleVerify = (formdata: FormData) => {
    setLoading(true);
    client.post("/auth/verify", {
      email: formdata.get("email"),
      otp: formdata.get("otp")
    }).then(res => {
      setLoading(false);
      if (res.data.status) {
        router.push("/login")
      }
      else {
        setSnakbarmessage({
          type: "error",
          message: res.data.message,
          open: true
        })
      }
    }).catch((err) => {
      setLoading(false);
    })
  }
  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <SnakBar open={snakbarmessage.open} onClose={() => setSnakbarmessage({ type: "error", open: false, message: "" })} type={snakbarmessage.type}>
        <p>{snakbarmessage.message}</p>
      </SnakBar>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
        <form action={handleVerify} className='flex flex-col items-center'>
          <input name='otp' type="text" className="block w-[300px] p-4 ps-10 mt-[20px] text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your Otp" required />
          <input name='email' type="email" className="block w-[300px] p-4 ps-10 mt-[20px] text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your Email" required />
          <button type="submit" className="mt-[30px] w-[100%] text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Verify</button>
          <a className='text-[#4e4e4e] mt-[20px] text-center w-full' href={"/login"}>I already have an account</a>
          <a className='text-[#4e4e4e] mt-[20px] text-center w-full' href={"/registration"}>I don't have account</a>
        </form>
      </div>
    </div>
  )
}

export default VerifyEmail