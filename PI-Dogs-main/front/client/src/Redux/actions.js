
import { ALL_DOGS, SET_CONTER, GET_BY_NAME, USER, ORDER_AZ, API, DB, ALL_TEMPERAMENTS, TRAER_TEMPERAMENT,} from "./action-types";
import axios from "axios";


export const increment = () => ({
    type: 'INCREMENT',
  });
  
  export const decrement = () => ({
    type: 'DECREMENT',
  });

  export const setConter = () => ({
    type: SET_CONTER,
  })

  export const setDogs = () => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get("http://localhost:3001/dogs");
        dispatch({
          type: ALL_DOGS,
          payload: data,
        });
      } catch (error) {
        console.error("Error en la acción setDogs:", error);
      }
    };
  };
  
  export const setTemperaments = () => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get("http://localhost:3001/temperament");
        dispatch({
          type: ALL_TEMPERAMENTS,
          payload: data,
        });
      } catch (error) {
        console.error("Error en la acción setDrivers:", error);
      }
    };
  };

  export const traerPorTemperamento = (temp) => {
    return async (dispatch) => {
      try {
        const { data } = await axios("http://localhost:3001/dogs/");
        console.log(data, temp)
        const tempFiltrado = data.filter(perri => perri.temperamento && perri.temperamento.includes(temp));
        console.log(tempFiltrado)
        dispatch({
          type: TRAER_TEMPERAMENT,
          payload: tempFiltrado,
        });
      } catch (error) {
        return (console.log(error))
      }
    };
  };

  export const setUsuario = (user) => {
    return (dispatch) => {
        dispatch({
          type: USER,
          payload: user,
        });
      } 
    };

    export const traerXraza = (query) => {
      return async (dispatch) => {
        try {
          const { data } = await axios.get(`http://localhost:3001/dogs?name=${query}`);
          console.log(data);
          dispatch({
            type: GET_BY_NAME,
            payload: data,
          });
        } catch (error) {
          console.error("Error en la acción api:", error);
        }
      };
    };

    export const ordenarAlfabeticamente = (dogs) => ({
      type: ORDER_AZ,
      payload: dogs,
    });
  
    export const traerApi = () => {
      return async (dispatch) => {
        try {
          const { data } = await axios.get('http://localhost:3001/dogs/api');
          console.log(data);
          console.log(data)
          dispatch({
            type: API,
            payload: data,
          });
        } catch (error) {
          console.error("Error en la acción setAPI:", error);
        }
      };
    };

    export const traerDB = () => {
      return async (dispatch) => {
        try {
          const {data} = await axios.get("http://localhost:3001/dogs/bd/")
          console.log(data);
          dispatch({
            type: DB,
            payload: data,
          });
        } catch (error) {
          console.error("Error en la acción setDB:", error);
        }
      };
    };