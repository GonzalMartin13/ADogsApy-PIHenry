const {Dog, Temperament} = require("../src/db")
const axios = require("axios");
require('dotenv').config();
const {API_KEY} = process.env;
const {CatDog} = require("../Utils/catdog");
const perroLimpio = require("../Utils/filtroPerros");

const papsControler = () =>{
    return "Si o no"
}

// Busqueda todos los perro y por query //
const allPerritos = async (raza) => {
    //-- Peticiones a la DB y a la API --//
    const pichichosDB = await Dog.findAll({
        include: {
            model: Temperament,
        }
        });

    const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

    let todosLosPerritos = [...pichichosDB, ...data];

    if (raza){
        const perritosQuery = todosLosPerritos.filter(pichicho => {
            return pichicho.name.toLowerCase().includes(raza.toLowerCase())
        })
        if (perritosQuery.length < 1){
            return todosLosPerritos = CatDog
        } else {
            return perritosQuery.map((perro) => perroLimpio(perro))
        }
    } else {
        return todosLosPerritos.map((perro) => perroLimpio(perro))
    }
}

// Agregar perro y temperamento a BD//
const nuevoPerro = async (name, img, altura, peso, añosdevida, temperament) => {
    try {
        const newPet = await Dog.create({
                    name,
                    img,
                    altura,
                    peso,
                    añosdevida,
            });
            
            if (temperament && temperament.length > 0){
                const temperamentoArray = temperament.split(",")
                for (const temp of temperamentoArray){
                    const asosiacionTemperamento = await Temperament.findOne({
                        where: {
                            name: temp.trim()
                        }
                    })
                    console.log(temperamentoArray)
                    if(asosiacionTemperamento){
                        await newPet.addTemperament(asosiacionTemperamento) 
                    }
                }
            }
            
            return newPet;
    } catch (error) {
        throw new Error(error.message);
    }
}
// Busqueda por ID raza//
 const traerPerritoXRaza = async (id, tipo) =>{
    if (tipo == "api"){
        console.log(typeof(id))
        const {data} = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        const perroID = data.filter((perrito) => {
            return perrito.id == id
        })
        if (perroID < 1){
            return CatDog
        } else {
            console.log("antes de limpiar" + perroID)
            return perroID.map((perro) => perroLimpio(perro));
        }
    } else {
        console.log("else db")
        const perroEnBase = await Dog.findByPk(id,{
            include: {
            model: Temperament,
        }
        });
        console.log("perro en base:" + perroEnBase)
        return [perroLimpio(perroEnBase)];
        
    }
 }

// Traer temperamentos de API - cargarlos a la BD - traer BD //
 const temperamentsBD = async() => {
    const {data} = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const temperamentSet = new Set();
  
    data.forEach(temp => {
      if (temp.temperament) {
        const reaccion = temp.temperament.split(',').map((t) => t.trim());
        reaccion.forEach((humor) => {
          temperamentSet.add(humor);
        });
      }
    });
    const temperamentosAPI = Array.from(temperamentSet);
        const tempEnBD = await Temperament.findAll() 
        if (tempEnBD.length === 0){
            temperamentosAPI.map((animo) =>{
            Temperament.findOrCreate({where:{name:animo}})
        })
        console.log("Temperamentos cargados a la Base De Datos")
        } else {
            console.log("Ya estan cargados los temperamentos")
        }
 }
 const traerTemps = async() =>{
    const temperamentos = await Temperament.findAll();
    console.log("temperamentos traidos de la bd")
      return temperamentos
 }

module.exports = {
    allPerritos,
    traerPerritoXRaza,
    temperamentsBD,
    nuevoPerro,
    traerTemps,
    papsControler
}