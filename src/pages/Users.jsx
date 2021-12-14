import React from 'react'
import {UserContext} from "../contexts/UserContext"
import {AdminContext} from "../contexts/AdminContext"
import {Link} from "react-router-dom"
import "./Users.css"

const Users = () => {

    // VARIABLES
    const {areas, universidades, carreras} = React.useContext(UserContext);
    const {findUsers} = React.useContext(AdminContext);
    const [usuarios, setUsuarios] = React.useState([]);
    const [showDataResultados, setShowDataResultados] = React.useState(false);
    const [showCorreos, setShowCorreos] = React.useState(false);
    const [textoCorreos, setTextoCorreos] = React.useState("");

    // CAMPOS DE FILTRACIÓN Y OPCIONES
    const camposData = {
        Administrador: {
            campos: [
                {nombre: "nombre", titulo: "Nombre"},
                {nombre: "correo", titulo: "Correo"},
                {nombre: "uid", titulo: "ID de usuario"},
                {nombre: "telefono", titulo: "Teléfono"}
            ]
        },
        Voluntario: {
            campos: [
                {nombre: "nombre", titulo: "Nombre"},
                {nombre: "correo", titulo: "Correo"},
                {nombre: "uid", titulo: "ID de usuario"},
                {nombre: "telefono", titulo: "Teléfono"},
                {nombre: "genero", titulo: "Género"},
                {nombre: "area", titulo: "Área en APAC"},
                {nombre: "proyecto", titulo: "Proyecto en APAC"},
                {nombre: "modalidad", titulo: "Modalidad"}
            ],
            genero: ["Masculino", "Femenino"],
            area: areas,
            modalidad: ["Presencial", "A distancia", "Internacional", "Por proyecto", "Por fecha especial"]
        },
        Prestador: {
            campos: [
                {nombre: "nombre", titulo: "Nombre"},
                {nombre: "correo", titulo: "Correo"},
                {nombre: "uid", titulo: "ID de usuario"},
                {nombre: "telefono", titulo: "Teléfono"},
                {nombre: "genero", titulo: "Género"},
                {nombre: "area", titulo: "Área en APAC"},
                {nombre: "proyecto", titulo: "Proyecto en APAC"},
                {nombre: "modalidad", titulo: "Modalidad"},
                {nombre: "universidad", titulo: "Universidad"},
                {nombre: "carrera", titulo: "Carrera"},
                {nombre: "matricula", titulo: "Matrícula de Universidad"},
                {nombre: "tipoPrestador", titulo: "Tipo de Prestador"}
            ],
            genero: ["Masculino", "Femenino"],
            area: areas,
            modalidad: ["Presencial", "En línea", "Híbrida"],
            universidad: universidades,
            carrera: carreras,
            tipoPrestador: ["Prestador en Línea", "Prestador Presencial", "Prácticas en Línea", "Prácticas Presenciales"]
        },
        Investigador: {
            campos: [
                {nombre: "nombre", titulo: "Nombre"},
                {nombre: "correo", titulo: "Correo"},
                {nombre: "uid", titulo: "ID de usuario"},
                {nombre: "telefono", titulo: "Teléfono"},
                {nombre: "genero", titulo: "Género"},
                {nombre: "area", titulo: "Área en APAC"},
                {nombre: "proyecto", titulo: "Proyecto en APAC"},
                {nombre: "universidad", titulo: "Universidad"},
                {nombre: "carrera", titulo: "Carrera"},
                {nombre: "matricula", titulo: "Matrícula de Universidad"},
            ],
            genero: ["Masculino", "Femenino"],
            area: areas,
            universidad: universidades,
            carrera: carreras
        },
        Recorridos: {
            campos: [
                {nombre: "nombre", titulo: "Nombre"},
                {nombre: "correo", titulo: "Correo"},
                {nombre: "uid", titulo: "ID de usuario"},
                {nombre: "telefono", titulo: "Teléfono"},
                {nombre: "genero", titulo: "Género", opciones: ["Masculino", "Femenino"]},
                {nombre: "carreraRecorridos", titulo: "Carrera"},
                {nombre: "institucion", titulo: "Institución"},
                {nombre: "numeroAsistentes", titulo: "Número de Asistentes"},
                {nombre: "entregaDonativo", titulo: "Entrega de Donativo"},
                {nombre: "desDonativo", titulo: "Descripción de Dontativo"}
            ],
            genero: ["Masculino", "Femenino"],
        }
    }
    
    // VARIABLES FILTRO
    const [tipo, setTipo] = React.useState("Administrador");
    const [actividad, setActividad] = React.useState("todos");
    const [tipoFlitracion, setTipoFlitracion] = React.useState("porcampo");
    const [universidad, setUniversidad] = React.useState(universidades[0]);
    const [carrera, setCarrera] = React.useState(carreras[0]);
    const [campo, setCampo] = React.useState("sincampo");
    const [valor, setValor] = React.useState("");

    // SUBMIT HANDLER
    async function submitHandler(e){
        e.preventDefault();

        // Cerrar correos
        setShowCorreos(false);

        // Validaciones
        if (!tipo.trim() || tipo === "" ||
            !actividad.trim() || actividad === "" ||
            !tipoFlitracion.trim() || tipoFlitracion === "" ||
            !universidad.trim() || universidad === "" ||
            !carrera.trim() || carrera === "" ||
            !campo.trim() || campo === "" ){
            alert("Debes llenar todos los campos.");
            return;
        }

        if (campo !== "sincampo" && ( !valor.trim() || valor === "" )){
            alert("Debes llenar todos los campos.");
            return;
        }

        // Settear resultados de búsqueda
        const resultados = await findUsers(tipo, actividad, tipoFlitracion, universidad, carrera, campo, valor);
        setUsuarios(resultados);
        setShowDataResultados(true);
    }

    // CREATE CORREOS - Crea un string de correos de los usuarios
    function createCorreos(){
        // Iniciar string de correos
        var textoCorreos = "";

        // Iterar sobre los usuarios
        usuarios.forEach( usuario => {
            textoCorreos += `${usuario.correo}; `;
        })

        // Settear texto
        setTextoCorreos(textoCorreos);

        // Mostrar correos
        setShowCorreos(true);
    }

    return (
        <div className="home_page">
            {/* HEADER */}
            <h1>Usuarios</h1>
            <h2>En esta sección se podrán ver y filtrar los usuarios, también se puede obtener la lista de correos de la filtración.</h2>

            {/* FILTRO */}
            <form className="filtro" onSubmit={submitHandler}>

                <div className="flitro_nivel">

                    {/* TIPO DE USUARIO */}
                    <div className="filtro_campo">
                        <p className="filtro_campo_nombre">Tipo de Usuario</p>
                        <select className="form-select" value={tipo} onChange={(e) => {
                            const value = e.target.value;
                            setTipo(value);
                            if (value === "Administrador" || value === "Voluntario" || value === "Recorridos") setTipoFlitracion("porcampo");
                            if (value === "Administrador") setActividad("todos");
                        }}>
                            <option value="Administrador">Administrador</option>
                            <option value="Voluntario">Voluntario</option>
                            <option value="Prestador">Prestador</option>
                            <option value="Investigador">Investigador</option>
                            <option value="Recorridos">Recorridos</option>
                        </select>
                    </div>

                    {/* ACTIVIDAD */
                    tipo !== "Administrador" &&
                    <div className="filtro_campo">
                        <p className="filtro_campo_nombre">Actividad</p>
                        <select className="form-select" value={actividad} onChange={e => setActividad(e.target.value)}>
                            <option value="todos">Todos</option>
                            <option value="activos">Usuarios Activos</option>
                        </select>
                    </div> }

                    {/* TIPO DE FILTRACIÓN */
                    ( tipo === "Prestador" || tipo === "Investigador" ) &&
                    <div className="filtro_campo">
                        <p className="filtro_campo_nombre">Tipo de Filtración</p>
                        <select className="form-select" value={tipoFlitracion} onChange={e => setTipoFlitracion(e.target.value)}>
                            <option value="porcampo">Por Campo</option>
                            <option value="compuesta">Compuesta</option>
                        </select>
                    </div> }

                </div>

                <div className="flitro_nivel">

                    {/* CAMPOS COMPUESTOS */
                    tipoFlitracion === "compuesta" && ( tipo === "Prestador" || tipo === "Investigador" ) &&
                    <>
                        {/* UNIVERSIDAD */}
                        <div className="filtro_campo">
                            <p className="filtro_campo_nombre">Universidad</p>
                            <select className="form-select" value={universidad} onChange={e => setUniversidad(e.target.value)}>
                                { universidades.map( (item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>

                        {/* CARRERA */}
                        <div className="filtro_campo">
                            <p className="filtro_campo_nombre">Carrera</p>
                            <select className="form-select" value={carrera} onChange={e => setCarrera(e.target.value)}>
                                { carreras.map( (item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </> }

                    {/* CAMPO */}
                    <div className="filtro_campo">
                        <p className="filtro_campo_nombre">Campo</p>
                        <select className="form-select" value={campo} onChange={e => setCampo(e.target.value)}>
                            <option value="sincampo">Sin Campo</option>
                            { camposData[tipo].campos.map( (item, index) => (
                                <option value={item.nombre} key={index}>{item.titulo}</option>
                            ))}
                        </select>
                    </div>
                        
                    {/* VALOR SELECT */
                    campo !== "sincampo" && camposData[tipo][campo] &&
                    <div className="filtro_campo">
                        <p className="filtro_campo_nombre">Valor</p>
                        <select className="form-select" value={valor} onChange={e => setValor(e.target.value)}>
                            <option value=""></option>
                            { camposData[tipo][campo].map( (item, index) => (
                                <option value={item} key={index}>{item}</option>
                            ))}
                        </select>
                    </div> }
                     
                    {/* VALOR TEXT */
                    campo !== "sincampo" && !camposData[tipo][campo] &&
                    <div className="filtro_campo">
                        <p className="filtro_campo_nombre">Valor</p>
                        <input className="form-control filtro_input" value={valor} onChange={e => setValor(e.target.value)}/>
                    </div> }

                </div>
                
                {/* BUTTON */}
                <button className="btn btn-primary filtro_boton" type="submit">Buscar</button>

                {/* CREAR NUEVO ADMINISTRADOR */
                tipo === "Administrador" && 
                <Link to="/home/admin/nuevo_admin">
                    <button className="btn btn-outline-primary filtro_boton btn_crear_admin" type="button">Nuevo Administrador</button>
                </Link> }

            </form>

            {/* USERS DATA RESULTADOS */
            showDataResultados && 
            <div className="users_data_resultados">

                {/* TABLA DE USUARIOS */}
                <ul className="list-group tabla_usuarios">
                    <li className="list-group-item tabla_item titulo">
                        <div className="texto numero">#</div>
                        <div className="texto nombre">Nombre</div>
                        <div className="texto correo">Correo</div>
                        <div className="texto tipo">Tipo</div>
                    </li>

                    { usuarios.map( (usuario, index) => (
                    <Link to={`/home/admin/usuario/${usuario?.tipo}/${usuario?.uid}`} className="table_link" key={index}>
                        <li className="list-group-item tabla_item">
                            <div className="texto numero">{index + 1}</div>
                            <div className="texto nombre">{usuario?.nombre}</div>
                            <div className="texto correo">{usuario?.correo}</div>
                            <div className="texto tipo">{usuario?.tipo}</div>
                        </li>
                    </Link>
                    ))}
                </ul>

                {/* COPIA DE CORREOS */}
                <div className="lista_correos">
                    { showCorreos ?
                    <>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => setShowCorreos(false)}>Cerrar Correos</button>
                        <div className="card">{textoCorreos}</div>
                    </>
                    :
                    <button className="btn btn-outline-primary btn-sm" onClick={createCorreos}>Ver Correos</button> }
                </div>
            </div> }

        </div>
    )
}

export default Users
