const mongoose = require("mongoose");
const Booking = require("./booking.model");
const Show = require("../show/show.model");
const Seat = require("../seat/seat.model");

exports.CreateBooking = async (req, resp, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, showId, seats } = req.body; // 'seats' is an array [1, 2]

    if (!userId || !showId || !seats || seats.length === 0) {
      throw new Error("Missing required fields");
    }

    // 1. Find and Update seats atomically to prevent double-booking
    // Only update if the seat status is currently 'AVAILABLE'
    const seatUpdates = await Seat.updateMany(
      {
        showId,
        seatNumber: { $in: seats },
        status: "AVAILABLE",
      },
      { $set: { status: "BOOKED", userId: userId } },
      { session },
    );

    // Check if all requested seats were actually available and updated
    if (seatUpdates.modifiedCount !== seats.length) {
      throw new Error("One or more seats are no longer available");
    }

    // 2. Calculate total price (Assuming each seat has a price property)
    const seatDetails = await Seat.find({ seatNumber: { $in: seats }, showId });
    const totalPrice = seatDetails.reduce((sum, seat) => sum + seat.price, 0);

    // 3. Create the Booking record
    const booking = await Booking.create(
      [
        {
          userId,
          showId,
          seats, // [1, 2]
          totalPrice,
          status: "CONFIRMED", // Usually set to confirmed if payment is successful/handled
        },
      ],
      { session },
    );

    // 4. Update the Show model (the bookedSeats array we discussed earlier)
    await Show.findByIdAndUpdate(
      showId,
      { $push: { bookedSeats: { $each: seats } } },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return resp.status(201).json({
      success: true,
      data: booking[0], // Booking.create returns an array when using sessions
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

exports.GetMyBooking = async (req, resp, next) => {
  try {
    const user = req?.user;
    if (!user) {
      throw new Error("Login first");
    }

    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Not a valid ID");
    }

    const booking = await Booking.find({ userId }).sort({ createdAt: -1 });

    if (booking.length === 0) {
      throw new Error("No booking found");
    }

    const count = await Booking.countDocuments({ userId });

    return resp.status(200).json({
      success: true,
      count: count,
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

// Cancel
exports.EditBooking = async (req, resp, next) => {
  try {
    const user = req?.user;
    if (!user) {
      throw new Error("Login first");
    }

    const { bookingId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      throw new Error("Not a valid ID");
    }

    const { status } = req.body;

    const booking = await Booking.findOne({ _id: bookingId });
    if (!booking) {
      throw new Error("No booking found");
    }

    if (booking.userId.toString() !== user.toString()) {
      throw new Error("Unauthorized");
    }

    if (booking.status !== "CONFIRMED") {
      throw new Error("Booking can't be cancelled");
    }

    if (booking.status === "CANCELLED") {
      throw new Error("Booking already cancelled");
    }

    booking.status = "CANCELLED";
    await booking.save();

    await Show.findByIdAndUpdate(booking.showId, {
      $pull: { bookedSeats: { $in: booking.seats } },
    });

    return resp.status(200).json({
      success: true,
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};
