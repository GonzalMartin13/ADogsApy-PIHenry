import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./Components/Login/login";
import Container from "./Components/Cards/Container/container.jsx";
import DetailCard from "./Components/Cards/Detail/detail";
import Formulario from "./Components/Form/formulario";
import Nav from "./Components/Nav/nav";
import Loader from "./Components/Loader/loader";
import './App.css';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setDogs,  } from "./Redux/actions";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const bodyClass = location.pathname === '/' ? 'bodylogin' : 'bodyapp';

  const [isLoading, setIsLoading] = useState(true); // Estado para controlar el cargador

  useEffect(() => {
    dispatch(setDogs())
      .then(() => {
        // Cuando los datos se han cargado, cambia isLoading a false
        setIsLoading(false);
      })
      .catch((error) => {
        // Manejo de errores si es necesario
        console.error("Error al cargar datos:", error);
        setIsLoading(false);
      });
  }, [dispatch]);

  return (
    <div className={bodyClass}>
      {location.pathname !== '/' && <Nav />}
      {isLoading ? ( // Renderiza el cargador si isLoading es true
        <Loader/>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dogs" element={<Container />} />
          <Route path="/dogs/:id" element={<DetailCard />} />
          <Route path="/create" element={<Formulario />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
