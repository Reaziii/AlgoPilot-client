"use client"
import { SubmittedStatus } from '@/enum';
import ClientSocket from '@/lib/ClientSocket';
import React, { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client';

const TestCases: React.FC<{ submission_id: string, _testcases: { status: number, color: string, text: string, tcid: string, time:number, memory:number }[] }> = ({ submission_id, _testcases }) => {
    let [testcases, setTestCases] = useState<{ status: number, color: string, text: string, tcid: string, memory:number, time:number }[]>([..._testcases]);
    let i = 0;
    let ioRef = useRef<Socket>();

    useEffect(() => {
        if (ioRef.current) return;
        ioRef.current = ClientSocket.connect();
        ioRef.current.emit("submissionstatus", submission_id)
        ioRef.current.on("submissionstatus", (data: string) => {
            let _data = JSON.parse(data) as { status: number, color: string, text: string, tcid: string, time:number, memory:number };
            let test = testcases;
            for (let i = 0; i < test.length; i++) {
                if (test[i].tcid === _data.tcid) {
                    test[i] = _data;
                    break;
                }
            }
            setTestCases([...test])
        })


    }, [])

    return (
        <div className='mt-[50px]'>
            {
                testcases.map((item, key) => (
                    <div key={key} className='w-full bg-white flex px-[20px] items-center justify-between h-[60px] mb-2 rounded-md border '>
                        <p className='w-[25%] flex justify-center'>{key}</p>
                        <p className='w-[25%] flex justify-center'>{(item.time/1000).toFixed(2)}s</p>
                        <p className='w-[25%] flex justify-center'>{(item.memory/1000).toFixed(2)}MB</p>
                        <p className='w-[25%] flex justify-center' style={{
                            color: SubmittedStatus.get(item.status).color
                        }}>{item.text}</p>
                    </div>
                ))
            }


        </div>
    )
}

export default TestCases