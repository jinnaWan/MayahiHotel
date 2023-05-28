const express = require('express');
const router = express.Router();
const bookingModel = require('../models/booking');
const roomModel = require('../models/room');
const transactionModel = require('../models/transaction');

router.post('/bookingRoom', async (req, res) => {
    try {
        const newBooking = new bookingModel({ ...req.body });
        const booking = await newBooking.save();

        const roomTmp = await roomModel.findOne({ _id: req.body.roomid });
        roomTmp.currentbookings.push({
            bookingid: booking._id,
            fromdate: req.body.fromdate,
            todate: req.body.todate,
            userid: req.body.userid,
            status: booking.status
        });
        await roomTmp.save();

        const transaction = new transactionModel({
            userid: req.body.userid,
            transactionid: booking._id,
            category: 'Room Booking',
            amount: req.body.totalprice,
            paymentMethod: req.body.paymentMethod,
            status: 'waiting'
        });
        await transaction.save();

        res.send(booking);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.get('/getBookingsByUserId/:userid', async (req, res) => {
    try {
        const bookings = await bookingModel.find({ userid: req.params.userid });
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.put('/cancelBooking', async (req, res) => {
    try {
        const booking = await bookingModel.findOne({ _id: req.body.bookingid });
        booking.status = 'cancelled';
        await booking.save();

        const room = await roomModel.findOne({ _id: req.body.roomid });
        const currentbookings = room.currentbookings;
        const tmp = currentbookings.filter(booking => booking.bookingid != req.body.bookingid);
        room.currentbookings = tmp;
        await room.save();

        const transaction = await transactionModel.findOne({ transactionid: req.body.bookingid });
        transaction.status = 'cancelled';
        await transaction.save();

        res.send("Booking Cancelled");
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.get('/getBookings', async (req, res) => {
    try {
        const bookings = await bookingModel.find();
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.get('/getRoomTypePopularity', async (req, res) => {
    try {
        const bookings = await bookingModel.find();
        //find all distinct roomtypes from roomModel
        const roomTypes = await roomModel.distinct('type');
        const roomTypePopularity = {};
        roomTypes.forEach(roomType => {
            roomTypePopularity[roomType] = 0;
        });
        bookings.forEach(booking => {
            roomTypePopularity[booking.roomtype] += 1;
        });
        res.send(roomTypePopularity);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.get('/totalBookings', async (req, res) => {
    try {
      const bookings = await bookingModel.find();
      const totalBookings = Object.keys(bookings).length.toString();
      res.send(totalBookings);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  

router.get('/totalBookingsByRoomType', async (req, res) => {
    try {
        const bookings = await bookingModel.find();
        //find all distinct roomtypes from roomModel
        const roomTypes = await roomModel.distinct('type');
        const roomTypePopularity = {};
        roomTypes.forEach(roomType => {
            roomTypePopularity[roomType] = 0;
        });
        bookings.forEach(booking => {
            roomTypePopularity[booking.roomtype] += 1;
        });
        res.send(roomTypePopularity);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.get('/isUserHaveBooking/:userid', async (req, res) => {
    try {
        const bookings = await bookingModel.find({ userid: req.params.userid });
        const totalBookings = Object.keys(bookings).length.toString();
        if(totalBookings > 0)
            res.send(true);
        else
            res.send(false);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

module.exports = router;