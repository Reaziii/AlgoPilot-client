"use client"
import React, { ChangeEvent } from "react"
const ChangeLimit: React.FC<{ handlePerPage?: (value: number) => void, limit:number }> = ({ handlePerPage, limit }) => {
    const handle = (e: ChangeEvent<HTMLSelectElement>) => {
        if (handlePerPage)
            handlePerPage(parseInt(e.target.value))
    }
    return <form>
        <select value={limit} onChange={handle} className="ml-[10px] border px-2 py-2 rounded-md outline-none bg-[#F9FAFB]">
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={75}>75</option>
            <option value={100}>100</option>
        </select>
    </form>
}

export default ChangeLimit