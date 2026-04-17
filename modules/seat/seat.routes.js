const express = require("express")
const router = express.Router()

const controller = require("./seat.controller")

const {VerifyToken} = require("../../shared/middlewares/auth.middleware")
const roleAuthenticator = require("../../shared/middlewares/role.middlware")

router.get("/show/:id/seats" , VerifyToken , roleAuthenticator("USER" , "ADMIN") , controller.getSeatsByShowId)

module.exports = router;