import "./card.css";
import { Link } from "react-router-dom";

function CardPerrito(dogs) {
  const { id, img, name, peso, temperamento } = dogs.dogs;

  return (
    <Link to={`/dogs/${id}`} className="card">
      <div className="card-content">
        <h2>{name}</h2>
        <p>Peso <br /> {peso}</p>
        <p>Temperamentos <br /> {temperamento}</p>
        <p className="click-message">
          Haz clic en la imagen para ver el detalle
        </p>
      </div>
      <img src={img} alt={id} className="image" />
    </Link>
  );
}

export default CardPerrito;
