"use client"
import ClientSocket from '@/lib/ClientSocket'
import React, { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'

const Status: React.FC<{ token: string }> = ({ token }) => {
    let io = useRef<Socket>();
    useEffect(() => {
        if(io.current) return ;
        io.current = ClientSocket.connect();
        io.current.emit("judgestatus", token)
        io.current.on("judgestatus", (msg: "online" | "ofline") => {
            console.log("[status]", msg)
            if (msg === "online") setStatus(true);
            else setStatus(false);
        })

    }, [])

    const [status, setStatus] = useState(false);
    return (
        <div style={{
            background: status ? "#21C55D" : "#EF4444"
        }} className="h-[10px] w-[10px] rounded-full"></div>
    )
}

export default Status