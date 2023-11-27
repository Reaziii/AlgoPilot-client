"use client"

import { deleteCookie } from "@/utils/cookie";

const LogoutButton = () => {
    const handleLogout = () => {
        "use client"
        localStorage.removeItem("token");
        deleteCookie("token");
        window.location.href = "/login"
    }
    return <button onClick={handleLogout}>Logout</button>
}

export default LogoutButton;