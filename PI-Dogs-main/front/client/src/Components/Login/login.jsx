import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { setUsuario } from "../../Redux/actions";

function Login() {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        nombre: "",
        apellido: "",
    });

    useEffect(() => {
        // Esta función se ejecutará cada vez que 'user' cambie
        dispatch(setUsuario(user));
        console.log(user);
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <>
            <div className="cuadroPrincipal">
                <h2>EL HERMOSO MUNDO <br /> DEL MEJOR AMIGO DEL HOMBRE</h2>
                <div className="imputs">
                    <input required type="text"  name="nombre" id="nombre" placeholder="Ingresa tu Nombre" value={user.nombre} onChange={handleInputChange} />
                    <input required type="text"  name="apellido" id="apellido" placeholder="Ingresa tu Apellido" value={user.apellido} onChange={handleInputChange} />
                </div>
                <Link to="/dogs">
                    <button className="loginBoton ov-btn-grow-skew">INGRESAR  </button>
                </Link>
            </div>
        </>
    );
}

export default Login;
