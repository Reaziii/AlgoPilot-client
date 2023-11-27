import React, { MutableRefObject, createRef, useEffect, useRef } from 'react'
import { IoIosClose } from "react-icons/io";

const PreviewRichText: React.FC<{ text: string, setValue: (value: string) => void }> = ({ text, setValue }) => {

    return (
        <div className='z-[100] fixed bg-[#00000075] w-full h-[100vh] top-0 left-0 flex justify-center flex-col items-center'>
            <div className="w-[80%] h-[80vh] overflow-hidden block bg-white border border-gray-200 rounded-lg shadow">
                <div className="flex justify-end"><button onClick={() => setValue("")}><IoIosClose size={30} /></button></div>
                <div className='ql-editor' dangerouslySetInnerHTML={{ __html: text }} />
            </div>
        </div>
    )
}

export default PreviewRichText