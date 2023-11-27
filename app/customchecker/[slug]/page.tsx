"use client"
import React, { useContext, useEffect, useState } from 'react'

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import 'ace-builds/src-noconflict/mode-c_cpp';

import client from '@/utils/client';
import { LoadingContest } from '@/providers/Loading';

const CustomChecker: React.FC<{ params: { slug: string } }> = ({ params }) => {
    const [enable, setEnable] = useState(false);
    const [checker, setChecker] = useState("")
    const {setLoading} = useContext(LoadingContest);
    function onChange(newValue: string) {
        setChecker(newValue);
    }
    const get_the_old_checker_code = () => {
        setLoading(true);
        client.get("/problem/checkercode/" + params.slug).then(res => {
            setLoading(false);
            if (res.data.status) {
                setChecker(res.data.checker)
                setEnable(res.data.enable)
            }
        })
    }

    useEffect(() => {
        get_the_old_checker_code();
    }, [])
    const handleUpdate = () => {
        setLoading(true);
        client.post("/problem/checkercode/" + params.slug, {
            checker, enable
        }).then(res => {
            setLoading(false);
            if (!res.data.status) {
                alert(res.data.message)
            }
        })
    }



    return (
        <div>
            <div className='mt-[20px] flex justify-between items-center pt-[40px] pl-[40px]'>
                <h1 className='font-bold text-[30px]'>Problem Name</h1>
            </div>
            <div className='ml-[40px] mt-[40px] flex items-center'>
                <p className='text-[16px] mr-[10px]'>Enable Custom Checker</p>
                <button onClick={() => setEnable(!enable)} className={`w-[15px] h-[15px] ${enable ? "bg-[#29b729]" : ""} border-[1px] border-[#ccc]`}>
                </button>
            </div>
            <div className='mt-[10px] ml-[40px] text-[#8c8c8c] underline'>
                <a href={"/testcases/" + params.slug}>Add Testcases</a>
            </div>
            <div className='mt-[10px] text-[#8c8c8c] underline italic ml-[40px]'>
                <a href={"/problems/create/customchecker/" + params.slug}>See documentation for writing checker code.</a>
            </div>
            <div className='w-[calc(100% - 80px)] mt-[50px] mx-[40px] border-[#c0c0c0] border-[1px] box-border'>
                <div className='flex justify-end'>
                    <select className='border-[1px] border-[#bbb] m-[10px] px-[10px] py-[6px]'>
                        <option>C++</option>
                        <option>C</option>
                        <option>Python</option>
                    </select>
                </div>
                <AceEditor
                    mode="c_cpp"
                    theme="monokai"
                    onChange={onChange}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                    height='100vh'
                    width='100%'
                    value={checker}
                />
            </div>

            <div className='p-[40px] flex justify-end'>
                <button onClick={handleUpdate} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save Checker</button>
            </div>
        </div>
    )
}

export default CustomChecker 