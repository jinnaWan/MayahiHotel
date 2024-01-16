import express from "express";
import transactionModel from "../models/transaction.js";
import bookingModel from "../models/booking.js";
import userModel from "../models/userAgain.js";
import roomModel from "../models/roomAgain.js";

const router = express.Router();

router.get("/getTotalAmountByEachMonth", async (req, res) => {
  try {
    const transaction = await transactionModel.find();
    var jan = 0;
    var feb = 0;
    var mar = 0;
    var apr = 0;
    var may = 0;
    var jun = 0;
    var jul = 0;
    var aug = 0;
    var sep = 0;
    var oct = 0;
    var nov = 0;
    var dec = 0;
    for (var i = 0; i < transaction.length; i++) {
      if (transaction[i].createdAt.getMonth() === 0) {
        jan += transaction[i].amount;
      }
      if (transaction[i].createdAt.getMonth() === 1) {
        feb += transaction[i].amount;
      }
      if (transaction[i].createdAt.getMonth() === 2) {
        mar += transaction[i].amount;
      }
      if (transaction[i].createdAt.getMonth() === 3) {
        apr += transaction[i].amount;
      }
      if (transaction[i].createdAt.getMonth() === 4) {
        may += transaction[i].amount;
      }
      if (transaction[i].createdAt.getMonth() === 5) {
        jun += transaction[i].amount;
      }
      if (transaction[i].createdAt.getMonth() === 6) {
        jul += transaction[i].amount;
      }
      if (transaction[i].createdAt.getMonth() === 7) {
        aug += transaction[i].amount;
      }
      if (transaction[i].createdAt.getMonth() === 8) {
        sep += transaction[i].amount;
      }
      if (transaction[i].createdAt.getMonth() === 9) {
        oct += transaction[i].amount;
      }
      if (transaction[i].createdAt.getMonth() === 10) {
        nov += transaction[i].amount;
      }
      if (transaction[i].createdAt.getMonth() === 11) {
        dec += transaction[i].amount;
      }
    }
    return res.send({
      January: jan,
      February: feb,
      March: mar,
      April: apr,
      May: may,
      June: jun,
      July: jul,
      August: aug,
      September: sep,
      October: oct,
      November: nov,
      December: dec,
    });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

router.get("/totalBookings", async (req, res) => {
  try {
    const bookings = await bookingModel.find();
    const totalBookings = Object.keys(bookings).length.toString();
    res.send(totalBookings);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/totalUsers", async (req, res) => {
  try {
    const bookings = await userModel.find();
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

router.get("/getMethodPercentage", async (req, res) => {
  try {
    const result = await transactionModel.aggregate([
      {
        $group: {
          _id: "$paymentMethod.paymentMethod",
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$count" },
          paymentMethods: {
            $push: {
              paymentMethod: "$_id",
              count: "$count"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          paymentMethods: {
            $map: {
              input: "$paymentMethods",
              as: "method",
              in: {
                paymentMethod: "$$method.paymentMethod",
                percentage: { $multiply: [{ $divide: ["$$method.count", "$total"] }, 100] }
              }
            }
          }
        }
      }
    ]);
      return res.send(result);
  } catch (err) {
      return res.status(400).send({ error: err });
  }
});

router.get("/getBookingTimeDistribution", async (req, res) => {
  try {
    const result = await bookingModel.aggregate([
      {
        $project: {
          hour: { $hour: { $toDate: "$createdAt" } }
        }
      },
      {
        $addFields: {
          hourSlot: {
            $concat: [
              {
                $switch: {
                  branches: [
                    { case: { $lt: ["$hour", 4] }, then: "00:00-04:00" },
                    { case: { $lt: ["$hour", 8] }, then: "04:00-08:00" },
                    { case: { $lt: ["$hour", 12] }, then: "08:00-12:00" },
                    { case: { $lt: ["$hour", 16] }, then: "12:00-16:00" },
                    { case: { $lt: ["$hour", 20] }, then: "16:00-20:00" },
                    { case: { $lt: ["$hour", 24] }, then: "20:00-00:00" }
                  ],
                  default: "Unknown"
                }
              }
            ]
          }
        }
      },
      {
        $group: {
          _id: "$hourSlot",
          count: { $sum: 1 }
        }
      }
    ]);

    // Generate time ranges from 0:00 to 24:00
    const timeRanges = [
      "00:00-04:00",
      "04:00-08:00",
      "08:00-12:00",
      "12:00-16:00",
      "16:00-20:00",
      "20:00-00:00"
    ];

    // Match the counts for each time range
    const bookingTimeDistribution = timeRanges.map((range) => {
      const count = result.find((r) => r._id === range)?.count || 0;
      return { range, count };
    });

    return res.send(bookingTimeDistribution);
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});


export default router;
