"use client"
import client from '@/utils/client';
import React, { ChangeEvent, useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import Loader from '@/components/Loader';
import Button from '@/components/Button';

type IPProblem = { name?: string, slug: string, isLoading: boolean, signal?: AbortController, position: number }
const Problems: React.FC<{ handleSubmit: (value: { slug: string, position: number }[]) => Promise<void>, _problems: { name: string; slug: string, position: number }[] }> = ({ handleSubmit, _problems }) => {
    const [problems, setProblems] = useState<IPProblem[]>(_problems.map((item): IPProblem => ({
        name: item.name,
        slug: item.slug,
        signal: new AbortController(),
        isLoading: false,
        position: item.position
    })));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        problems[id].signal?.abort();
        problems[id].isLoading = true;
        problems[id].signal = new AbortController();
        let temp = problems;
        temp[id].slug = e.target.value;
        temp[id].name = "";
        setProblems([...temp])
        client.post("/problem/problemname", {
            slug: problems[id].slug
        }, {
            signal: problems[id].signal?.signal
        }).then(result => {
            problems[id].isLoading = false;
            if (result.data.status) {
                temp[id].name = result.data.name;
                setProblems([...temp])
            }
        }).catch(err => { })
    }
    const handledelete = (id: number) => {
        let temp = problems;
        temp.splice(id, 1);
        setProblems([...temp])
    }
    const add_new_row = () => {
        setProblems([...problems, { slug: "", isLoading: false, position: -1 }]);
    }
    const handlePositionChange = (id: number, e: ChangeEvent<HTMLInputElement>) => {
        let temp = problems;
        temp[id].position = parseInt(e.target.value);
        setProblems([...temp])
    }
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Problems:</label>
            <br />
            {
                problems.map((item, key) => (
                    <div key={key} className="flex justify-between mb-[10px]">
                        <input className='w-[100px] border rounded-lg outline-none text-center' type='number' value={String(item.position)} onChange={(e) => handlePositionChange(key, e)} />
                        <div className='w-[40%]'>
                            <input value={item.slug} onChange={e => handleChange(e, key)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>

                        <div key={key} className='w-[40%] relative'>
                            {item.isLoading && <Loader />}
                            <input value={item.name} readOnly type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <button onClick={() => handledelete(key)} type='button' className='w-[4%] bg-[#F9FAFB] border h-[40px] rounded-md flex justify-center items-center'><MdDeleteOutline /></button>
                        <a target={item.slug && item.slug.length > 0 ? '_blank' : ''} href={item.slug && item.slug.length ? `/problem/${item.slug}` : "#"} type='button' className='w-[4%] bg-[#F9FAFB] border h-[40px] rounded-md flex justify-center items-center'> <IoIosLink /></a>

                    </div>
                ))
            }
            <br />
            <div className="flex items-center w-full">
                <button onClick={add_new_row} type="button" className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#3498DA] w-[150px]">Add New Row</button>
                <Button
                    onClick={async () => {
                        await handleSubmit(problems.filter(item => item.isLoading === false && item.name && item.name.length > 0).map(item => ({ slug: item.slug ?? "", position: item.position })))
                    }}
                    className=" text-white hover:bg-green-600  font-medium rounded-lg text-sm px-5 py-2.5 bg-green-500 w-[150px] ml-[10px]"
                >
                    Save
                </Button>
            </div>

        </div >
    )
}

export default Problems