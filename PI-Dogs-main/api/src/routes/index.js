const { Router } = require('express');
const getDogsRouter = require("./getDogsRouter");
const getTemperamentRouter = require("./getTemperamentRouter");
const postDogsRouter = require("./postDogsRouter");
const papsRoutes = require("./papsRouters")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


router.use("/dogs", getDogsRouter);

router.use("/temperament", getTemperamentRouter);

router.use("/postdogs", postDogsRouter)

router.use("/paps", papsRoutes)

module.exports = router;
