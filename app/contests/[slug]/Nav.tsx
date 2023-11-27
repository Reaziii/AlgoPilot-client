import React from 'react'
const ContestNav: React.FC<{ slug: string }> = ({ slug }) => {
    return (
        <div className="w-[100%] mt-[10px] h-[50px] bg-white mb-[10px] border shadowp-[20px] rounded-md flex items-center gap-5 pl-[20px]">
            <a className="text-blue-400 hover:text-blue-500" href={`/contests/${slug}/standings`}>
                Standings
            </a>
            <span className="text-gray-400">|</span>
            <a className="text-blue-400 hover:text-blue-500" href={`/contests/${slug}/standings`}>
                Clarifications
            </a>
            <span className="text-gray-400">|</span>
            <a className="text-blue-400 hover:text-blue-500" href={`/contests/${slug}/standings`}>
                My Submissions
            </a>
            <span className="text-gray-400">|</span>
            <a className="text-blue-400 hover:text-blue-500" href={`/contests/${slug}/notes`}>
                Notes
            </a>
        </div>
    )
}

export default ContestNav