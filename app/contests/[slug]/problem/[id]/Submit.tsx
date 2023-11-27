"use client"
import React, { ChangeEvent, useContext, useState } from 'react'
import { IoClose } from "react-icons/io5";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import 'ace-builds/src-noconflict/mode-c_cpp';
import { LoadingContest } from '@/providers/Loading';

let colors: { [key: string]: string } = {
    "Time Limit Exceed": "#FF8C00",
    "Memory Limit Exceed": "#9370DB",
    "Runtime Error": "#F08080",
    "Compilation Error": "#ADD8E6",
    "Accepted": "#3CB371",
    "Wrong Answer": "#FFC0CB",
    "Pending": "#D3D3D3"
}

const Submit: React.FC<{ slug: string, name: string, submitCode: (formdata: FormData) => Promise<void> }> = ({ slug, name, submitCode }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [code, setCode] = useState<string>("");
    const {setLoading} = useContext(LoadingContest)
    const handleFileUpload = (file: ChangeEvent) => {
        const input = file.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const reader = new FileReader();
            const file: File = input.files[0];
            reader.onload = (e) => {
                const _code = e.target?.result as string;
                setCode(_code ?? "");
                setOpen(true);
            }
            reader.readAsText(file);
        }
    }
    let submit = async () => {
        let formdata: FormData = new FormData();
        formdata.append("code", code);
        formdata.append("language", "cpp")
        // setLoading(true);
        await submitCode(formdata)
        // setLoading(false);
    }
    return (
        <div className=" bg-white border border-gray-200 rounded-lg shadowp-[20px] p-[20px] h-[200px]">
            <input onChange={e => handleFileUpload(e)} accept=".c, .cpp, .py, .java" type='file' className='mb-[10px] border w-full p-[5px] border-[#b3b3b3] rounded-md' />
            <p className='text-[#787878] text-[14px]'>Up to 150KB</p>
            <button onClick={() => setOpen(true)} type="button" className="focus:outline-none w-full text-white bg-[#3498DB] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 font-mono mt-[40px]">Open Code Editor</button>
            {
                open && <div className='fixed w-full h-[100vh] bg-[#0000006e]  top-0 left-0 flex items-center justify-center'>
                    <div className="bg-white w-[90%] h-[90%] p-[20px] rounded-md shadowp-lg">
                        <div className='w-full flex justify-between'>
                            <h1 className='font-bold text-[20px]'>{name}</h1>
                            <button onClick={() => setOpen(false)}><IoClose size={30} /></button>
                        </div>
                        <div className='flex justify-between h-full'>
                            <div className='w-[100%] h-full relative'>
                                <select className='h-[35px] w-[200px] border-[#ccc] border-[1px] mb-[10px] mt-[10px] outline-none'>
                                    <option>C or CPP</option>
                                    <option>Python</option>
                                </select>
                                <div className='w-full h-full flex justify-between'>
                                    <AceEditor
                                        mode={"c_cpp"}
                                        width='100%'
                                        className='border-[1px] rounded-md'
                                        height='calc(100% - 140px)'
                                        onChange={e => setCode(e)}
                                        value={code}
                                    />
                                </div>
                                <button onClick={submit} type="button" className="mt-[10px] mb-[10px] focus:outline-none w-[100px] text-white bg-[#3498DB] font-medium rounded-lg text-sm px-5 py-2.5 font-mono absolute bottom-[20px]">Submit</button>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}

export default Submit