import { checkImAuthor } from '@/requests/contests'
import { redirect } from 'next/navigation';
import React from 'react'

const Update: React.FC<{ params: { slug: string }, children: React.ReactNode }> = async ({ params, children }) => {
    let check = await checkImAuthor(params.slug);
    if (!check.status) redirect("/")
    return (
        <>{children}</>
    )
}

export default Update