import React from 'react'
import {NavLink} from "react-router-dom"
import {UserContext} from "../contexts/UserContext"

const Sidebar = () => {

    // VARIABLES
    const {user, signOut} = React.useContext(UserContext);

    return (
        <div className="sidebar">
            {/* TOP */}
            <div className="sb_top">
                <img src="/img/logo_apac.png" alt="" />
            </div>

            {/* MIDDLE */}
            <div className="sb_middle">

                {/* MODO ADMIN O VOLUNTARIO */
                user?.tipo === "Administrador" ?

                    // ADMIN
                    <>
                        <NavLink to="/home/mi_perfil" className="sb_navlink">
                            <div className="sb_item">
                                <i className="fas fa-user"></i>
                                <p>Mi Perfil</p>
                            </div>
                        </NavLink>
                        <NavLink to="/home/admin/usuarios" className="sb_navlink">
                            <div className="sb_item">
                                <i className="fas fa-users"></i>
                                <p>Usuarios</p>
                            </div>
                        </NavLink>
                        <NavLink to="/home/admin/reportes" className="sb_navlink">
                            <div className="sb_item">
                                <i className="fas fa-chart-bar"></i>
                                <p>Reportes</p>
                            </div>
                        </NavLink>
                        <NavLink to="/home/admin/docs" className="sb_navlink">
                            <div className="sb_item">
                                <i className="fas fa-folder"></i>
                                <p>Documentos</p>
                            </div>
                        </NavLink>
                        <NavLink to="/home/admin/listas" className="sb_navlink">
                            <div className="sb_item">
                                <i className="fas fa-sitemap"></i>
                                <p>Listas</p>
                            </div>
                        </NavLink>
                    </>
                    :
                    // VOLUNTARIO
                    <>
                        <NavLink to="/home/mi_perfil" className="sb_navlink">
                            <div className="sb_item">
                                <i className="fas fa-user"></i>
                                <p>Mi Perfil</p>
                            </div>
                        </NavLink>
                        <NavLink to="/home/docs_iniciales" className="sb_navlink">
                            <div className="sb_item">
                                <i className="fas fa-folder"></i>
                                <p>Documentos Inicales</p>
                            </div>
                        </NavLink>
                        <NavLink to="/home/mis_docs" className="sb_navlink">
                            <div className="sb_item">
                                <i className="fas fa-file-upload"></i>
                                <p>Mis Documentos</p>
                            </div>
                        </NavLink>
                    </>
                }

            </div>

            {/* BOTTOM */}
            <div className="sb_bottom">
                <div className="sb_item" onClick={signOut}>
                    <i className="fas fa-sign-out-alt"></i>
                    <p>Cerrar Sesión</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
