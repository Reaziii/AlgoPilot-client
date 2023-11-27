"use client"
import React from 'react'

const CopyButton: React.FC<{ children: React.ReactNode, token: string }> = ({ children, token }) => {
    return (
        <button onClick={() => {
            navigator.clipboard.writeText(token).then(()=>{alert("copied")}).catch(()=>alert("failed to copy"))
        }}>{children}</button>
    )
}

export default CopyButton