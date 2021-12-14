import React from 'react'
import {UserContext} from "../contexts/UserContext"
import {auth} from "../firebase"
import {useHistory} from 'react-router'

const ChangePassword = () => {

    // VARIABLES
    const {user} = React.useContext(UserContext);
    const [contrasenaActual, setContrasenaActual] = React.useState("");
    const [nuevaContrasena, setNuevaContrasena] = React.useState("");
    const history = useHistory();

    // CAMBIAR CONTRASEÑA
    async function changePassword(e){
        e.preventDefault();
        try{
            // Validaciones
            if (!contrasenaActual.trim() || contrasenaActual === "" ||
                !nuevaContrasena.trim() || nuevaContrasena === "" ){
                alert("Debes llenar todos los campos.");
                return;
            }

            // Verificación de contraseña actual
            await auth.signInWithEmailAndPassword(user?.correo, contrasenaActual);

            // Actualización de nueva contraseña
            await auth.currentUser.updatePassword(nuevaContrasena);

            // Ir a perfil
            history.push("/home/mi_perfil");
        }
        catch(error){
            console.log("CHANGE PASSWORD ERROR:", error);
            switch(error.code){
                case "auth/wrong-password": alert("La contraseña ingresada es incorrecta"); break;
                case "auth/weak-password": alert("La nueva contraseña debe tener mínimo 6 caracteres."); break;
                default: alert("Hubo un problema con la actualización de la nueva contraseña, intentalo otra vez.");
            }
        }
    }

    return (
        <div className="home_page">
            <h1>Cambiar Contraseña</h1>
            <h2>Aquí podrás cambiar tu contraseña.</h2>

            {/* FORM */}
            <div className="user_info_container">

                <form className="edit_profile_form" onSubmit={changePassword}>

                    {/* CONTRASEÑA ACTUAL */}
                    <div className="edit_item">
                        <div className="label">Constraseña Actual</div>
                        <input className="form-control input" value={contrasenaActual} onChange={e => setContrasenaActual(e.target.value)} required/>
                    </div>

                    {/* NUEVA CONTRASEÑA */}
                    <div className="edit_item">
                        <div className="label">Nueva Constraseña</div>
                        <input className="form-control input" value={nuevaContrasena} onChange={e => setNuevaContrasena(e.target.value)} required/>
                    </div>

                    {/* BOTÓN CAMBIAR CONTRASEÑA */}
                    <button className="btn btn-primary btn_edit_profile list_btn slef-align-right" type="submit">
                        Cambiar Contraseña
                        <i className="fas fa-user-edit"></i>
                    </button>

                </form>
            </div>
        </div>
    )
}

export default ChangePassword
