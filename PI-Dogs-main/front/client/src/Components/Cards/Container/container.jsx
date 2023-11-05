import "./container.css"
import CardPerrito from "../Card/card.jsx"
import SearchTemp from "../../Search/searchtemp"
import { useDispatch, useSelector } from "react-redux";
import {
    decrement,
    increment,
    ordenarAlfabeticamente,
    traerApi,
    traerDB,
    setDogs,
  } from "../../../Redux/actions";
import Searchbar from "../../Search/searchbar";
import { useEffect } from "react";
function Container() {
    const dispatch = useDispatch()
    const dogs = useSelector((state) => state.dogs)
    let contador = useSelector ((state) => state.counter) 

    useEffect( () => {
      dispatch(setDogs());
    },[dispatch]);

    const itemsPorPagina = 8;
    const startIndex = (contador - 1) * itemsPorPagina;
    const endIndex = startIndex + itemsPorPagina;
    const dogsPaginaActual = dogs.slice(startIndex, endIndex);
    const maxPages = Math.ceil(dogs.length /8)

    const handleDecrement = () => {
        if (contador !== 1) {
          dispatch(decrement());
        }
      };
    const handleIncrement = () => {
        if (contador <= maxPages -1) {
          dispatch(increment());
        }
      };

const handleApi = () => {
  dispatch(traerApi());
}
const handleDB = () => {
  dispatch(traerDB())
}
 const handleAZ = () => {
  const sortedDogs = [...dogs];
  sortedDogs.sort((a, b) => (a.name && b.name ? a.name.localeCompare(b.name) : 0));
  dispatch(ordenarAlfabeticamente(sortedDogs));
}
const handleZA = () => {
  const sortedDogs = [...dogs];
  sortedDogs.sort((a, b) => (b.name && a.name ? b.name.localeCompare(a.name) : 0));
  dispatch(ordenarAlfabeticamente(sortedDogs));
}
const handlePesados = () => {
  const sortedDogs = [...dogs];
  sortedDogs.sort((a, b) => {
    const weightA = parseInt(b.peso.split(' - ')[0]);
    const weightB = parseInt(a.peso.split(' - ')[0]);
    return weightA - weightB;
  });
  dispatch(ordenarAlfabeticamente(sortedDogs));
}
const handleLivianos = () => {
  const sortedDogs = [...dogs];
  sortedDogs.sort((a, b) => {
    const weightA = parseInt(a.peso.split(' - ')[0]);
    const weightB = parseInt(b.peso.split(' - ')[0]);
    return weightA - weightB;
  });
  dispatch(ordenarAlfabeticamente(sortedDogs));
}

    return ( 
    <div className="pagination">
        <div className="card-container">
            {dogsPaginaActual.map((perro) => (
              <div key={perro.id}>
                <CardPerrito dogs={perro} />
              </div>
            ))}
          </div>
        <div className="botpag">
            <button className="boton" onClick={handleDecrement}> - </button>
            <button className="boton" > {contador} / {maxPages} </button>
            <button className="boton" onClick={handleIncrement}> + </button>
        </div>
      <div className="filtros">
        <button onClick={handleApi} className="boton">API </button>
        <button onClick={handleAZ} className="boton">A-Z </button>
        <button onClick={handleLivianos} className="boton">LIVIANOS</button>
        <button className="boton"><Searchbar/></button>
        <button onClick={handleDB} className="boton">Base De Datos</button>
        <button onClick={handleZA} className="boton">Z-A</button>
        <button onClick={handlePesados} className="boton">PESADOS</button>
        <button className="boton"><SearchTemp/></button>
      </div>
    </div> 
    );
}

export default Container;