import React from 'react'
import "./Login.css"
import {Link} from "react-router-dom"
import {UserContext} from "../contexts/UserContext"
import {useHistory} from "react-router"

const Register = () => {

    // VARIABLES
    const {register, universidades, carreras, areas} = React.useContext(UserContext);
    const [error, setError] = React.useState(null);
    const errorRef = React.useRef();
    const history = useHistory();
    const [bgImg, setBgImg] = React.useState("/img/bg1.jpg");

    // VALORES DE REGISTRO
    const [nombre, setNombre] = React.useState("");
    const [correo, setCorreo] = React.useState("");
    const [contrasena, setContrasena] = React.useState("");
    const [telefono, setTelefono] = React.useState("");
    const [tipo, setTipo] = React.useState("");
    const [tiempoActivo, setTiempoActivo] = React.useState("");
    const [genero, setGenero] = React.useState("");
    const [area, setArea] = React.useState("");
    const [proyecto, setProyecto] = React.useState("");
    const [modalidad, setModalidad] = React.useState("");
    const [universidad, setUniversidad] = React.useState("");
    const [carrera, setCarrera] = React.useState("");
    const [matricula, setMatricula] = React.useState("");
    const [tipoPrestador, setTipoPrestador] = React.useState("");
    const [carreraRecorridos, setCarreraRecorridos] = React.useState("");
    const [institucion, setInstitucion] = React.useState("");
    const [numeroAsistentes, setNumeroAsistentes] = React.useState("");
    const [entregaDonativo, setEntregaDonativo] = React.useState("");
    const [desDonativo, setDesDonativo] = React.useState("");

    // SUMBIT HANDLER
    async function submitHandler(e){
        e.preventDefault();

        // Validaciones generales
        if (!nombre.trim() || nombre === "" ||
            !correo.trim() || correo === "" ||
            !contrasena.trim() || contrasena === "" ||
            !telefono.trim() || telefono === "" ||
            !tipo.trim() || tipo === "" ||
            !tiempoActivo.trim() || tiempoActivo === "" ||
            !genero.trim() || genero === "" ){
            setError("Debes llenar todos los campos.");
            setTimeout(() => errorRef.current.scrollIntoView(), 200);
            return;
        }

        // Validaciones de campo modo voluntario
        if ( tipo === "Voluntario" && (!area.trim() || area === "" ||
                                        !proyecto.trim() || proyecto === "" ||
                                        !modalidad.trim() || modalidad === "")){
            setError("Debes llenar todos los campos.");
            setTimeout(() => errorRef.current.scrollIntoView(), 200);
            return;
        }

        // Validaciones de campo modo voluntario
        if ( tipo === "Prestador" && (!area.trim() || area === "" ||
                                        !proyecto.trim() || proyecto === "" ||
                                        !modalidad.trim() || modalidad === "" ||
                                        !universidad.trim() || universidad === "" ||
                                        !carrera.trim() || carrera === "" ||
                                        !matricula.trim() || matricula === "" ||
                                        !tipoPrestador.trim() || tipoPrestador === "")){
            setError("Debes llenar todos los campos.");
            setTimeout(() => errorRef.current.scrollIntoView(), 200);
            return;
        }

        // Validaciones de campo modo investigador
        if ( tipo === "Investigador" && (!area.trim() || area === "" ||
                                        !proyecto.trim() || proyecto === "" ||
                                        !universidad.trim() || universidad === "" ||
                                        !carrera.trim() || carrera === "" ||
                                        !matricula.trim() || matricula === "")){
            setError("Debes llenar todos los campos.");
            setTimeout(() => errorRef.current.scrollIntoView(), 200);
            return;
        }

        // Validaciones de campo modo recorridos
        if ( tipo === "Recorridos" && (!carreraRecorridos.trim() || carreraRecorridos === "" ||
                                        !institucion.trim() || institucion === "" ||
                                        !numeroAsistentes.trim() || numeroAsistentes === "" ||
                                        !entregaDonativo.trim() || entregaDonativo === "" ||
                                        !desDonativo.trim() || desDonativo === "")){
            setError("Debes llenar todos los campos.");
            setTimeout(() => errorRef.current.scrollIntoView(), 200);
            return;
        }

        // Validación de formato de correo
        if ( !(correo.includes("@") && correo.includes(".")) ){
            setError("El correo tiene un formato inválido.");
            setTimeout(() => errorRef.current.scrollIntoView(), 200);
            return;
        }
        setError(null);

        // Registrar
        var error = null;

        if (tipo === "Voluntario") 
            error = await register(nombre, correo, contrasena, telefono, tipo, tiempoActivo, genero, area, proyecto, modalidad, null, null, null, null, null, null, null, null, null);

        if (tipo === "Prestador")
            error = await register(nombre, correo, contrasena, telefono, tipo, tiempoActivo, genero, area, proyecto, modalidad, universidad, carrera, matricula, tipoPrestador, null, null, null, null, null);

        if (tipo === "Investigador")
            error = await register(nombre, correo, contrasena, telefono, tipo, tiempoActivo, genero, area, proyecto, null, universidad, carrera, matricula, null, null, null, null, null, null);

        if (tipo === "Recorridos")
            error = await register (nombre, correo, contrasena, telefono, tipo, tiempoActivo, genero, null, null, null, null, null, null, null, carreraRecorridos, institucion, numeroAsistentes, entregaDonativo, desDonativo);

        // Si hay un error
        if (error){
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
                <img src="/img/waves.svg" alt="" className="waves"/>
            </div>

            {/* LOGIN RIGHT */}
            <div className="login_right register_right">

                <div className="login_right_top">
                    <img src="/img/logo_apac.png" alt="" />
                    <h1>Sistema de Servicio Social, Prácticas Profesionales y Voluntariado</h1>
                </div>

                <div className="login_right_bottom register_right_bottom">
                    <form onSubmit={submitHandler}>
                        <h2>Registro</h2>

                        {/* ALERTA */
                        error && <div className="alert alert-danger" role="alert" ref={errorRef}>{error}</div> }

                        {/* NOMBRE */}
                        <label htmlFor="nombre">Nombre</label>
                        <input id="nombre" autoFocus value={nombre} onChange={e => setNombre(e.target.value)} required/>
                        
                        {/* CORREO */}
                        <label htmlFor="correo">Correo</label>
                        <input type="email" id="correo" value={correo} onChange={e => setCorreo(e.target.value)} required/>

                        {/* CONTRASEÑA */}
                        <label htmlFor="contraseña">Contraseña</label>
                        <input id="contraseña" value={contrasena} onChange={e => setContrasena(e.target.value)} required/>

                        {/* TELÉFONO */}
                        <label htmlFor="telefono">Teléfono</label>
                        <input id="telefono" value={telefono} onChange={e => setTelefono(e.target.value)} required/>

                        {/* TIPO DE USUARIO */}
                        <label htmlFor="tipo">Tipo de Usuario</label>
                        <select id="tipo" value={tipo} onChange={e => setTipo(e.target.value)} required>
                            <option value=""></option>
                            <option value="Voluntario">Voluntario</option>
                            <option value="Prestador">Prestador (Alumno de Universidad)</option>
                            <option value="Investigador">Investigador</option>
                            <option value="Recorridos">Recorridos</option>
                        </select>

                        {/* TIEMPO ACTIVO */}
                        <label htmlFor="tiempoActivo">Tiempo Activo</label>
                        <input type="date" id="tiempoActivo" value={tiempoActivo} onChange={e => setTiempoActivo(e.target.value)} required/>

                        {/* GÉNERO */}
                        <label htmlFor="genero">Género</label> 
                        <select id="genero" value={genero} onChange={e => setGenero(e.target.value)} required>
                            <option value=""></option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>

                        {/* CAMPOS PARA VOLUNTARIOS */
                        tipo === "Voluntario" &&
                            <>
                                {/* ÁREA DE APAC */}
                                <label htmlFor="area">Área en APAC</label> 
                                <select id="area" value={area} onChange={e => setArea(e.target.value)} required>
                                    <option value=""></option>
                                    { areas.map( (item, index) => (
                                        <option value={item} key={index}>{item}</option>
                                    ))}
                                </select>

                                {/* PROYECTO */}
                                <label htmlFor="proyecto">Proyecto en APAC</label>
                                <input id="proyecto" value={proyecto} onChange={e => setProyecto(e.target.value)} required/>

                                {/* MODALIDAD */}
                                <label htmlFor="modalidad">Modalidad</label> 
                                <select id="modalidad" value={modalidad} onChange={e => setModalidad(e.target.value)} required>
                                    <option value=""></option>
                                    <option value="Presencial">Presencial</option>
                                    <option value="A distancia">A distancia</option>
                                    <option value="Internacional">Internacional</option>
                                    <option value="Por proyecto">Por proyecto</option>
                                    <option value="Por fecha especial">Por fecha especial</option>
                                </select>
                            </>
                        }

                        {/* CAMPOS PARA PRESTADORES */
                        tipo === "Prestador" &&
                            <>
                                {/* ÁREA DE APAC */}
                                <label htmlFor="area">Área en APAC</label> 
                                <select id="area" value={area} onChange={e => setArea(e.target.value)} required>
                                    <option value=""></option>
                                    { areas.map( (item, index) => (
                                        <option value={item} key={index}>{item}</option>
                                    ))}
                                </select>

                                {/* PROYECTO */}
                                <label htmlFor="proyecto">Proyecto en APAC</label>
                                <input id="proyecto" value={proyecto} onChange={e => setProyecto(e.target.value)} required/>

                                {/* MODALIDAD */}
                                <label htmlFor="modalidad">Modalidad</label> 
                                <select id="modalidad" value={modalidad} onChange={e => setModalidad(e.target.value)} required>
                                    <option value=""></option>
                                    <option value="Presencial">Presencial</option>
                                    <option value="En línea">En línea</option>
                                    <option value="Híbrida">Híbrida</option>
                                </select>

                                {/* UNIVERSIDAD */}
                                <label htmlFor="universidad">Universidad</label> 
                                <select id="universidad" value={universidad} onChange={e => setUniversidad(e.target.value)} required>
                                    <option value=""></option>
                                    { universidades.map( (item, index) => (
                                        <option value={item} key={index}>{item}</option>
                                    ))}
                                </select>

                                {/* CARRERA */}
                                <label htmlFor="carrera">Carrera</label> 
                                <select id="carrera" value={carrera} onChange={e => setCarrera(e.target.value)} required>
                                    <option value=""></option>
                                    { carreras.map( (item, index) => (
                                        <option value={item} key={index}>{item}</option>
                                    ))}
                                </select>

                                {/* MATRÍCULA */}
                                <label htmlFor="telefono">Matrícula de Universidad</label>
                                <input id="matricula" value={matricula} onChange={e => setMatricula(e.target.value)} required/>

                                {/* TIPO DE PRESTADOR */}
                                <label htmlFor="tipoPrestador">Tipo de Prestador</label> 
                                <select id="tipoPrestador" value={tipoPrestador} onChange={e => setTipoPrestador(e.target.value)} required>
                                    <option value=""></option>
                                    <option value="Prestador en Línea">Prestador en Línea</option>
                                    <option value="Prestador Presencial">Prestador Presencial</option>
                                    <option value="Prácticas en Línea">Prácticas en Línea</option>
                                    <option value="Prácticas Presenciales">Prácticas Presenciales</option>
                                </select>
                            </>
                        }

                        {/* CAMPOS PARA INVESTIGADORES */
                        tipo === "Investigador" &&
                            <>
                                {/* ÁREA DE APAC */}
                                <label htmlFor="area">Área en APAC</label> 
                                <select id="area" value={area} onChange={e => setArea(e.target.value)} required>
                                    <option value=""></option>
                                    { areas.map( (item, index) => (
                                        <option value={item} key={index}>{item}</option>
                                    ))}
                                </select>

                                {/* PROYECTO */}
                                <label htmlFor="proyecto">Proyecto en APAC</label>
                                <input id="proyecto" value={proyecto} onChange={e => setProyecto(e.target.value)} required/>

                                {/* UNIVERSIDAD */}
                                <label htmlFor="universidad">Universidad</label> 
                                <select id="universidad" value={universidad} onChange={e => setUniversidad(e.target.value)} required>
                                    <option value=""></option>
                                    { universidades.map( (item, index) => (
                                        <option value={item} key={index}>{item}</option>
                                    ))}
                                </select>

                                {/* CARRERA */}
                                <label htmlFor="carrera">Carrera</label> 
                                <select id="carrera" value={carrera} onChange={e => setCarrera(e.target.value)} required>
                                    <option value=""></option>
                                    { carreras.map( (item, index) => (
                                        <option value={item} key={index}>{item}</option>
                                    ))}
                                </select>

                                {/* MATRÍCULA */}
                                <label htmlFor="telefono">Matrícula de Universidad</label>
                                <input id="matricula" value={matricula} onChange={e => setMatricula(e.target.value)} required/>
                            </>
                        }

                        {/* CAMPOS PARA RECORRIDOS */
                        tipo === "Recorridos" &&
                            <>
                                {/* CARRERA RECORRIDOS */}
                                <label htmlFor="carreraRecorridos">Carrera</label>
                                <input id="carreraRecorridos" value={carreraRecorridos} onChange={e => setCarreraRecorridos(e.target.value)} required/>

                                {/* INSTITUCIÓN */}
                                <label htmlFor="institucion">Institución</label>
                                <input id="institucion" value={institucion} onChange={e => setInstitucion(e.target.value)} required/>

                                {/* NUMERO ASISTENTES */}
                                <label htmlFor="numeroAsistentes">Número de Asistentes</label>
                                <input type="number" id="numeroAsistentes" value={numeroAsistentes} onChange={e => setNumeroAsistentes(e.target.value)} required/>

                                {/* ENTREGA DONATIVO */}
                                <label htmlFor="entregaDonativo">Entrega de Donativo</label> 
                                <select id="entregaDonativo" value={entregaDonativo} onChange={e => setEntregaDonativo(e.target.value)} required>
                                    <option value=""></option>
                                    <option value="Si">Si</option>
                                    <option value="No">No</option>
                                </select>

                                {/* DESCRIPCIÓN DONATIVO */}
                                <label htmlFor="desDonativo">Descripción de Donativo</label>
                                <input id="desDonativo" value={desDonativo} onChange={e => setDesDonativo(e.target.value)} required/>
                            </>
                        }
                        
                        {/* BOTONES */}
                        <button type="submit">Registrarse</button>
                        <Link to="/login" className="link"><p>¿Ya tienes cuenta? Ingresa</p></Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
