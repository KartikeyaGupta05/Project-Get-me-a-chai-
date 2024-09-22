import PaymentPage from '@/components/PaymentPage'
import React from 'react'
import { notFound } from 'next/navigation'
import connectDB from '@/db/connectDB'
import User from '@/models/User'

const Username = async ({params}) => {

  const check = async ()=>{
    await connectDB()
    let u = await User.findOne({username : params.username})
    if(!u){
      return notFound()
    }
  }
   await check()


  return (
    <>
      <PaymentPage username = {params.username}/>

    </>
  )
}

export default Username

export async function generateMetadata({ params}) {
  return{
    title : `Supports ${params.username} - Get Me a Chai`
  }
}
