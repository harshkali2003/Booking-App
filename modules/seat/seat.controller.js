const { default: mongoose } = require("mongoose");
const Seat = require("./seat.model")

exports.getSeatsByShowId = async (req, resp, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid Show Id");
    }

    const { status } = req.query;

    const filter = { showId: id };

    if (status) {
      if (!["AVAILABLE", "BOOKED"].includes(status)) {
        throw new Error("Invalid status value");
      }
      filter.status = status;
    }

    const seats = await Seat.find(filter);

    const total = await Seat.countDocuments(filter);

    if (seats.length === 0) {
      throw new Error("No seats found");
    }

    return resp.status(200).json({
      success: true,
      total,
      data: seats,
    });

  } catch (err) {
    next(err);
  }
};