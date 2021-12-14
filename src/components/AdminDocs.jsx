import React from 'react'
import AdminDocsPres from "../pages/AdminDocsPres"
import AdminDocsVol from "../pages/AdminDocsVol"
import AdminDocsInv from "../pages/AdminDocsInv"
import AdminDocsRec from "../pages/AdminDocsRec"

const AdminDocs = () => {

    // VARIABLES
    const [userType, setUserType] = React.useState("");

    return (
        <div className="home_page">

            {/* HEADER */}
            <h1>Tipos de Usuarios</h1>
            <h2>Selecciona un tipo de usuario para ver o modificar sus documentos.</h2>
            <select className="form-select" aria-label="Default select example" value={userType} onChange={e => setUserType(e.target.value)}>
                <option value="">Selecciona tipo de usuario</option>
                <option value="Prestador">Prestadores</option>
                <option value="Voluntario">Voluntarios</option>
                <option value="Investigador">Investigadores</option>
                <option value="Recorridos">Recorridos</option>
            </select>

            {/* USER TYPES DOCS */}
            { userType === "Prestador" && <AdminDocsPres/> }
            { userType === "Voluntario" && <AdminDocsVol/> }
            { userType === "Investigador" && <AdminDocsInv/> }
            { userType === "Recorridos" && <AdminDocsRec/> }

        </div>
    )
}

export default AdminDocs
