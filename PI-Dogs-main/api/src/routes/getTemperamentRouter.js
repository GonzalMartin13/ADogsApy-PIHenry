const {Router} = require("express")
const {getTemperamentHandler} = require ("../../Handlers/handlers.js")
const getTemperamentRouter = Router();


getTemperamentRouter.get("/", getTemperamentHandler)

module.exports = getTemperamentRouter;