"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'

const Profile = () => {
    const { data: session, update } = useSession();
    const router = useRouter();
    const [form, setform] = useState({})

    const getData = async (e) => {
        // let a = await fetchuser(session.user.name)
        // setform(a)
        if (session?.user?.name) {
            let userData = await fetchuser(session.user.name);
            setform(userData);
        }
    }

    // Use useEffect to handle the redirection after rendering
    useEffect(() => {
        document.title = "Dashboard - Get Me a Chai"
        getData()
        if (!session) {
            router.push('/login');
        }
    }, [session, router]); // Ensure useEffect runs when session or router changes

    if (!session) {
        return null; // You can also return a loading indicator here if needed
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        let u = await updateProfile(e, session.user.name)
        toast('Profile Updated! ', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }

    return (
        <>
        
        <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            {/* Same as */}
            <ToastContainer />


            <form className='p-3' action={handleSubmit}>
                <h1 className='font-bold text-3xl text-center mb-4'>Welcome to Dashboard</h1>
                <div className='flex flex-col md:w-2/3 w-full p-7 md:p-0 mx-auto'>
                    <div className="mb-2">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                        <input onChange={handleChange} value={form.name ? form.name : ""} type="text" name='name' id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input onChange={handleChange} value={form.username ? form.username : ""} type="text" id="username" name='username' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john12" required />
                    </div>


                    <div className="mb-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input onChange={handleChange} value={form.email ? form.email : ""} type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@gmail.com" required />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
                        <input onChange={handleChange} value={form.profilepic ? form.profilepic : ""} type="url" id="profilepic" name='profilepic' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john12" required />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
                        <input onChange={handleChange} value={form.coverpic ? form.coverpic : ""} type="url" id="coverpic" name='coverpic' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john12" required />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Id</label>
                        <input onChange={handleChange} value={form.razorpayid ? form.razorpayid : ""} type="text" id="razorpayid" name='razorpayid' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john12" required />
                        </div >

                        <div className="mb-6">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Secret</label>
                            <input onChange={handleChange} value={form.razorpaysecret ? form.razorpaysecret : ""} type="text" id="razorpaysecret" name='razorpaysecret' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john12" required />
                        </div>

                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>
            </form>
        </>
    )
}

export default Profile


