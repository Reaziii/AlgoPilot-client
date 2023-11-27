"use client"
import { create_downloadable_link } from '@/utils/utils'
import React from 'react'

const Download: React.FC<{ text: string, data: string, filetype: string }> = ({ text, data, filetype }) => {
    return (
        <button onClick={()=>create_downloadable_link(data, "cpp",text+".cpp")} className={"text-blue-500"}>{text}</button>
    )
}

export default Download