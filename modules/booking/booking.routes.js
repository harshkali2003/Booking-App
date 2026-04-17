const express = require("express");
const router = express.Router();

const {VerifyToken} = require("../../shared/middlewares/auth.middleware")
const roleAuthenticator = require("../../shared/middlewares/role.middlware")

const controller = require("./booking.controller")

router.post("/post" , VerifyToken , roleAuthenticator("USER" , "ADMIN") , controller.CreateBooking)

router.get("/:userId" ,VerifyToken , roleAuthenticator("USER" , "ADMIN") , controller.GetMyBooking)

router.patch("/:bookingId" ,VerifyToken , roleAuthenticator("USER" , "ADMIN") , controller.EditBooking)

module.exports = router;