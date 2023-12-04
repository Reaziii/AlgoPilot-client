"use client"
import React, { useState } from 'react'
import RichTextEditor from '@/components/RichTextEditor'
import PreviewRichText from '@/components/PreviewRichText'
import client from '@/utils/client'
const CreateProblem = () => {
    const [statement, setStatement] = useState("");
    const [inputFormat, setInputFormat] = useState("");
    const [previewText, setPreviewText] = useState("");
    const [outputformat, setoutputformat] = useState("");
    const [name, setName] = useState("")
    const [timelimit, setTimelimit] = useState<string>("");
    const [memorylimit, setMemorylimit] = useState<string>("");
    const handleCreateProblem = () => {
        client.post("/problem/create", {
            statement,
            inputformat: inputFormat,
            outputformat,
            name,
            timelimit,
            memorylimit
        }).then(res => {
            if (res.data.status) {
                window.location.href = "/testcases/" + res.data.problem.slug
            }
            else {
                alert(res.data.message)
            }
        })
    }

    return (
        <div className='p-[40px]'>
            {previewText.length !== 0 && <PreviewRichText text={previewText} setValue={(v) => setPreviewText(v)} />}
            <div className="bg-white p-[40px] border rounded-lg">
                <h1 className='font-bold text-[30px]'>Create Problem</h1>
                <div className='mt-[6px]'>
                    <a className='text-[#aeaeae] italic text-[16px] tracking-[1px] underline' href={"/"}>See documentation before creating problem</a>
                </div>
                <div>
                    <div className=' mt-[40px] flex justify-between items-center'>
                        <p className='font-bold'>Problem Name</p>

                    </div>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="mt-[10px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 " placeholder="Problem Name" required></input>
                    <div className=' mt-[40px] flex justify-between items-center'>
                        <p className='font-bold'>Problem Statement</p>
                        <button className='bg-blue-400 text-white px-[10px] py-[6px] rounded-md' onClick={() => setPreviewText(statement)}>Preview</button>
                    </div>
                    <div className='h-[200px]'>
                        <RichTextEditor value={statement} setValue={setStatement} className='h-[150px] mt-[10px]' />
                    </div>
                    <div className=' mt-[60px] flex justify-between items-center'>
                        <p className='font-bold'>Input Format</p>
                        <button className='bg-blue-400 text-white px-[10px] py-[6px] rounded-md' onClick={() => setPreviewText(inputFormat)}>Preview</button>
                    </div>
                    <div className='h-[200px]'>
                        <RichTextEditor value={inputFormat} setValue={setInputFormat} className='h-[150px] mt-[10px]' />
                    </div>

                    <div className=' mt-[60px] flex justify-between items-center'>
                        <p className='font-bold'>Output Format</p>
                        <button className='bg-blue-400 text-white px-[10px] py-[6px] rounded-md' onClick={() => setPreviewText(outputformat)}>Preview</button>
                    </div>
                    <div className='h-[200px]'>
                        <RichTextEditor value={outputformat} setValue={setoutputformat} className='h-[150px] mt-[10px]' />
                    </div>

                    <div className='flex items-start justify-between'>
                        <div className='mt-[60px] w-[48%]'>
                            <p className='font-bold'>Time limit in second</p>
                            <input value={timelimit} onChange={(e) => setTimelimit(e.target.value)} type="number" className="mt-[10px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 " placeholder="Time limit in second" required></input>
                        </div>
                        <div className='mt-[60px] w-[48%]'>
                            <p className='font-bold'>Memory limit in Kilobytes</p>
                            <input value={memorylimit} onChange={(e) => setMemorylimit(e.target.value)} type="number" className="mt-[10px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 " placeholder="Memory limit in kilobytes" required></input>
                        </div>
                    </div>

                </div>
                <button onClick={handleCreateProblem} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-[60px]">Next</button>
            </div>
        </div>
    )
}

export default CreateProblem