import { useEffect } from "react";
import "./searchtemp.css";
import { useDispatch, useSelector } from "react-redux";
import { setConter, setDogs, setTemperaments, traerPorTemperamento } from "../../Redux/actions";

function SearchTemp() {
  const dispatch = useDispatch();
  const allTemps = useSelector((state) => state.temperaments);

  const handleSelectChange = (event) => {
    if (event.target.value !== "Busqueda por Temperamento"){
    dispatch(traerPorTemperamento(event.target.value));
    dispatch(setConter())
    console.log(event.target.value)
    } else {
      dispatch(setDogs());
    }
  };

  useEffect(() => {
    dispatch(setTemperaments())
    console.log(allTemps);
  }, []);

  return (
    <div >
      <select
        onChange={handleSelectChange}
        className="tempselect"
        > 
        <option> Busqueda por Temperamento</option>
        {allTemps.map((temp) => (
          <option value={temp.name} key={temp.id}> 
          {temp.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchTemp;
