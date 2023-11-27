"use client"
import RichTextEditor from '@/components/RichTextEditor'
import React, { useState } from 'react'
const Description:React.FC<{description:string}> = ({description}) => {
    let [value, setValue] = useState(description);

    return (
        <> <input hidden readOnly value={value} name='description' onChange={() => { }} />
            <div className="h-[250px]"><RichTextEditor value={value} setValue={setValue} className={"h-[200px] ritch-text"} /></div>
        </>
    )
}

export default Description