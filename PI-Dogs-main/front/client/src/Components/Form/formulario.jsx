import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTemperaments } from "../../Redux/actions";
import axios from "axios";
import "./formulario.css";

function Formulario() {
  const dispatch = useDispatch();
  const allTemps = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(setTemperaments());
  }, []);

  const [perro, setPerro] = useState({
    name: '',
    añosdevida: '',
    'añosdevida-max': '',
    imagen: '',
    peso: '',
    'peso-max': '',
    altura: '',
    'altura-max': '',
    temperaments: [],
  });

  const [creacionExitosa, setCreacionExitosa] = useState(false);
  const [errores, setErrores] = useState({
    imagen: false,
    añosdevida: false,
    peso: false,
    altura: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Validación para campos de años, peso y altura
    if (['añosdevida', 'añosdevida-max', 'peso', 'peso-max', 'altura', 'altura-max'].includes(name)) {
      if (!/^\d+$/.test(value)) {
        // Solo se permiten números
        return;
      }
    }

    setPerro({ ...perro, [name]: value });
  };

  const handleTemperamentsChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setPerro({ ...perro, temperaments: selectedOptions });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificación de error para máximos menores que mínimos
    if (
      (perro['añosdevida'] !== '' && perro['añosdevida-max'] !== '' && parseInt(perro['añosdevida']) > parseInt(perro['añosdevida-max'])) ||
      (perro['peso'] !== '' && perro['peso-max'] !== '' && parseInt(perro['peso']) > parseInt(perro['peso-max'])) ||
      (perro['altura'] !== '' && perro['altura-max'] !== '' && parseInt(perro['altura']) > parseInt(perro['altura-max']))
    ) {
      alert("Los máximos no pueden ser menores que los mínimos.");
      return;
    }

    const formattedPerro = {
      name: perro.name,
      añosdevida: `${perro.añosdevida} - ${perro['añosdevida-max']} years`,
      img: perro.imagen,
      peso: `${perro.peso} - ${perro['peso-max']}`,
      altura: `${perro.altura} - ${perro['altura-max']}`,
      temperaments: perro.temperaments.join(", "),
    };

    axios.post('http://localhost:3001/postdogs/', formattedPerro)
      .then((response) => {
        console.log("Perro creado con éxito:", response.data);
        setCreacionExitosa(true);
        setPerro({
          name: '',
          añosdevida: '',
          'añosdevida-max': '',
          imagen: '',
          peso: '',
          'peso-max': '',
          altura: '',
          'altura-max': '',
          temperaments: [],
        });
      })
      .catch((error) => {
        console.error("Error al crear el perro:", error);
        // Manejar errores aquí
      });
  };

  return (
    <div className="create">
      <h2>Perrito nuevo!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Raza</label> <br />
          <input
            type="text"
            id="name"
            name="name"
            value={perro.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="imagen">Imagen:</label><br />
          <input
            type="text"
            id="imagen"
            name="imagen"
            value={perro.imagen}
            onChange={handleInputChange}
            required
            className={errores.imagen ? 'error' : ''}
          />
          {errores.imagen && <span className="error-message">Ingrese una URL de imagen válida (jpg, gif, png).</span>}
        </div>
        <div>
          <label htmlFor="añosdevida">Años de vida (mínimo - máximo)</label> <br />
          <input
            type="number"  // Cambio de 'text' a 'number'
            id="añosdevida"
            name="añosdevida"
            placeholder="Mínimo"
            value={perro.añosdevida}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"  // Cambio de 'text' a 'number'
            id="añosdevida-max"
            name="añosdevida-max"
            placeholder="Máximo"
            value={perro['añosdevida-max']}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="peso">Peso (mínimo - máximo)</label><br />
          <input
            type="number"  // Cambio de 'text' a 'number'
            id="peso"
            name="peso"
            placeholder="Mínimo"
            value={perro.peso}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"  // Cambio de 'text' a 'number'
            id="peso-max"
            name="peso-max"
            placeholder="Máximo"
            value={perro['peso-max']}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="altura">Altura (mínimo - máximo)</label><br />
          <input
            type="number"  // Cambio de 'text' a 'number'
            id="altura"
            name="altura"
            placeholder="Mínimo"
            value={perro.altura}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"  // Cambio de 'text' a 'number'
            id="altura-max"
            name="altura-max"
            placeholder="Máximo"
            value={perro['altura-max']}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="temperaments">Temperamentos</label>
          <select
            id="temperaments"
            name="temperaments"
            value={perro.temperaments}
            onChange={handleTemperamentsChange}
            multiple
            required
            className='formselect'
          >
            {allTemps.map((temp) => (
              <option value={temp.name} key={temp.id}>
                {temp.name}
              </option>
            ))}
          </select>
        </div>
        <button className='formboton' type="submit">Crear</button>
      </form>
      {creacionExitosa && <div className="success-message">Perro creado con éxito</div>}
    </div>
  );
}

export default Formulario;
