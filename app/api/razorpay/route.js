import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/db/connectDB";


export const POST = async (req) => {
    await connectDB()
    let body = await req.formData()
    body = Object.fromEntries(body)

    //Check if razorpayorderid is present on the server
    let p = await Payment.findOne({ oid: body.razorpay_order_id })
    if (!p) {
        return NextResponse.json({success: false , message:"Order id is not found"})
    }

    // Verify the payment
    let xx = validatePaymentVerification({"order_id": body.razorpay_order_id,  "payment_id": body.razorpay_payment_id},  body.razorpay_signature, process.env.KEY_SECRET)

    if(xx){
        // Update the payment status
        const updatePayment = await Payment.findOneAndUpdate({oid: body.razorpay_order_id}, {done: "true"}, {new: true})
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatePayment.to_user}? paymentdone = true`)
     }

     else{
        return NextResponse.json({success: false , message:"Payment Verification Failed"})
     }
}