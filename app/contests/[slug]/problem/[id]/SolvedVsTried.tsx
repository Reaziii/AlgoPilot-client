import React from 'react'

const SolvedVsTried: React.FC = () => {
    return (
        <div className='flex justify-between bg-white border border-gray-200 rounded-lg shadowp-[20px] p-[20px] h-[140px]'>
            <div className='flex flex-col justify-center items-center w-[50%]'>
                <h1 className='font-bold'>Solved</h1>
                <p>100</p>
            </div>
            <div className='flex flex-col justify-center items-center w-[50%]'>
                <h1 className='font-bold'>Tried</h1>
                <p>100</p>
            </div>
        </div>
    )
}

export default SolvedVsTried