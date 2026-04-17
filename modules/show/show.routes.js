const express = require("express")
const router = express.Router()

const controller = require("./show.controller")

const {VerifyToken} = require("../../shared/middlewares/auth.middleware")
const roleAuthenticator = require("../../shared/middlewares/role.middlware")

router.post("/create" , VerifyToken , roleAuthenticator("ADMIN") , controller.createShow)

router.get("/shows" , VerifyToken , roleAuthenticator("USER","ADMIN") , controller.getAllShow)

router.get("/:id" , VerifyToken , roleAuthenticator("USER" , "ADMIN") , controller.getShowById)

module.exports = router;