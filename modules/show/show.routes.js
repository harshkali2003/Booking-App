const express = require("express")
const router = express.Router()

const controller = require("./show.controller")

router.post("/create" , controller.createShow)

router.get("/shows" , controller.getAllShow)

router.get("/:id" , controller.getShowById)

module.exports = router;