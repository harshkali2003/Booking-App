const express = require("express")
const router = express.Router()

const controller = require("./seat.controller")

router.get("/show/:id/seats" , controller.getSeatsByShowId)

module.exports = router;