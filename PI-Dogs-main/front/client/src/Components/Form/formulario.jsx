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

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (['añosdevida', 'añosdevida-max', 'peso', 'peso-max', 'altura', 'altura-max'].includes(name)) {
      if (!/^\d+$/.test(value)) {
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
    const empiezaConEspacio = perro.name.startsWith(" ");
    
    
    if (
      (perro['añosdevida'] !== '' && perro['añosdevida-max'] !== '' && parseInt(perro['añosdevida']) > parseInt(perro['añosdevida-max'])) ||
      (perro['peso'] !== '' && perro['peso-max'] !== '' && parseInt(perro['peso']) > parseInt(perro['peso-max'])) ||
      (perro['altura'] !== '' && perro['altura-max'] !== '' && parseInt(perro['altura']) > parseInt(perro['altura-max']))
    ) {
      alert("Los máximos no pueden ser menores que los mínimos.");
      return;
    } else if(!perro.imagen.includes(".jpg") || !perro.imagen.includes(".com/")){
      alert("Solo es valida una url que contenga una imagen de tipo jpg")
      return
    } else if (empiezaConEspacio){
      alert("El nombre no puede estar vacio")
      return
    }

    const formattedPerro = {
      name: perro.name,
      añosdevida: `${perro.añosdevida} - ${perro['añosdevida-max']} years`,
      img: perro.imagen,
      peso: `${perro.peso} - ${perro['peso-max']}`,
      altura: `${perro.altura} - ${perro['altura-max']}`,
      temperaments: perro.temperaments.join(", "),
    };
    console.log(formattedPerro      )

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
      });
  };

  return (
    <div className="create">
      <h2>Perrito nuevo!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">RAZA</label> <br />
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
          <label htmlFor="imagen">IMAGEN</label><br />
          <input
            type="text"
            id="imagen"
            name="imagen"
            value={perro.imagen}
            onChange={handleInputChange}
            required
          />
          
        </div>
        <div>
          <label htmlFor="añosdevida">AÑOS DE VIDA <br/> (mínimo - máximo)</label> <br />
          <input
            type="number"  
            id="añosdevida"
            name="añosdevida"
            placeholder="Mínimo"
            value={perro.añosdevida}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"  
            id="añosdevida-max"
            name="añosdevida-max"
            placeholder="Máximo"
            value={perro['añosdevida-max']}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="peso">PESO <br/> (mínimo - máximo)</label><br />
          <input
            type="number"  
            id="peso"
            name="peso"
            placeholder="Mínimo"
            value={perro.peso}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"  
            id="peso-max"
            name="peso-max"
            placeholder="Máximo"
            value={perro['peso-max']}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="altura">ALTURA <br/> (mínimo - máximo)</label><br />
          <input
            type="number"  
            id="altura"
            name="altura"
            placeholder="Mínimo"
            value={perro.altura}
            onChange={handleInputChange}
            required
          />
          <input
            type="number" 
            id="altura-max"
            name="altura-max"
            placeholder="Máximo"
            value={perro['altura-max']}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='formselect'>
          <label className="temperaments">TEMPERAMENTOS</label>
          <select
            id="temperaments"
            name="temperaments"
            value={perro.temperaments}
            onChange={handleTemperamentsChange}
            multiple
            required
          >
            {allTemps.map((temp) => (
              <option value={temp.name} key={temp.id} className='custom-options'>
                {temp.name}
              </option>
            ))}
          </select>
        </div>
        <div><input className='tempSeleccionados' value={perro.temperaments}></input></div>
        <button className='formboton ov-btn-grow-skew' type="submit"  >LET´S GO!</button>
      </form>
      {creacionExitosa && <div className="success-message">Perro creado con éxito</div>}
    </div>
  );
}

export default Formulario;
