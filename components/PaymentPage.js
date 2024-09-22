"use client"
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchpayments, initiate } from '@/actions/useractions'
import { fetchuser } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'
import { useRouter } from 'next/navigation'



const PaymentPage = ({ username }) => {
    //   const { data: session } = useSession()

    const [paymentform, setpaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentuser, setcurrentuser] = useState({})
    const [Payments, setPayments] = useState([])
    const SearchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (SearchParams.get("paymentdone") == "true") {
            toast('Thanks for your donation!', {
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
            router.push(`/${username}`)
        }
    }, [])

    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async (params) => {
        let dbuser = await fetchuser(username)
        setcurrentuser(dbuser)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
    }

    const pay = async (amount) => {
        //get the order id
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentuser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get me a Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Kartikeya Gupta", //your customer's name
                "email": "kartikeya.gupta@example.com",
                "contact": "9368918168" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = new Razorpay(options);
        rzp1.open();
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
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


            <div className='cover relative'>
                <img src={currentuser.coverpic} alt="" />
                <div className="profilepic mb-24">
                    <img className='absolute -bottom-10 md:-bottom-16 right-[43%] md:right-[46%] rounded-full md:size-36 size-16  md:w-150 md:h-150  object-cover'  src={currentuser.profilepic} alt="" />
                </div>
            </div>
            <div className="info flex flex-col justify-center items-center my-14 gap-2">
                <div className='font-bold text-3xl'>@{username}</div>
                <div className='text-slate-300'>Lets help {username} to get a chai</div>
                <div className='text-slate-300'> {Payments.length} Payments . {currentuser.name} has raised ₹ {Payments.reduce((a, b) => a + b.amount, 0)}</div>

                <div className="flex gap-3 w-[80%] mt-12 flex-col md:flex-row">
                    <div className="supporters w-full  bg-slate-700 p-6 rounded-lg md:w-1/2">
                        {/* Show list of all supporter as a leaderboard */}
                        <h2 className='font-bold text-2xl mb-5 text-center text-white'>Top 10 Supporters</h2>

                        {Payments.length === 0 && (
                            <li className='font-bold text-white text-center'>No payments yet</li>
                        )}

                        {/* Add min-h and overflow for scroll */}
                        <ul className='mx-5 text-base min-h-[200px] max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-700'>
                            {Payments.map((p, i) => {
                                return (
                                    <li key={i} className='my-2 gap-2 flex items-center text-white'>
                                        <img width={30} src="/avatar.png" alt="Avatar" className="rounded-full" />
                                        <span>
                                            {p.name} donated
                                            <span className='font-bold'> ₹{p.amount}</span>
                                            with a message "{p.message}"
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>




                    <div className="makepayment bg-slate-700 p-6 rounded-lg w-full md:w-1/2">
                        <h2 className='font-bold text-2xl mb-3 text-center'>Make a Payment</h2>
                        <input onChange={handleChange} value={paymentform.name} name='name' className='w-full p-3 rounded-lg bg-slate-800 mb-3' type="text" placeholder='Enter Name' />
                        <input onChange={handleChange} value={paymentform.message} name='message' className='w-full p-3 rounded-lg bg-slate-800 mb-3' type="text" placeholder='Enter Message' />
                        <div className="flex gap-4 justify-center">
                            <input onChange={handleChange} value={paymentform.amount} name='amount' className='w-3/4 p-3 rounded-lg bg-slate-800' type="number" placeholder='Enter Amount' />
                            {/* <button className='bg-slate-800 rounded-lg p-3 w-16'>Pay</button> */}
                            <button type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 me-2 mb-2 disabled:bg-slate-500" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount.length < 1} onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}>
                                <svg aria-hidden="true" className="w-10 h-3 me-2 -ms-1" viewBox="0 0 660 203" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M233.003 199.762L266.362 4.002H319.72L286.336 199.762H233.003V199.762ZM479.113 8.222C468.544 4.256 451.978 0 431.292 0C378.566 0 341.429 26.551 341.111 64.604C340.814 92.733 367.626 108.426 387.865 117.789C408.636 127.387 415.617 133.505 415.517 142.072C415.384 155.195 398.931 161.187 383.593 161.187C362.238 161.187 350.892 158.22 333.368 150.914L326.49 147.803L319.003 191.625C331.466 197.092 354.511 201.824 378.441 202.07C434.531 202.07 470.943 175.822 471.357 135.185C471.556 112.915 457.341 95.97 426.556 81.997C407.906 72.941 396.484 66.898 396.605 57.728C396.605 49.591 406.273 40.89 427.165 40.89C444.611 40.619 457.253 44.424 467.101 48.39L471.882 50.649L479.113 8.222V8.222ZM616.423 3.99899H575.193C562.421 3.99899 552.861 7.485 547.253 20.233L468.008 199.633H524.039C524.039 199.633 533.198 175.512 535.27 170.215C541.393 170.215 595.825 170.299 603.606 170.299C605.202 177.153 610.098 199.633 610.098 199.633H659.61L616.423 3.993V3.99899ZM551.006 130.409C555.42 119.13 572.266 75.685 572.266 75.685C571.952 76.206 576.647 64.351 579.34 57.001L582.946 73.879C582.946 73.879 593.163 120.608 595.299 130.406H551.006V130.409V130.409ZM187.706 3.99899L135.467 137.499L129.902 110.37C120.176 79.096 89.8774 45.213 56.0044 28.25L103.771 199.45L160.226 199.387L244.23 3.99699L187.706 3.996" fill="#0E4595" /><path d="M86.723 3.99219H0.682003L0 8.06519C66.939 24.2692 111.23 63.4282 129.62 110.485L110.911 20.5252C107.682 8.12918 98.314 4.42918 86.725 3.99718" fill="#F2AE14" /></svg>
                                Pay with Visa
                            </button>
                        </div>
                        {/* or chose from these amounts */}
                        <div className="flex flex-col md:flex-row justify-center gap-3 mt-5">
                            <button className='bg-slate-800 rounded-lg p-3 w-full md:w-24' onClick={() => pay(3000)}>Pay ₹30</button>
                            <button className='bg-slate-800 rounded-lg p-3 w-full md:w-24' onClick={() => pay(5000)}>Pay ₹50</button>
                            <button className='bg-slate-800 rounded-lg p-3 w-full md:w-24' onClick={() => pay(8000)}>Pay ₹80</button>
                            <button className='bg-slate-800 rounded-lg p-3 w-full md:w-24' onClick={() => pay(10000)}>Pay ₹100</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PaymentPage
