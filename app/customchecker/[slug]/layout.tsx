import React from 'react'
import PrivateRoute from '@/app/PrivateRoute'
const Layout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
    return (
        <PrivateRoute><>{children}</></PrivateRoute>
    )
}

export default Layout