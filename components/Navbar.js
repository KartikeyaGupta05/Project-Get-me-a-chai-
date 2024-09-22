"use client"
import React, {useState} from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
  const { data: session } = useSession()
  const [showdropDown, setshowdropDown] = useState(false)
  // if(session) {
  //   return <>
  //     Signed in as {session.user.email} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }

  return (
    <div className='relative'>
      <nav className='bg-gray-900 text-white flex justify-between items-center h-28 pb-5 md:pb-0 px-5 flex-col md:flex-row md:h-14'>
        <div className="logo font-bold text-xl mb-3 md:mb-0">
          <Link href={'/'}>Get me a Chai! </Link>
          </div>
        <ul className='flex gap-4 items-center'>
          {/* <Link href={"/"}><li>Home</li></Link>
          <li>About</li>
          <li>Funds</li> */}
          {session && <> <button onClick={()=>{setshowdropDown(!showdropDown)}} onBlur={()=>{setTimeout(() => {
            setshowdropDown(false)
          }, 200); }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user.email}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
          </button>

            
            <div id="dropdown" className={`z-10 ${showdropDown?"":"hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute left-[1100px] top-[55px] dark:bg-gray-700`}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                </li>
                {/* <li>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Funds</Link>
                </li> */}
                <li>
                  <Link onClick={()=>{signOut()}} href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                </li>
              </ul>
            </div> </>
          }
          
          {session && <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2" onClick={() => { signOut() }}>Logout</button>}
          {!session && <Link href={"/Login"}>
              <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2" >Login</button></Link>}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
