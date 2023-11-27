import useToken from '@/utils/useToken'
import { redirect } from 'next/navigation';
import React from 'react'

const PrivateRoute: React.FC<{ children: React.ReactNode, permissions?: "admin" | "create_contest" | "create_problem" }> = async ({ children, permissions }) => {
    let token = await useToken();
    if (!token.isLoogedIn) return redirect("/login")
    if (permissions && !token.permissions.admin) {
        if (permissions === "admin" && !token.permissions.admin) return redirect("/")
        if (permissions === "create_contest" && !token.permissions.create_contest) return redirect("/")
        if (permissions === "create_problem" && !token.permissions.create_problem) return redirect("/")
    }
    return (
        <>{children}</>
    )
}

export default PrivateRoute