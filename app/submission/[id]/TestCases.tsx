"use client"
import { SubmittedStatus } from '@/enum';
import React, { useEffect, useRef, useState } from 'react'

const TestCases: React.FC<{ submission_id: string }> = ({ submission_id }) => {
    let [testcases, setTestCases] = useState<SubmissionStatus[]>([]);
    let timeRef = useRef<NodeJS.Timeout>();
    let i = 0;

    useEffect(() => {
        if (timeRef.current) clearInterval(timeRef.current);
        timeRef.current = setInterval(() => {
            let testcasesss = testcases;
            if (i % 3 == 0) {
                testcasesss.push(SubmittedStatus.Pending);
            }
            else if (i % 3 == 1) {
                testcasesss[testcasesss.length - 1] = (SubmittedStatus.Running);
            }
            else if (i % 3 === 2) testcasesss[testcasesss.length - 1] = (SubmittedStatus.AC);
            setTestCases([...testcasesss])
            ++i;
            if (i === 42) clearInterval(timeRef.current)
        }, 1000)


    }, [submission_id])


    return (
        <div className='mt-[50px]'>
            {
                testcases.map((item, key) => (
                    <div key={key} className='w-full bg-white flex px-[20px] items-center justify-between h-[60px] mb-2 rounded-md border '>
                        <p className='w-[25%] flex justify-center'>{key}</p>
                        <p className='w-[25%] flex justify-center'>0.00s</p>
                        <p className='w-[25%] flex justify-center'>0.00MB</p>
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