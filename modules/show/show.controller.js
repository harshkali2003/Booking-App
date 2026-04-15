const { default: mongoose } = require("mongoose");
const Show = require("./show.model");

exports.createShow = async (req, resp, next) => {
  try {
    const { title, dateTime, totalSeats } = req.body;
    if (!title || !dateTime || !totalSeats || totalSeats === undefined) {
      throw new Error("All fields are required");
    }

    if (typeof totalSeats !== "number" || totalSeats < 1) {
      throw new Error("Please pass a valid number");
    }

    if (isNaN(Date.parse(dateTime))) {
      throw new Error("Invalid date format");
    }

    const newShow = await Show.create({
      title,
      dateTime,
      totalSeats,
    });

    return resp.status(201).json({ success: true, data: newShow });
  } catch (err) {
    next(err);
  }
};

exports.getAllShow = async (req, resp, next) => {
  try {
    const { title, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * Number(limit);

    const shows = await Show.find(filter).skip(skip).limit(limitNum);

    if (shows.length === 0) {
      throw new Error("No Show found");
    }

    const totalShow = await Show.countDocuments();

    return resp
      .status(200)
      .json({
        success: true,
        data: shows,
        Total: totalShow,
        totalPages: Math.ceil(totalShow / limitNum),
        currentPage: pageNum,
      });
  } catch (err) {
    next(err);
  }
};

exports.getShowById = async (req, resp, next) => {
  try {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new Error("Invalid Id")
    }

    const show = await Show.findById(id)

    if(!show){
        throw new Error("No Show found")
    }

    return resp.status(200).json({success : true , data : show})
  } catch (err) {
    next(err);
  }
};
