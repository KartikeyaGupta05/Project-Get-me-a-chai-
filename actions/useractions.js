"use server"

import Payment from "@/models/Payment"
import Razorpay from 'razorpay'
import User from "@/models/User"
import connectDB from "@/db/connectDB"


export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()
    var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_KEY_ID, key_secret: process.env.KEY_SECRET })


    let options = {
        amount: Number.parseInt(amount),
        currency: "INR"
    }

    let x = await instance.orders.create(options)

    //create a payment objects which show the pending payment in the database
    await Payment.create({ oid: x.id, amount: amount/100, to_user: to_username, name: paymentform.name, message: paymentform.message })

    return x
}


export const fetchuser = async (username) => {
    await connectDB()
    let a = await User.findOne({ username: username })
    let user = a.toObject({ flattenObjectIds: true })
    return user
}

export const fetchpayments = async (username) => {
    await connectDB()
    // find all payments sorted by decreasing order of amount
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(10).lean()
    return p
}


export const updateProfile = async (data, oldusername) => {
    await connectDB()
    let ndata = Object.fromEntries(data)
    //if the username is being upadated , check username is available
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exist" }
        
        }
        await User.updateOne({email: ndata.email}, ndata)
        // now update all the usernames in the payment leaderboard
        await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username}) 
    }
    else{
        await User.updateOne({email: ndata.email}, ndata)
    }
}

