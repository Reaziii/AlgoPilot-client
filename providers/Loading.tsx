"use client"
import React, { createRef, useState } from 'react'
import { createContext } from 'react'
import Loader from '@/components/Loader';
type contextValue = {
    setLoading: (value: boolean) => void;
}
export const LoadingContest = createContext<contextValue>({ setLoading: (value: boolean) => { } });
const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const ref = createRef<HTMLDivElement>();
    const setLoadingVai = (value: boolean) => {
        if (value === true && ref.current) {
            ref.current.style.display = "unset"
        }
        if (value === false && ref.current) {
            ref.current.style.display = "none"
        }
    }
    return (
        <LoadingContest.Provider value={{ setLoading: setLoadingVai }}>
            {children}
            <div ref={ref} style={{ display: "none", background: "#ffffff99" }} className='h-[100vh] w-full top-0 left-0 bg-[white] fixed z-40'><Loader /></div>
        </LoadingContest.Provider>
    )
}

export default LoadingProvider