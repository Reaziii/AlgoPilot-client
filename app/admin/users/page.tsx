"use client"
import React, { FormEvent, useContext, useEffect, useState } from 'react'
import SideNav from '../SideNav'
import ChangePermission from './ChangePermission'
import { MdDeleteOutline } from "react-icons/md";
import ChangeLimit from './ChangeLimit'
import client from '@/utils/client'
import { LoadingContest } from '@/providers/Loading'
import { useRouter } from 'next/navigation';

type Props = {
    params: {},
    searchParams: { [key: string]: string | undefined }
}

const Users = (props: Props) => {
    let _email = props.searchParams.email || "";
    let _start = parseInt(props.searchParams.start || "0");
    let _limit = parseInt(props.searchParams.limit || "50");
    const [pageDetails, setPageDetails] = useState({
        limit: _limit,
        email: _email,
        start: _start,
    })
    const { setLoading } = useContext(LoadingContest)
    const [users, setUsers] = useState<IUser[]>([]);
    const router = useRouter();
    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        let formdata: FormData = new FormData(e.target as HTMLFormElement)
        let __email = (formdata.get("email") as string).replaceAll(" ", '')
        setPageDetails({
            ...pageDetails,
            email: __email
        })
    }

    const updatePermissions = async (value: string, email: string): Promise<boolean> => {
        setLoading(true);
        let ret = await client.put("/user/updatepermission", {
            item: value, email
        })
        setLoading(false);
        return ret.data;
    }
    const deleteUser = async (formdata: FormData) => {
        let email = formdata.get("email") as string;
        await client.delete("/user/" + email);
        window.location.href = (`/admin/users?email=${_email}&_start=${_start}&limit=${_limit}`)
    }
    const handlePerPageSubmit = (_limit: number) => {
        setPageDetails({ ...pageDetails, limit: _limit })
    }

    const fetchDetails = () => {
        setLoading(true);
        client.post("/user/getallusers", {
            ...pageDetails
        }).then(res => {
            setLoading(false);
            setUsers([...res.data.users])
        }).catch(err => {
            setLoading(false);
        })
    }

    useEffect(() => {
        fetchDetails();
    }, [pageDetails])

    return (
        <div className='flex'>
            <SideNav />
            <div className='bg-white h-[100vh] w-full m-[20px] border border-gray-200 shadowp-[20px] rounded-lg p-[20px]'>
                <div className='flex w-full items-center'>
                    <h1 className='font-bold mr-[40px]'>Users:</h1>
                    <form onSubmit={handleSearch} className='w-[350px]'>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input defaultValue={_email} name='email' type="text" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none h-[40px] placeholder:font-thin placeholder:text-[14px]" placeholder="Search users... ex: (reazahammed.iii@gmail.com)." />
                        </div>
                    </form>
                    <ChangeLimit handlePerPage={handlePerPageSubmit} limit={pageDetails.limit} />
                </div>
                <br />


                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Full Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Permissions
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((item, key) => (
                                    <tr key={key} className="bg-white border-b  ">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            {item.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <ChangePermission updatePermissions={updatePermissions} admin={item.permission.admin} contest={item.permission.create_contest} problem={item.permission.create_problem} email={item.email} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <form action={deleteUser}>
                                                <input value={item.email} name={"email"} hidden readOnly />
                                                <button type={"submit"} className='border border-red-100 p-2 rounded-md'><MdDeleteOutline size="16" color="red" /></button>
                                            </form>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="w-full flex justify-center mt-[40px]">
                    <nav aria-label="Page navigation example">
                        <ul className="inline-flex -space-x-px text-sm">
                            <li>
                                <a onClick={() => {
                                    setPageDetails({ ...pageDetails, start: Math.max(0, pageDetails.start - 1) })
                                }} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700     ">Previous</a>
                            </li>
                            <li>
                                <a onClick={() => {
                                    setPageDetails({ ...pageDetails, start: Math.max(0, pageDetails.start + 1) })
                                }} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700     ">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>


        </div>
    )
}

export default Users

