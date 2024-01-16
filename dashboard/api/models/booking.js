import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true,
    },
    roomid: {
        type: String,
        required: true,
    },
    roomtype: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
    fromdate: {
        type: String,
        required: true,
    },
    todate: {
        type: String,
        required: true,
    },
    totalprice: {
        type: Number,
        required: true,
    },
    totaldays: {
        type: Number,
        required: true,
    },
    paymentMethod:[],
    status: {
        type: String,
        required: true,
        default: 'waiting',
    }
}, {
    timestamps: true,
});

export default mongoose.model("Booking", bookingSchema);