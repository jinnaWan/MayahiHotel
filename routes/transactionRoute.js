const express = require('express');
const transactionModel = require('../models/transaction');
const router = express.Router();
const bookingModel = require('../models/booking');
const roomModel = require('../models/room');
const orderModel = require('../models/order');
const boardgameModel = require('../models/borrowboardgame');

router.get("/getTransactionByUserId/:userid", async (req, res) => {
    try {
        const transaction = await transactionModel.find({ userid: req.params.userid });
        return res.send(transaction);
    } catch (err) {
        return res.status(400).send({ error: err });
    }
});

router.get("/getAllTransactions", async (req, res) => {
    try {
        const transaction = await transactionModel.find();
        return res.send(transaction);
    } catch (err) {
        return res.status(400).send({ error: err });
    }
});

router.put("/cancelTransaction/:id", async (req, res) => {
    try {
        const transaction = await transactionModel.findByIdAndUpdate(req.params.id, { status: "cancelled" });
        //if this is booking transaction, then we need to update the booking status to cancelled
        if (transaction.category === "Room Booking") {
            const booking = await bookingModel.findByIdAndUpdate(transaction.transactionid, { status: "cancelled" });
            await booking.save();
            const room = await roomModel.findOne({ _id: booking.roomid });
            const currentbookings = room.currentbookings.filter(booking => booking.bookingid != transaction.transactionid);
            room.currentbookings = currentbookings;
            await room.save();
        }
        //if this is food transaction, then we need to update the food status to cancelled
        if (transaction.category === "Food Order") {
            const order = await orderModel.findByIdAndUpdate(transaction.transactionid, { status: "cancelled" });
            await order.save();
        }
        //if this is boardgame transaction, then we need to update the boardgame status to returned
        if (transaction.category === "Boardgame Borrowing") {
            const borrow = await boardgameModel.findByIdAndUpdate(transaction.transactionid, { status: "returned" });
            await borrow.save();
        }

        return res.send(transaction);
    } catch (err) {
        return res.status(400).send({ error: err });
    }
});

router.put("/approveTransaction/:id", async (req, res) => {
    try {
        const transaction = await transactionModel.findByIdAndUpdate(req.params.id, { status: "approved" });
        //if this is booking transaction, then we need to update the booking status to approved
        if (transaction.category === "Room Booking") {
            const booking = await bookingModel.findByIdAndUpdate(transaction.transactionid, { status: "booked" });
            await booking.save();
            const room = await roomModel.findOne({ _id: booking.roomid });
            const tmp = room.currentbookings.filter(booking_ => booking_.bookingid != transaction.transactionid);
            room.currentbookings = tmp;
            room.currentbookings.push({
                bookingid: booking._id,
                fromdate: booking.fromdate,
                todate: booking.todate,
                userid: booking.userid,
                status: 'booked'
            });
            await room.save();
        }

        return res.send(transaction);
    } catch (err) {
        return res.status(400).send({ error: err });
    }
});

router.delete("/deleteTransaction/:id", async (req, res) => {
    try {
        const transaction = await transactionModel.findByIdAndDelete(req.params.id);
        //if this is booking transaction
        if (transaction.category === "Room Booking") {
            const booking = await bookingModel.findByIdAndDelete(transaction.transactionid);
            const room = await roomModel.findOne({ _id: booking.roomid });
            const currentbookings = room.currentbookings.filter(booking => booking.bookingid != transaction.transactionid);
            room.currentbookings = currentbookings;
            await room.save();
        }
        //if this is food transaction
        if (transaction.category === "Food Order") {
            const order = await orderModel.findByIdAndDelete(transaction.transactionid);
        }
        //if this is boardgame transaction
        if (transaction.category === "Boardgame Borrowing") {
            const borrow = await boardgameModel.findByIdAndDelete(transaction.transactionid);
        }
        return res.send(transaction);
    } catch (err) {
        return res.status(400).send({ error: err });
    }
});
        

module.exports = router;