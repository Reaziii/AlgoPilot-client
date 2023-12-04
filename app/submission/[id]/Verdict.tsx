"use client"
import React, { useEffect, useRef, useState } from 'react'
import ClientSocket from '@/lib/ClientSocket';
import { Socket } from 'socket.io-client';
import { SubmittedStatus } from '@/enum';
const Verdict: React.FC<{ submission_id: string, _status: { status: number, color: string, text: string } }> = ({ submission_id, _status }) => {
  const ioRef = useRef<Socket>();
  const [status, setStatus] = useState<{ status: number, color: string, text: string }>({ ..._status });
  useEffect(() => {
    if (ioRef.current) return;
    ioRef.current = ClientSocket.connect();
    ioRef.current.emit("submissionstatus", submission_id)
    ioRef.current.on("finalstatus", (data: string) => {
      window.location.reload()
      let _data = JSON.parse(data) as { status: number, color: string, text: string };
      setStatus({ ..._data })
    })
  }, [])
  return (
    <div className='w-[25%] flex justify-center' style={{
      color: SubmittedStatus.get(status.status).color
    }}>{status.text}
    </div>
  )
}

export default Verdict