import React from 'react'
import PrivateRoute from '../PrivateRoute'
const Layout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
    return (
        <PrivateRoute><>{children}</></PrivateRoute>
    )
}

export default Layout