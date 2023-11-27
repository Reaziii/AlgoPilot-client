"use client"
import { LoadingContest } from '@/providers/Loading'
import React, { useContext } from 'react'

const Button: React.FC<{ className: string, onClick: () => Promise<void>, children: React.ReactNode, }> = ({ className, children, onClick, }) => {
    let { setLoading } = useContext(LoadingContest)
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setLoading(true)
        await onClick();
        setLoading(false)
    }
    return (
        <button className={className} onClick={handleClick}>{children}</button>
    )
}

export default Button