const { getPapsHandler } = require("../../Handlers/handlers");
const {Router} = require("express")
const papsRoutes = Router();

papsRoutes.get("/paps", getPapsHandler)

module.exports = papsRoutes