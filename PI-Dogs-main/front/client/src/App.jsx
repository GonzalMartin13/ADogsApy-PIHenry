import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./Components/Login/login";
import Container from "./Components/Cards/Container/container";
import DetailCard from "./Components/Cards/Detail/detail";
import Formulario from "./Components/Form/formulario";
import Error from "./Components/Error/error";
import Nav from "./Components/Nav/nav";
import './App.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setDogs,  } from "./Redux/actions";

function App() {
  const dispatch = useDispatch()
  const location = useLocation();
  const bodyClass = location.pathname === '/' ? 'bodylogin' : 'bodyapp';

  useEffect( () => {
    dispatch(setDogs());
  },[dispatch]);

  return (
    <div className={bodyClass}>
      {location.pathname !== '/' && <Nav />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dogs" element={<Container />} />
        <Route path="/dogs/:id" element={<DetailCard />} />
        <Route path="/create" element={<Formulario />} />
        <Route path="*" element={<Error />} />
      </Routes>
      
    </div>
  );
}

export default App;
