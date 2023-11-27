import { checkImAuthor, getContestSatus } from '@/requests/contests'
import { redirect } from 'next/navigation'
import React from 'react'

const Layout: React.FC<{ params: { slug: string, id: string }, children: React.ReactNode }> = async ({ params, children }) => {
  let status = await getContestSatus(params.slug)
  let check = await checkImAuthor(params.slug);
  if (status !== "running" && status !== "finished" && check.status !== true) return redirect("/")
  return (
    <>{children}</>
  )
}

export default Layout