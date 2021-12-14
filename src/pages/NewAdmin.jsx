import React from 'react'
import {UserContext} from '../contexts/UserContext';
import {useHistory} from "react-router"
import "./Users.css"
import "./Docs.css"

const NewAdmin = () => {

    // VARIABLES
    const [nombre, setNombre] = React.useState("");
    const [correo, setCorreo] = React.useState("");
    const [contrasena, setContrasena] = React.useState("");
    const [telefono, setTelefono] = React.useState("");
    const {register} = React.useContext(UserContext);
    const history = useHistory();

    // CREAR NUEVO ADMINISTRADOR
    async function addNewAdmin(e){
        e.preventDefault();

        // Validaciones
        if (!nombre.trim() || nombre === "" ||
            !correo.trim() || correo === "" ||
            !contrasena.trim() || contrasena === "" ||
            !telefono.trim() || telefono === "" ){
            alert("Debes llenar todos los campos.");
            return;
        }

        // Validación de formato de correo
        if ( !(correo.includes("@") && correo.includes(".")) ){
            alert("Debes llenar todos los campos.");
            return;
        }

        // Registrar
        const error = await register(nombre, correo, contrasena, telefono, "Administrador", null, null, null, null, null, null, null, null, null, null, null, null, null, null);

        // Si hay error
        if (error) {
            alert(error);
            return;
        }

        // Ir a home con el nuevo usuario
        history.push("/home/mi_perfil");
    }

    return (
        <div className="home_page">
            {/* HEADER */}
            <h1>Crear Nuevo Administrador</h1>
            <h2>Llena el formulario con los datos del nuevo administrador, al crearlo se entrará a una sesión en la nueva cuenta de administrador creada por lo que despúes deberás salir y volver a entrar a tu cuenta personal.</h2>
            
            {/* FORM */}
            <div className="user_info_container">

                <form className="edit_profile_form" onSubmit={addNewAdmin}>

                    {/* NOMBRE */}
                    <div className="edit_item">
                        <div className="label">Nombre</div>
                        <input className="form-control input" value={nombre} onChange={e => setNombre(e.target.value)} required/>
                    </div>

                    {/* CORREO */}
                    <div className="edit_item">
                        <div className="label">Correo</div>
                        <input className="form-control input" value={correo} onChange={e => setCorreo(e.target.value)} required/>
                    </div>

                    {/* CONTRASEÑA */}
                    <div className="edit_item">
                        <div className="label">Constraseña</div>
                        <input className="form-control input" value={contrasena} onChange={e => setContrasena(e.target.value)} required/>
                    </div>

                    {/* TELÉFONO */}
                    <div className="edit_item">
                        <div className="label">Teléfono</div>
                        <input className="form-control input"value={telefono} onChange={e => setTelefono(e.target.value)} required/>
                    </div>

                    {/* BOTÓN CREAR */}
                    <button className="btn btn-primary btn_edit_profile list_btn slef-align-right">
                            Crear Nuevo Administrador
                            <i className="fas fa-user-plus"></i>
                    </button>

                </form>
            </div>
        </div>
    )
}

export default NewAdmin
