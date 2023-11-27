import React from 'react'
import 'react-quill/dist/quill.snow.css';
const ContestNotes: React.FC<{ description: string }> = ({ description }) => {
    return (
        <div className='w-full bg-white border rounded-lg p-[20px] mb-[100px]' >
            <h1 className='font-bold mb-[20px]'>Notes</h1>
            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
    )
}

export default ContestNotes