"use client"
import { addDateAndTime } from '@/utils/utils';
import React, { createRef, useEffect, useRef, useState } from 'react'

const RunningTimer: React.FC<{ className: string, date: string, time: string, length: string }> = ({ className, date, time, length }) => {
    let final = new Date(addDateAndTime(date, time).getTime() + parseInt(length) * 60 * 1000);
    let timeRef = useRef<NodeJS.Timeout>();
    let divs = [createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>(), createRef<HTMLDivElement>()]
    let [finished, setFinished] = useState<boolean>(false);
    useEffect(() => {
        if (timeRef.current) clearInterval(timeRef.current)
        timeRef.current = setInterval(() => {
            let dist = final.getTime() - new Date(Date.now()).getTime();
            if (dist <= 0) dist = 0;
            dist /= 1000;
            if (divs[0].current) {
                let a = String((dist / 86400) | 0);
                if (a.length === 1) a = "0" + a;
                divs[0].current.innerText = a;
            }

            dist %= 86400

            if (divs[1].current) {
                let a = String((dist / 3600) | 0);
                if (a.length === 1) a = "0" + a;
                divs[1].current.innerText = a;
            }
            dist %= 3600

            if (divs[2].current) {
                let a = String((dist / 60) | 0);
                if (a.length === 1) a = "0" + a;
                divs[2].current.innerText = a;
            }
            dist %= 60

            if (divs[3].current) {
                let a = String((dist) | 0);
                if (a.length === 1) a = "0" + a;
                divs[3].current.innerText = a;
            }
            if (dist === 0) {
                clearInterval(timeRef.current);
                setFinished(() => true);
            }

        }, 1000)
    }, [date, time])
    return (
        <div className={className}>
            {
                finished ?
                    <div className='text-[30px] font-mono font-bold text-gray-800'>Finished</div>
                    :
                    <div className='flex item-center gap-4 w-full justify-center text-[30px] font-code'>
                        <div ref={divs[1]} className='text-black'>00</div>
                        <p>:</p>
                        <div ref={divs[2]} className='text-black'>00</div>
                        <p>:</p>
                        <div ref={divs[3]} className='text-black'>00</div>
                    </div>
            }
        </div>
    )
}

export default RunningTimer