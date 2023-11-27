"use client"
import React from 'react'
import { FaRegCopy } from "react-icons/fa";
const CopyButton: React.FC<{ item: string }> = ({ item }) => {
    return (
        <button onClick={() => navigator.clipboard.writeText(item)}><FaRegCopy /></button>
    )
}

export default CopyButton