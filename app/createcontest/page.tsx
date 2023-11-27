"use client"
import React, { useContext, useState } from 'react'
import AddAuthors from './AddAuthors';
import Description from './Description';
import client from '@/utils/client';
import { LoadingContest } from '@/providers/Loading';
const CreateContest = async () => {
  const { setLoading } = useContext(LoadingContest)
  const handleSubmit = async (formdata: FormData) => {
    setLoading(true);
    let name: string | null = formdata.get("contestname") as string | null;
    let date: string | null = formdata.get("date") as string | null;
    let time: string | null = formdata.get("time") as string | null;
    let length: string | null = formdata.get("length") as string | null;
    let announcement: string | null = formdata.get("announcement") as string | null;
    let description: string | null = formdata.get("description") as string | null;
    let authors: string | null = formdata.get("authors") as string | null;
    client.post("/contest/create", {
      name, date, time, length, announcement, description, authors
    }).then(res => {
      if (res.data.status) {
        window.location.href = "/addproblems/" + res.data.slug;
      }
    })
  }
  return (
    <div className='flex justify-between'>
      <div className='p-[40px] box-border w-full'>
        <form action={handleSubmit} className='w-full bg-white border border-gray-200 shadowp-[20px] p-[20px] rounded-lg'>
          <h1 className='font-bold text-[20px]'>Create New Contest</h1>
          <br />
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Contest Name</label>
            <input name='contestname' type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="Contest name ex:ACM ICPC Regional 2023" required />
          </div>
          <br />
          <div className="flex justify-between">
            <div className='w-[48%]'>
              <label className="block mb-2 text-sm font-medium text-gray-900">Contest Start Date:</label>
              <input name='date' type="date" id="first_name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div className='w-[48%]'>
              <label className="block mb-2 text-sm font-medium text-gray-900">Contest Start Time:</label>
              <input name='time' type="time" id="first_name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
          </div>
          <br />

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Contest Length in minutes:</label>
            <input name='length' type="number" id="first_name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[48%] p-2.5" placeholder='Enter Contest length in minutes' required />
          </div>
          <br />
          <br />
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Notes:</label>
            {/* <textarea name='description' id="first_name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-[100px]" placeholder='Description' /> */}
            <Description />
          </div>
          <br />
          <AddAuthors />
          <br />
          <div className="flex justify-end">
            <button type="submit" className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 w-[150px]">Create</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default CreateContest