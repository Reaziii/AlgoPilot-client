"use client"
import React, { memo } from 'react'

const ExtraDetails: React.FC<{timelimit:string, memorylimit:string}> = ({timelimit, memorylimit }) => {
    return (
        <div className=" bg-white border border-gray-200 rounded-lg shadowp-[20px] p-[20px] mb-[20px] h-[150px] flex flex-col items-center justify-center font-mono">
            <p>Time limit - {timelimit}</p>
            <p>Memory limit - {memorylimit}</p>
            <p>Input: - Standard input</p>
            <p>Output: - Standard output</p>
        </div>
    )
}

export default ExtraDetails