import React from 'react'
import {UserContext} from "../contexts/UserContext"
import {Link} from "react-router-dom"
import dateFormat from "dateformat"
import "./MyProfile.css"

const MyProfile = () => {

    // VARIABLES
    const {user} = React.useContext(UserContext);

    return (
        <div className="home_page">
            <h1>Mi Perfil</h1>

            <div className="user_info_container">
                {/* USER IMAGE */}
                <img className="user_img" src="/img/user_icon.png" alt="" />

                {/* USER INFO */}
                <ul className="list-group user_info list-group-flush">
                    { user?.nombre && <li className="list-group-item user_info_item">
                        <div className="left">Nombre</div>
                        <div className="right">{user?.nombre}</div>
                    </li>}
                    { user?.correo && <li className="list-group-item user_info_item">
                        <div className="left">Correo</div>
                        <div className="right">{user?.correo}</div>
                    </li>}
                    { user?.uid && <li className="list-group-item user_info_item">
                        <div className="left">ID de Usuario</div>
                        <div className="right">{user?.uid}</div>
                    </li>}
                    { user?.telefono && <li className="list-group-item user_info_item">
                        <div className="left">Teléfono</div>
                        <div className="right">{user?.telefono}</div>
                    </li>}
                    { user?.tipo && <li className="list-group-item user_info_item">
                        <div className="left">Tipo de Usuario</div>
                        <div className="right">{user?.tipo}</div>
                    </li>}
                    { user?.tiempoActivo && <li className="list-group-item user_info_item">
                        <div className="left">Tiempo Activo</div>
                        <div className="right">{dateFormat( new Date( user?.tiempoActivo?.toDate() ), "isoDate")}</div>
                    </li>}
                    { user?.genero && <li className="list-group-item user_info_item">
                        <div className="left">Género</div>
                        <div className="right">{user?.genero}</div>
                    </li>}
                    { user?.area && <li className="list-group-item user_info_item">
                        <div className="left">Area en APAC</div>
                        <div className="right">{user?.area}</div>
                    </li>}
                    { user?.proyecto && <li className="list-group-item user_info_item">
                        <div className="left">Proyecto en APAC</div>
                        <div className="right">{user?.proyecto}</div>
                    </li>}
                    { user?.modalidad && <li className="list-group-item user_info_item">
                        <div className="left">Modalidad</div>
                        <div className="right">{user?.modalidad}</div>
                    </li>}
                    { user?.universidad && <li className="list-group-item user_info_item">
                        <div className="left">Universidad</div>
                        <div className="right">{user?.universidad}</div>
                    </li>}
                    { user?.carrera && <li className="list-group-item user_info_item">
                        <div className="left">Carrera</div>
                        <div className="right">{user?.carrera}</div>
                    </li>}
                    { user?.matricula && <li className="list-group-item user_info_item">
                        <div className="left">Matricula</div>
                        <div className="right">{user?.matricula}</div>
                    </li>}
                    { user?.tipoPrestador && <li className="list-group-item user_info_item">
                        <div className="left">Tipo de Prestador</div>
                        <div className="right">{user?.tipoPrestador}</div>
                    </li>}

                    { user?.carreraRecorridos && <li className="list-group-item user_info_item">
                        <div className="left">Carrera</div>
                        <div className="right">{user?.carreraRecorridos}</div>
                    </li>}
                    { user?.institucion && <li className="list-group-item user_info_item">
                        <div className="left">Institución</div>
                        <div className="right">{user?.institucion}</div>
                    </li>}
                    { user?.numeroAsistentes && <li className="list-group-item user_info_item">
                        <div className="left">Número de Asistentes</div>
                        <div className="right">{user?.numeroAsistentes}</div>
                    </li>}
                    { user?.entregaDonativo && <li className="list-group-item user_info_item">
                        <div className="left">Entrega de Donativo</div>
                        <div className="right">{user?.entregaDonativo}</div>
                    </li>}
                    { user?.desDonativo && <li className="list-group-item user_info_item">
                        <div className="left">Descripción de Donativo</div>
                        <div className="right">{user?.desDonativo}</div>
                    </li>}
                </ul>

                <div className="edit_link_container">

                    {/* BOTÓN EDITAR PERFIL */}
                    <Link to="/home/editar_perfil">
                        <button className="btn btn-primary btn_edit_profile list_btn slef-align-right">
                            Editar Perfil
                            <i className="fas fa-user-edit"></i>
                        </button>
                    </Link>

                    {/* CAMBIAR CONTRASEÑA */
                    user?.tipo === "Administrador" &&
                    <Link to="/home/admin/cambiar_contrasena">
                        <button className="btn btn-outline-primary btn_edit_profile list_btn list_btn_contra slef-align-right">
                            Cambiar Contraseña
                            <i className="fas fa-user-edit"></i>
                        </button>
                    </Link> }

                </div>

                
            </div>
        </div>
    )
}

export default MyProfile
