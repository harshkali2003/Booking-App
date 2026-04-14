const bcrypt = require("bcrypt");
const User = require("./user.model");

exports.register = async (req, resp, next) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      throw new Error("All fields are required");
    }

    if (!email.includes("@") || typeof phone !== "number") {
      throw new Error("Invalid format");
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNo: phone }],
    });
    if (existingUser) {
      throw new Error("Email or Phone already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phoneNo: phone,
      password: hashedPassword,
      role: "USER",
    });

    return resp.status(201).json({ success: true, data: newUser });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, resp, next) => {
  try {
    const { email, phone, password } = req.body;
    if ((!email && !phone) || !password) {
      throw new Error("Password and at least one contact method (email or phone) are required");
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNo: phone }],
    });
    if (!existingUser) {
      throw new Error("Not a registered user");
    }

    const passwordCheck = await bcrypt.compare(
      password,
      registeredUser.password,
    );
    if (!passwordCheck) {
      throw new Error("Incorrect Password");
    }

    return resp.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
};
