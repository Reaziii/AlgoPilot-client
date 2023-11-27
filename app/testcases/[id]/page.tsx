"use client"
import React, { useContext, useEffect, useState } from 'react'
import AddTestCase from './AddTestCase';
import { IoMdDownload } from "react-icons/io";
import client from '@/utils/client';
import { MdOutlineDelete } from "react-icons/md";
import { LoadingContest } from '@/providers/Loading';

const TextCase: React.FC<{ params: { id: string } }> = ({ params }) => {
    const id = params.id;
    const [problemname, setProblemname] = useState("")
    const [openAddTestCase, setOpenAddTestcase] = useState(false);
    const [testCases, setTestCases] = useState<ITestcase[]>([]);
    const { setLoading } = useContext(LoadingContest)
    const getAllTestcases = () => {
        setLoading(true);
        client.get("/problem/testcases/" + id).then(res => {
            setLoading(false);
            if (res.data.status) {
                setTestCases([...res.data.test_cases as ITestcase[]])
                setProblemname(res.data.name)
            }
            else {
                alert(res.data.message)
                window.location.href = "/"
            }
        })
    }

    useEffect(() => {
        getAllTestcases();
    }, [])
    return (
        <>
            {openAddTestCase === true && <AddTestCase addTextCase={(value: ITestcase) => setTestCases([...testCases, { ...value }])} slug={id} setValue={setOpenAddTestcase} />}
            <div className='p-[40px]'>
                <div className='mt-[20px] flex justify-between items-center'>
                    <h1 className='font-bold text-[30px]'>{problemname}</h1>
                    <button onClick={() => setOpenAddTestcase(true)} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-md h-[50px] text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add New Testcase</button>
                </div>
                <div className='mt-[10px] text-[#8c8c8c] underline'>
                    <a href={"/customchecker/" + params.id}>Add Custom checker</a>
                </div>
                <div className='w-full border mt-[60px] rounded-lg bg-white'>
                    <div className='flex justify-between'>
                        <div className='w-[20%] h-[40px] flex items-center justify-center'>
                            Order
                        </div>
                        <div className='w-[20%] h-[40px] flex items-center justify-center'>
                            Input
                        </div>
                        <div className='w-[20%] h-[40px] flex items-center justify-center'>
                            Output
                        </div>
                        <div className='w-[20%] h-[40px] flex items-center justify-center'>
                            Is sample
                        </div>
                        <div className='w-[20%] h-[40px] flex items-center justify-center'>
                            Action
                        </div>
                    </div>
                    <div className='h-[1px] w-full bg-gray-300'></div>
                    {
                        testCases.map((item, key) => (
                            <div key={key} className='flex justify-between my-[5px]'>
                                <div className='w-[20%] h-[40px] flex items-center justify-center'>
                                    {key}
                                </div>
                                <div className='w-[20%] h-[40px] flex items-center justify-center'>
                                    <button onClick={() => {
                                        navigator.clipboard.writeText(item.input).then(() => alert("copied"))
                                    }} className='bg-[#cccccc82] px-[14px] py-[4px] border-[#c5c5c5] border-[1px]'>Copy</button>
                                </div>
                                <div className='w-[20%] h-[40px] flex items-center justify-center'>
                                    <button onClick={() => {
                                        navigator.clipboard.writeText(item.output).then(() => alert("copied"))
                                    }} className='bg-[#cccccc82] px-[14px] py-[4px] border-[#c5c5c5] border-[1px]'>Copy</button>
                                </div>
                                <div className='w-[20%] h-[40px] flex items-center justify-center'>
                                    <button style={{
                                        backgroundColor: item.isSample ? "#33d733" : "white"
                                    }} className='w-[15px] h-[15px] border-[1px] border-[#ccc]'>
                                    </button>
                                </div>
                                <div className='w-[20%] h-[40px] flex items-center justify-center'>
                                    <button title='download input output' className='ml-[4px]'>
                                        <IoMdDownload color="#58c0ff" size={24} />
                                    </button>
                                    <button className=''>
                                        <MdOutlineDelete color="red" size={24} />
                                    </button>

                                </div>


                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default TextCase


