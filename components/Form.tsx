"use client"
import { LoadingContest } from '@/providers/Loading'
import React, { useContext } from 'react'

const Form: React.FC<{ children: React.ReactNode, action: (formdata: FormData) => Promise<void>, className: string }> = ({ children, action, className }) => {
  const {  setLoading } = useContext(LoadingContest)
  const Action = async (formdata: FormData) => {
    setLoading(true);
    await action(formdata)
    setLoading(false);
  }
  return (
    <form action={Action} className={className}>
      {children}
    </form>
  )
}

export default Form