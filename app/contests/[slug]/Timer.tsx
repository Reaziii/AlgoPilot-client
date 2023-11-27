"use client"
import { addDateAndTime } from '@/utils/utils'
import React, { createRef, useEffect, useRef } from 'react'

const Timer: React.FC<{ currentDate: string, currentTime: string, name: string }> = ({ currentDate, currentTime, name }) => {
    let final = addDateAndTime(currentDate, currentTime);
    let timeRef = useRef<NodeJS.Timeout>();
    let divs = [createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>()]

    useEffect(() => {
        if (timeRef.current) clearInterval(timeRef.current)
        timeRef.current = setInterval(() => {
            let dist = final.getTime() - new Date(Date.now()).getTime();
            if (dist <= 0) dist = 0;
            dist /= 1000;

            if (divs[0].current)
                divs[0].current.innerText = String((dist / 86400) | 0);
            dist %= 86400

            if (divs[1].current)
                divs[1].current.innerText = String((dist / 3600) | 0);
            dist %= 3600

            if (divs[2].current)
                divs[2].current.innerText = String((dist / 60) | 0);
            dist %= 60

            if (divs[3].current)
                divs[3].current.innerText = String(dist | 0);
            if (dist === 0) {
                clearInterval(timeRef.current)
                window.location.reload();
            }

        }, 1000)
    }, [currentDate, currentTime])

    return (
        <div className="flex justify-center items-center h-[60vh] flex-col font-bold text-[30px] text-gray-500">
            <h1>{name}</h1>
            <div className='flex item-center gap-10 w-full justify-center text-[26px] mt-[20px]'>
                <div className='flex flex-col items-center justify-center'>
                    <div ref={divs[0]} className='text-black'>0</div>
                    <div className='text-black'>Days</div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div ref={divs[1]} className='text-black'>0</div>
                    <div className='text-black'>Hours</div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div ref={divs[2]} className='text-black'>0</div>
                    <div className='text-black'>Minutes</div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div ref={divs[3]} className='text-black'>0</div>
                    <div className='text-black'>Seconds</div>
                </div>
            </div>
        </div>

    )
}

export default Timer