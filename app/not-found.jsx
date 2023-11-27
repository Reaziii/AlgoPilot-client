import Link from 'next/link'
import React from 'react'
const NotFound = () => {
  return (
    <div className='w-full h-[90vh] flex justify-center items-center'><div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for does not exist.</p>
      <Link href="/">
        <p className='underline'>Go back to the home page</p>
      </Link>
    </div></div>
  )
}

export default NotFound