require('dotenv').config();
const {API_KEY} = process.env;
const {Dog, Temperament} = require("../src/db")
const {allPerritos, papsControler, traerPerritoXRaza, traerTemps, nuevoPerro} = require("../Controlers/controladotes.js")
const axios = require("axios");
const perroLimpio = require('../Utils/filtroPerros.js');

const getPapsHandler = async(req, res) => {
    try {
         const paps = await papsControler()
         res.status(200).json(paps)
    } catch (error) {
        
    }
}

const getDogsHandler = async(req,res) => {
    const {name} = req.query;

    try{
        const response = await allPerritos(name)
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
};

const getDogsBDHandler = async(req,res) => {
    try{
        const perrosBD = await Dog.findAll({
            include: {
                model: Temperament,
            }
            });
        const perrosFiltrados = perrosBD.map((perro) => perroLimpio(perro))     
        res.status(200).json(perrosFiltrados)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
};

const getDogsApiHandler = async(req,res) => {
    try{
        const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        const datafiltrada = data.map((perro) => perroLimpio(perro))
        res.status(200).json(datafiltrada)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
};

const getDogsRazaHandler = async(req,res) => {
    const {id} = req.params;
    console.log(typeof(id))
    const esUUID = isNaN(id) ? "base" : "api"
    console.log(typeof(id), id, esUUID)
    try{
        const pichicho = await traerPerritoXRaza(id, esUUID)
        res.status(200).json(pichicho)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
};

const postDogsHandler = async(req,res) => {
    const {name, img, altura, peso,añosdevida, temperaments } = req.body
    try{
        const cargarBase = await nuevoPerro(name, img, altura, peso,añosdevida, temperaments) 
        res.status(200).json({cargarBase})
    } catch (error) {
        res.status(404).json({error:error.message})
        console.log(error.message);
    }
};

const getTemperamentHandler = async(req,res) => {
    try{
        const temperamentos = await traerTemps();
          res.status(200).json(temperamentos);
    } catch (error) {
        res.status(404).json({error:error.message})
    }
};


module.exports = {
    getDogsHandler,
    getDogsApiHandler,
    getDogsRazaHandler,
    postDogsHandler,
    getTemperamentHandler,
    getDogsBDHandler,
    getPapsHandler,
    }