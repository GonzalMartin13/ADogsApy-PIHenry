import "./card.css";
import {Link} from "react-router-dom";
function CardPerrito(dogs) {
    const {id, img, name, peso, temperamento } = dogs.dogs

    return (
    <div className="card">
        <img src={img} alt={id} />
        <div>
            <h2> {name}</h2>
            <p>Peso: {peso}</p>
            <p>Temperamentos: {temperamento}</p>
            <Link to={`/dogs/${id}`}> <button className=" botonCard ov-btn-grow-skew"> Ver Mas </button></Link>
        </div>
    </div>
    )

}

export default CardPerrito;