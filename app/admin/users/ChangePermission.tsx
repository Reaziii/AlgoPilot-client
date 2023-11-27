"use client"
import React, { useState } from 'react'
const ChangePermission: React.FC<{ admin: boolean, contest: boolean, problem: boolean, email: string, updatePermissions: (value: string, email: string) => Promise<boolean> }> = ({ admin, contest, problem, email, updatePermissions }) => {
    const [permissions, setPermissions] = useState({
        admin,
        create_contest: contest,
        create_problem: problem
    });

    const handleSubmit = (item: number) => {
        updatePermissions(item === 1 ? "admin" : item === 2 ? "contest" : "problem", email).then(result => {
            if (result) {
                if (item === 1) setPermissions({ ...permissions, admin: !permissions.admin })
                if (item === 2) setPermissions({ ...permissions, create_contest: !permissions.create_contest })
                if (item === 3) setPermissions({ ...permissions, create_problem: !permissions.create_problem })
            }
        })
    }

    return (
        <div className='flex'>
            <button onClick={() => handleSubmit(1)}><p className={`${permissions.admin ? "text-green-600" : "text-red-600"}`}>Admin</p></button>
            <p>&nbsp;|&nbsp;</p>
            <button onClick={() => handleSubmit(2)}><p className={`${permissions.create_contest ? "text-green-600" : "text-red-600"}`}>Create Contest</p></button>
            <p>&nbsp;|&nbsp;</p>
            <button onClick={() => handleSubmit(3)}><p className={`${permissions.create_problem ? "text-green-600" : "text-red-600"}`}>Create Problem</p></button>
        </div>
    )
}

export default ChangePermission