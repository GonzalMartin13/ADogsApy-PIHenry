import { useState, } from "react";
import { useDispatch } from "react-redux";
import { setConter, traerXraza } from "../../Redux/actions"; 
import "./searchbar.css"

function Searchbar() {
    const [name, setName] = useState([]);
    const dispatch = useDispatch()
    function handleInputChange(event) {
        const {value} = event.target;
        setName(value)
        dispatch(traerXraza(value))
        dispatch(setConter())
     }
    return (  
    <div className="busqueda">
         <input 
         type='search'
         onChange={handleInputChange}        
         value={name} 
         placeholder="Busqueda por Raza"
         />
    </div>
    );
}

export default Searchbar;