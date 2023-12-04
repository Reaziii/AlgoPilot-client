import React from 'react'

import useToken from '@/utils/useToken'
import LogoutButton from './LogoutButton';
const Header = async () => {
  const user = await useToken();
  const menus = [
    {
      name: "Home",
      link: "/"
    },
    {
      name: "Contests",
      "link": "/contests"
    },
    {
      name: "My Contest",
      "link": "/mycontests"
    },
    {
      name : "My problems",
      link : "/myproblems"
    }
  ]
  return (
    <header className='z-1 w-[100%] bg-white border border-gray-200 shadowp-lg h-[60px] flex justify-between items-center px-[40px] top-0 left-0'>
      <div className='flex items-center'>
        <h1 className='font-bold text-[24px] font-code'>Algo.Pilot</h1>
        <div className='flex ml-[20px]'>
          {
            menus.map((item, key) => (
              <a className='mx-[20px] text-[black] text-[14px] font-mono' key={key} href={item.link}>{item.name}</a>
            ))
          }
        </div>
      </div>
      {
        user.isLoogedIn ?
          <div className='text-black flex'>
            <p className='text-black mr-[10px]'>{user.name}</p>
            <span className='mr-[10px]'>|</span>
            <LogoutButton />
          </div>

          : <a className='' href={"/login"}>Login</a>
      }
    </header>
  )
}



export default Header