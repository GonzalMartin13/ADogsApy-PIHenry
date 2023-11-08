
import {Link} from "react-router-dom"
import "./nav.css"
import {useDispatch, useSelector} from "react-redux"
import {setDogs} from "../../Redux/actions"

function Nav() {
    const dispatch = useDispatch()
     const handleLimpiar = () => {
        dispatch(setDogs());
        }  
    const user = useSelector(state => state.usuario)
    return (  
    <nav className="nav">
        <p>  Bienvenido {user.nombre + " " + user.apellido} al la API-Dogs </p>
        <Link to="/dogs" className="link linkcreate"> Home </Link>
        <Link to="/create" className="link linkcreate" > Crear una raza nueva </Link>
        <button onClick={handleLimpiar} className="limpiar">Limpiar Filtros</button>
    </nav>
    );
}

export default Nav;