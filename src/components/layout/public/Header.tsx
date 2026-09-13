import Link from 'next/link'
import React from 'react'

const Header = () => {
    const routes =[
        {name: "Home", path: "/"},
        {name: "About Us", path: "/about-us"},
        {name: "Contact Us", path: "/contact-us"},
        {name: "Login", path: "/login"},
        {name: "Register", path: "/register"},
    ]
  return (
    <header className='w-full h-16 bg-white flex items-center justify-between px-4 shadow-md'>
      <nav className='flex items-center gap-4'>
        {
        routes.map((route) => (
            <Link key={route.path} href={route.path} className='text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'>{route.name}</Link>
        ))
      }
      </nav>
    </header>
  )
}

export default Header