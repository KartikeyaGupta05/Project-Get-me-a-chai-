import mongoose from "mongoose";
const { Schema, model } = mongoose;  // Correct destructuring

const PaymentSchema = new Schema({
    name: { type: String },
    to_user: { type: String, required: true },
    oid: { type: String, required: true },
    message: { type: String },
    amount: { type: Number, required: true },
    done: {type: Boolean, default: false}
}, { timestamps: true }); 

// Correct export statement
export default mongoose.models.Payment || model("Payment", PaymentSchema);
