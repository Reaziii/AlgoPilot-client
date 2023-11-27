"use client"
import RichTextEditor from '@/components/RichTextEditor';
import { LoadingContest } from '@/providers/Loading';
import client from '@/utils/client';
import React, { useState, createRef, useContext } from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";
const AddTestCase: React.FC<{ setValue: (value: boolean) => void, slug: string, addTextCase: (value: ITestcase) => void }> = ({ setValue, slug, addTextCase }) => {
    const [isSample, setIsSample] = useState<boolean>(false);
    const [explaination, setExplaination] = useState<string>("");
    const [input, setInput] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const ref = createRef<HTMLDivElement>();
    const ref2 = createRef<HTMLDivElement>();
    const { setLoading } = useContext(LoadingContest)
    const handleNewTestCase = () => {
        setLoading(true);
        client.post("/problem/testcases/" + slug, {
            isSample,
            explaination,
            input,
            output,
            slug
        }).then(res => {
            setLoading(false);
            if (res.data.status) {
                alert("Test Case Added");
                addTextCase({
                    input,
                    output,
                    slug,
                    explaination,
                    isSample,
                })
                setValue(false);
            }
            else {
                alert(res.data.message);
            }
        }).catch(err => setLoading(false))
    }
    return (
        <div ref={ref} className='fixed w-full h-[100vh] bg-[#00000070] top-0 left-0 flex items-center justify-center'>
            <div ref={ref2} className='w-[60%] min-h-[100px] bg-white p-[20px] rounded-md shadow-lg border-[1px] border-[#8e8e8e]'>
                <div className='flex justify-end mb-[10px]'>
                    <button onClick={() => setValue(false)}><IoMdCloseCircleOutline size={30} color={"#ccc"} /></button>
                </div>

                <div className="flex justify-between items-center">
                    <h1>Add Test Case</h1>
                    <div className='flex justify-center items-center'>
                        <button onClick={() => setIsSample(!isSample)} className={`w-[15px] h-[15px] ${isSample ? "bg-[#29b729]" : ""} border-[1px] border-[#ccc]`}>
                        </button>
                        <p className='ml-[10px]'>Is sample</p>

                    </div>
                </div>
                <p className='mt-[20px]'>Input</p>
                <textarea value={input} onChange={e => setInput(e.target.value)} className='mt-[10px] border-[1px] border-[#ccc] w-full outline-none p-[2px] font-code'></textarea>
                <p className='mt-[20px]'>Output</p>
                <textarea value={output} onChange={e => setOutput(e.target.value)} className='mt-[10px] border-[1px] border-[#ccc] w-full outline-none p-[2px] font-code'></textarea>

                {isSample === true && <>
                    <div className=' mt-[60px] flex justify-between items-center'>
                        <p className='font-bold'>Input Format</p>
                        <button className='bg-[#f0f0f0] px-[10px] py-[6px] border-[#ccc] border-[1px]'>Preview</button>
                    </div>
                    <div className='h-[200px]'>
                        <RichTextEditor value={explaination} setValue={setExplaination} className='h-[130px] mt-[10px]' />
                    </div>
                </>}
                <div className='w-full flex justify-center mt-[20px]'>
                    <button onClick={handleNewTestCase} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2">Save</button>
                </div>
            </div>

        </div>
    )
}

export default AddTestCase