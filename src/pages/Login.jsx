import React from 'react'
import "./Login.css"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import { useHistory } from 'react-router'

const Register = () => {

    // VARIABLES
    const { login } = React.useContext(UserContext);
    const [error, setError] = React.useState(null);
    const errorRef = React.useRef();
    const history = useHistory();
    const [bgImg, setBgImg] = React.useState("/img/bg1.jpg");

    // VALORES DE REGISTRO
    const correo = React.useRef("");
    const contrasena = React.useRef("");

    // SUMBIT HANDLER
    async function submitHandler(e) {
        e.preventDefault();

        // Validaciones generales
        if (!correo.current.value.trim() || correo.current.value === "" ||
            !contrasena.current.value.trim() || contrasena.current.value === "") {
            setError("Debes llenar todos los campos.");
            setTimeout(() => errorRef.current.scrollIntoView(), 200);
            return;
        }

        // Validación de formato de correo
        if (!(correo.current.value.includes("@") && correo.current.value.includes("."))) {
            setError("Correo tiene un formato inválido.");
            setTimeout(() => errorRef.current.scrollIntoView(), 200);
            return;
        }
        setError(null);

        // Ingresar
        const error = await login(correo.current.value, contrasena.current.value);

        // Si hay un error
        if (error) {
            setError(error);
            setTimeout(() => errorRef.current.scrollIntoView(), 200);
            return;
        }

        // Ir a home
        history.push("/home");
    }

    // USE EFFECT
    React.useEffect(() => {
        Math.random() < 0.5 ? setBgImg("/img/bg1.jpg") : setBgImg("/img/bg2.jpg") 
    }, [])

    return (
        <div className="login">

            {/* LOGIN LEFT */}
            <div className="login_left">
                <img src={bgImg} alt="" />
                <img src="/img/waves.svg" alt="" className="waves" />
            </div>

            {/* LOGIN RIGHT */}
            <div className="login_right">

                <div className="login_right_top">
                    <img src="/img/logo_apac.png" alt="" />
                    <h1>Sistema de Servicio Social, Prácticas Profesionales y Voluntariado</h1>
                </div>

                <div className="login_right_bottom">
                    <form onSubmit={submitHandler}>
                        <h2>Ingresar</h2>

                        {/* ALERTA */
                        error && <div className="alert alert-danger" role="alert" ref={errorRef}>{error}</div>}

                        {/* CORREO */}
                        <label htmlFor="correo">Correo</label>
                        <input type="email" id="correo" ref={correo} required />

                        {/* CONTRASEÑA */}
                        <label htmlFor="contraseña">Contraseña</label>
                        <input type="password" id="contraseña" ref={contrasena} required />

                        {/* BOTONES */}
                        <button type="submit">Ingresar</button>
                        <Link to="/register" className="link"><p>¿No tienes cuenta? Registrate</p></Link>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
