
import React from 'react'

const SideNav: React.FC = () => {
    const menues: { title: string, link: string }[] = [
        {
            title: "Dashboard",
            link: "/admin"
        },
        {
            title: "Manage Users",
            link: "/admin/users"
        },
        {
            title: "Create Problem",
            link: "/admin/createproblem"
        }
    ]
    return (
        <div className=' w-[250px] mt-[20px] ml-[20px] sidenav-height bg-white border border-gray-200 shadowp-[20px] py-[10px] rounded-lg'>
            <div className="flex flex-col items-center h-full">
                {
                    menues.map((item, key) => (
                        <a key={key} className='w-[80%]' href={item.link}>
                            <button className="mt-[20px] w-full py-[6px] flex justify-start hover:bg-[#cccccc71] pl-[6px] rounded-md" key={key}>
                                {item.title}
                            </button>
                        </a>
                    ))
                }
            </div>
        </div>
    )
}

export default SideNav