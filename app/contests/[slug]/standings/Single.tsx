import React from 'react'

const Single: React.FC<{ up: number|string, down: number, color: string }> = ({ up, down, color }) => {
    return (
        <div className='flex flex-col items-center justify-center h-[40px] text-white w-[60px] rounded-md overflow-hidden'>
            <div style={{ background: color }} className={`h-[50%] flex justify-center items-center w-full text-[12px]`}>{up}</div>
            <div className='h-[50%] flex justify-center items-center bg-[#3D3F39] w-full text-[12px]'>({down})</div>
        </div>
    )
}

export default Single