const {Router} = require("express");

const postDogsRouter = Router();
const {postDogsHandler} = require("../../Handlers/handlers")

postDogsRouter.post("/", postDogsHandler);

module.exports = postDogsRouter;