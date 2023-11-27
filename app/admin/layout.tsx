import useToken from '@/utils/useToken'
import { redirect } from 'next/navigation';
import React from 'react'

const AdminLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
    const token = await useToken();
    if (!token.isLoogedIn || !token.permissions.admin) {
        redirect("/login")
    }
    return (
        <>{children}</>
    )
}

export default AdminLayout