import React from 'react'
import { UserContext } from "../contexts/UserContext"
import dateFormat from "dateformat"
import "./Users.css"
import "./Docs.css"

const EditProfile = () => {

    // VARIABLES
    const { user, editProfile, universidades, carreras, areas } = React.useContext(UserContext);

    // VALORES DE REGISTRO
    const [nombre, setNombre] = React.useState(user?.nombre ? user?.nombre : "");
    const [telefono, setTelefono] = React.useState(user?.telefono ? user?.telefono : "");
    const [tiempoActivo, setTiempoActivo] = React.useState(user?.tiempoActivo ? dateFormat(new Date(user?.tiempoActivo?.toDate()), "isoDate") : "");
    const [genero, setGenero] = React.useState(user?.genero ? user?.genero : "");
    const [area, setArea] = React.useState(user?.area ? user?.area : "");
    const [proyecto, setProyecto] = React.useState(user?.proyecto ? user?.proyecto : "");
    const [modalidad, setModalidad] = React.useState(user?.modalidad ? user?.modalidad : "");
    const [universidad, setUniversidad] = React.useState(user?.universidad ? user?.universidad : "");
    const [carrera, setCarrera] = React.useState(user?.carrera ? user?.carrera : "");
    const [matricula, setMatricula] = React.useState(user?.matricula ? user?.matricula : "");
    const [tipoPrestador, setTipoPrestador] = React.useState(user?.tipoPrestador ? user?.tipoPrestador : "");
    const [carreraRecorridos, setCarreraRecorridos] = React.useState(user?.carreraRecorridos ? user?.carreraRecorridos : "");
    const [institucion, setInstitucion] = React.useState(user?.institucion ? user?.institucion : "");
    const [numeroAsistentes, setNumeroAsistentes] = React.useState(user?.numeroAsistentes ? user?.numeroAsistentes : "");
    const [entregaDonativo, setEntregaDonativo] = React.useState(user?.entregaDonativo ? user?.entregaDonativo : "");
    const [desDonativo, setDesDonativo] = React.useState(user?.desDonativo ? user?.desDonativo : "");

    // SUBMIT HANDLER
    function submitHandler(e) {
        e.preventDefault()

        // Validaciones generales y administrador
        if (!nombre.trim() || nombre === "" ||
            !telefono.trim() || telefono === "") {
            alert("Debes llenar todos los campos.");
            return;
        }

        // Validaciones generales
        if (user?.tipo !== "Administrador" && (!tiempoActivo.trim() || tiempoActivo === "" ||
                                                !genero.trim() || genero === "")) {
            alert("Debes llenar todos los campos.");
            return;
        }

        // Validaciones de campo modo voluntario
        if (user?.tipo === "Voluntario" && (!area.trim() || area === "" ||
                                            !proyecto.trim() || proyecto === "" ||
                                            !modalidad.trim() || modalidad === "")) {
            alert("Debes llenar todos los campos.");
            return;
        }

        // Validaciones de campo modo voluntario
        if (user?.tipo === "Prestador" && (!area.trim() || area === "" ||
                                            !proyecto.trim() || proyecto === "" ||
                                            !modalidad.trim() || modalidad === "" ||
                                            !universidad.trim() || universidad === "" ||
                                            !carrera.trim() || carrera === "" ||
                                            !matricula.trim() || matricula === "" ||
                                            !tipoPrestador.trim() || tipoPrestador === "")) {
            alert("Debes llenar todos los campos.");
            return;
        }

        // Validaciones de campo modo investigador
        if (user?.tipo === "Investigador" && (!area.trim() || area === "" ||
                                                !proyecto.trim() || proyecto === "" ||
                                                !universidad.trim() || universidad === "" ||
                                                !carrera.trim() || carrera === "" ||
                                                !matricula.trim() || matricula === "")) {
            alert("Debes llenar todos los campos.");
            return;
        }

        // Validaciones de campo modo recorridos
        if (user?.tipo === "Recorridos" && (!carreraRecorridos.trim() || carreraRecorridos === "" ||
                                            !institucion.trim() || institucion === "" ||
                                            !numeroAsistentes.trim() || numeroAsistentes === "" ||
                                            !entregaDonativo.trim() || entregaDonativo === "" ||
                                            !desDonativo.trim() || desDonativo === "")) {
            alert("Debes llenar todos los campos.");
            return;
        }

        // Formatear tiempo
        const tiempoActivoDate = new Date(tiempoActivo.replaceAll("-", ","));

        // Editar perfil
        if (user?.tipo === "Administrador") editProfile(nombre, telefono, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

        if (user?.tipo === "Voluntario") editProfile(nombre, telefono, tiempoActivoDate, genero, area, proyecto, modalidad, null, null, matricula, null, null, null, null, null, null);

        if (user?.tipo === "Prestador") editProfile(nombre, telefono, tiempoActivoDate, genero, area, proyecto, modalidad, universidad, carrera, matricula, tipoPrestador, null, null, null, null, null);

        if (user?.tipo === "Investigador") editProfile(nombre, telefono, tiempoActivoDate, genero, area, proyecto, null, universidad, carrera, matricula, null, null, null, null, null, null);

        if (user?.tipo === "Recorridos") editProfile(nombre, telefono, tiempoActivoDate, genero, null, null, null, null, null, null, null, carreraRecorridos, institucion, numeroAsistentes, entregaDonativo, desDonativo);

    }

    return (
        <div className="home_page">
            <h1>Editar Perfil</h1>

            <div className="user_info_container">

                {/* USER INFO */}
                <form className="edit_profile_form" onSubmit={submitHandler}>

                    {/* NOMBRE */}
                    <div className="edit_item">
                        <div className="label">Nombre</div>
                        <input
                            className="form-control input"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>

                    {/* TELÉFONO */}
                    <div className="edit_item">
                        <div className="label">Teléfono</div>
                        <input
                            className="form-control input"
                            value={telefono}
                            onChange={e => setTelefono(e.target.value)}
                        />
                    </div>

                    {/* TIEPO ACTIVO */
                    user?.tipo !== "Administrador" &&
                    <div className="edit_item">
                        <div className="label">Tiempo Activo</div>
                        <input
                            type="date"
                            className="form-control input"
                            value={tiempoActivo}
                            onChange={e => setTiempoActivo(e.target.value)}
                        />
                    </div> }

                    {/* GÉNERO */
                    user?.tipo !== "Administrador" &&
                    <div className="edit_item">
                        <div className="label">Género</div>
                        <select
                            className="form-select input"
                            value={genero}
                            onChange={e => setGenero(e.target.value)}
                        >
                            <option value=""></option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div> }

                    {/* CAMPOS VOLUNTARIOS */
                    user?.tipo === "Voluntario" &&
                    <>
                        {/* ÁREA EN APAC */}
                        <div className="edit_item">
                            <div className="label">Área en APAC</div>
                            <select
                                className="form-select input"
                                value={area}
                                onChange={e => setArea(e.target.value)}
                            >
                                <option value=""></option>
                                { areas.map( (item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>

                        {/* PROYECTO */}
                        <div className="edit_item">
                            <div className="label">Proyecto en APAC</div>
                            <input
                                className="form-control input"
                                value={proyecto}
                                onChange={e => setProyecto(e.target.value)}
                            />
                        </div>

                        {/* MODALIDAD */}
                        <div className="edit_item">
                            <div className="label">Modalidad</div>
                            <select
                                className="form-select input"
                                value={modalidad}
                                onChange={e => setModalidad(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="Presencial">Presencial</option>
                                <option value="A distancia">A distancia</option>
                                <option value="Internacional">Internacional</option>
                                <option value="Por proyecto">Por proyecto</option>
                                <option value="Por fecha especial">Por fecha especial</option>
                            </select>
                        </div>
                    </>
                    }

                    {/* CAMPOS PRESTADORES */
                    user?.tipo === "Prestador" &&
                    <>
                        {/* ÁREA EN APAC */}
                        <div className="edit_item">
                            <div className="label">Área en APAC</div>
                            <select
                                className="form-select input"
                                value={area}
                                onChange={e => setArea(e.target.value)}
                            >
                                <option value=""></option>
                                { areas.map( (item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>

                        {/* PROYECTO */}
                        <div className="edit_item">
                            <div className="label">Proyecto en APAC</div>
                            <input
                                className="form-control input"
                                value={proyecto}
                                onChange={e => setProyecto(e.target.value)}
                            />
                        </div>

                        {/* MODALIDAD */}
                        <div className="edit_item">
                            <div className="label">Modalidad</div>
                            <select
                                className="form-select input"
                                value={modalidad}
                                onChange={e => setModalidad(e.target.value)}
                            >
                                <option value="Presencial">Presencial</option>
                                <option value="En línea">En línea</option>
                                <option value="Híbrida">Híbrida</option>
                            </select>
                        </div>

                        {/* UNIVERSIDAD */}
                        <div className="edit_item">
                            <div className="label">Universidad</div>
                            <select
                                className="form-select input"
                                value={universidad}
                                onChange={e => setUniversidad(e.target.value)}
                            >
                                <option value=""></option>
                                { universidades.map( (item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>

                        {/* CARRERA */}
                        <div className="edit_item">
                            <div className="label">Carrera</div>
                            <select
                                className="form-select input"
                                value={carrera}
                                onChange={e => setCarrera(e.target.value)}
                            >
                                <option value=""></option>
                                { carreras.map( (item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>

                        {/* MATRÍCULA */}
                        <div className="edit_item">
                            <div className="label">Matrícula</div>
                            <input
                                className="form-control input"
                                value={matricula}
                                onChange={e => setMatricula(e.target.value)}
                            />
                        </div>

                        {/* TIPO DE PRESTADOR */}
                        <div className="edit_item">
                            <div className="label">Tipo de Prestador</div>
                            <select
                                className="form-select input"
                                value={tipoPrestador}
                                onChange={e => setTipoPrestador(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="Prestador en Línea">Prestador en Línea</option>
                                <option value="Prestador Presencial">Prestador Presencial</option>
                                <option value="Prácticas en Línea">Prácticas en Línea</option>
                                <option value="Prácticas Presenciales">Prácticas Presenciales</option>
                            </select>
                        </div>
                    </>
                    }

                    {/* CAMPOS INVESTIGADORES */
                    user?.tipo === "Investigador" &&
                    <>
                        {/* ÁREA EN APAC */}
                        <div className="edit_item">
                            <div className="label">Área en APAC</div>
                            <select
                                className="form-select input"
                                value={area}
                                onChange={e => setArea(e.target.value)}
                            >
                                <option value=""></option>
                                { areas.map( (item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>

                        {/* PROYECTO */}
                        <div className="edit_item">
                            <div className="label">Proyecto en APAC</div>
                            <input
                                className="form-control input"
                                value={proyecto}
                                onChange={e => setProyecto(e.target.value)}
                            />
                        </div>

                        {/* UNIVERSIDAD */}
                        <div className="edit_item">
                            <div className="label">Universidad</div>
                            <select
                                className="form-select input"
                                value={universidad}
                                onChange={e => setUniversidad(e.target.value)}
                            >
                                <option value=""></option>
                                { universidades.map( (item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>

                        {/* CARRERA */}
                        <div className="edit_item">
                            <div className="label">Carrera</div>
                            <select
                                className="form-select input"
                                value={carrera}
                                onChange={e => setCarrera(e.target.value)}
                            >
                                <option value=""></option>
                                { carreras.map( (item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>

                        {/* MATRÍCULA */}
                        <div className="edit_item">
                            <div className="label">Matrícula</div>
                            <input
                                className="form-control input"
                                value={matricula}
                                onChange={e => setMatricula(e.target.value)}
                            />
                        </div>
                    </>
                    }

                    {/* CAMPOS RECORRIDOS */
                    user?.tipo === "Recorridos" &&
                    <>
                        {/* CARRERA RECORRIDOS */}
                        <div className="edit_item">
                            <div className="label">Carrera</div>
                            <input
                                className="form-control input"
                                value={carreraRecorridos}
                                onChange={e => setCarreraRecorridos(e.target.value)}
                            />
                        </div>

                        {/* INSTITUCIÓN */}
                        <div className="edit_item">
                            <div className="label">Institución</div>
                            <input
                                className="form-control input"
                                value={institucion}
                                onChange={e => setInstitucion(e.target.value)}
                            />
                        </div>

                        {/* NÚMERO ASISTENTES */}
                        <div className="edit_item">
                            <div className="label">Número de Asistentes</div>
                            <input
                                type="number"
                                className="form-control input"
                                value={numeroAsistentes}
                                onChange={e => setNumeroAsistentes(e.target.value)}
                            />
                        </div>

                        {/* ENTREGA DONATIVO */}
                        <div className="edit_item">
                            <div className="label">Entrega de Donativo</div>
                            <select
                                className="form-select input"
                                value={entregaDonativo}
                                onChange={e => setEntregaDonativo(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        {/* DESCRIPCIÓN DONATIVO */}
                        <div className="edit_item">
                            <div className="label">Descripción de Donativo</div>
                            <input
                                className="form-control input"
                                value={desDonativo}
                                onChange={e => setDesDonativo(e.target.value)}
                            />
                        </div>
                    </>
                    }

                    {/* BOTÓN EDITAR */}
                    <button className="btn btn-primary btn_edit_profile list_btn slef-align-right">
                        Editar Perfil
                        <i className="fas fa-user-edit"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile
