import PrivateRoute from '@/app/PrivateRoute';
import { hasContestPermission } from '@/lib/user';
import { redirect } from 'next/navigation';
import React from 'react'

const Layout: React.FC<{ children: React.ReactNode, params: { slug: string } }> = async ({ children, params }) => {
    if (!(await hasContestPermission(params.slug))) return redirect("/")
    return (
        <PrivateRoute>{children}</PrivateRoute>
    )
}

export default Layout