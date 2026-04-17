const bcrypt = require("bcrypt");
const User = require("./user.model");

const {GenerateToken} = require("../../shared/middlewares/auth.middleware")

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

    const result = await newUser.toObject();
    delete result.password;

    const token = GenerateToken(result)

    return resp.status(201).json({ success: true, data: newUser , token : token });
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

    const result = await existingUser.toObject();
    delete result.password;

    const token = GenerateToken(result)

    return resp.status(201).json({ success: true , token : token });
  } catch (err) {
    next(err);
  }
};
