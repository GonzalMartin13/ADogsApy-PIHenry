const {Router} = require("express");
const { getDogsApiHandler, getDogsHandler, getDogsRazaHandler, getDogsBDHandler} = require("../../Handlers/handlers")
const getDogsRouter = Router();

getDogsRouter.get("/", getDogsHandler);
getDogsRouter.get("/api", getDogsApiHandler);
getDogsRouter.get("/bd", getDogsBDHandler);
getDogsRouter.get("/:id", getDogsRazaHandler);

module.exports = getDogsRouter;