import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    transactionid: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: [],
    status: {
        type: String,
        required: true,
    }
},{
    timestamps: true
});

export default mongoose.model("Transaction", transactionSchema);