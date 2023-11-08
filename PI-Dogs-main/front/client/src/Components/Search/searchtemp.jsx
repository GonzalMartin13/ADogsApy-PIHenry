import { useEffect } from "react";
import "./searchtemp.css";
import { useDispatch, useSelector } from "react-redux";
import { setTemperaments, traerPorTemperamento } from "../../Redux/actions";

function SearchTemp() {
  const dispatch = useDispatch();
  const allTemps = useSelector((state) => state.temperaments);

  const handleSelectChange = (event) => {
    dispatch(traerPorTemperamento(event.target.value));
    console.log(event.target.value)
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
