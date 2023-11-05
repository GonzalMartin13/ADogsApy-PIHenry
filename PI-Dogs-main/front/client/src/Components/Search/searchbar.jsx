import { useState, } from "react";
import { useDispatch } from "react-redux";
import { traerXraza } from "../../Redux/actions"; 
import "./searchbar.css"

function Searchbar() {
    const [name, setName] = useState([]);
    const dispatch = useDispatch()
    function handleInputChange(event) {
        const {value} = event.target;
        setName(value)
        dispatch(traerXraza(value))

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