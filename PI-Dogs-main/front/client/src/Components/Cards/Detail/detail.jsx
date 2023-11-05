import { useParams, Link } from "react-router-dom";
import "./detail.css"
import axios from "axios";
import { useEffect, useState } from "react";
function DetailCard() {
    const {id} = useParams();
    const [perritoID, setPerritoID] = useState([""]);
    useEffect(() => {
        const traerID = async (id) =>{
            const {data} = await axios.get(`http://localhost:3001/dogs/${id}`)
            console.log(data)
            setPerritoID(data)
            }
        traerID(id)
        }, 
    []);

    console.log(perritoID);

    return ( 
    <div className="detail">
        <div className="img">
        <img src={perritoID[0].img} alt={perritoID[0].id} /> 
        </div>
        <div className="descripcionDetail">
             <h2>{perritoID[0].name}</h2>
             <p>Peso <br /> {perritoID[0].peso}</p>
            <p>Altura <br /> {perritoID[0].altura}</p>
            <p>Años de Vida <br /> {perritoID[0].años}</p>
            <p>Temperamentos <br /> {perritoID[0].temperamento}</p> 
            <Link to={`/dogs`}> 
                <button className="loginBoton btncardetail ov-btn-grow-skew"> Mas perritos </button>
            </Link>
        </div>
    </div> 
    );
}

export default DetailCard;