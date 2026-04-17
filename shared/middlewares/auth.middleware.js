require("dotenv").config();
const jwt = require("jsonwebtoken");
const { createClient } = require("redis");

const client = createClient();
client.connect();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

function GenerateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "72h" });
}

async function VerifyToken(req, resp, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(new Error("Please provide a token"));

  const token = authHeader.split(" ")[1];

  const blacklist = await client.getEx(`blacklist${token}`);
  if (blacklist) return next(new Error("Expired token"));

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded;

    next();
  } catch (err) {
    return next(new Error("Invalid or expired token"));
  }
}

async function Logout(req, resp, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(new Error("Please provide a token"));

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, SECRET_KEY);

  const timeLeft = `${decoded.exp} - ${Date.now() / 1000}`;

  if (timeLeft > 0) {
    const blacklist = await client.setEx(`blacklist${token}`, timeLeft, "true");
  }

  return resp.status(200).json({
    success: true,
    message: "Logout successfully",
  });
}

module.exports = {GenerateToken , VerifyToken , Logout};