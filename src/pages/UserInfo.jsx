import React from 'react'
import {useParams} from 'react-router'
import {db} from "../firebase"
import dateFormat from "dateformat"
import "./MyProfile.css"
import "./Home.css"
import "./Users.css"
import "./Docs.css"

const UserInfo = () => {

    // VARIABLES
    const {tipo, uid} = useParams();
    const [user, setUser] = React.useState({});
    const [userLoaded, setUserLoaded] = React.useState(false);

    // USE EFFECT
    React.useEffect(() => {

        // CARGAR USUARIO
        async function loadUser(){
            try{
                // Descargar usuario
                const res = await db.collection(tipo).doc(uid).get();

                // Checar si el doc existe
                if (!res.exists){
                    alert("El usuario buscado no se encuentra en la base de datos.");
                    return
                }
                // Settear usuario
                setUser( res.data() );

                // Permitir renderizar
                setUserLoaded(true);
            }
            catch(error){
                console.log("LOAD USER ERROR:", error);
                alert("Hubo un error con la carga del usuario.");
            }
        }

        loadUser();
        
    }, [tipo, uid])

    return (
        userLoaded &&
        <div className="home_page">
            <h1>Información de Usuario</h1>

            <div className="user_info_container">
                {/* USER IMAGE */}
                <img className="user_img" src="/img/user_icon.png" alt="" />

                {/* USER INFO */}
                <ul className="list-group user_info list-group-flush">
                    { user?.nombre && <li className="list-group-item user_info_item_line">
                        <div className="left">Nombre</div>
                        <div className="right">{user?.nombre}</div>
                    </li>}
                    { user?.genero && <li className="list-group-item user_info_item">
                        <div className="left">Género</div>
                        <div className="right">{user?.genero}</div>
                    </li>}
                    { user?.carrera && <li className="list-group-item user_info_item">
                        <div className="left">Carrera</div>
                        <div className="right">{user?.carrera}</div>
                    </li>}
                    { user?.correo && <li className="list-group-item user_info_item_line">
                        <div className="left">Correo</div>
                        <div className="right">{user?.correo}</div>
                    </li>}
                    { user?.telefono && <li className="list-group-item user_info_item_line">
                        <div className="left">Teléfono</div>
                        <div className="right">{user?.telefono}</div>
                    </li>}
                    { user?.universidad && <li className="list-group-item user_info_item">
                        <div className="left">Universidad</div>
                        <div className="right">{user?.universidad}</div>
                    </li>}
                    { user?.tiempoActivo && <li className="list-group-item user_info_item_line">
                        <div className="left">Tiempo Activo - Fecha de Fin</div>
                        <div className="right">{dateFormat( new Date( user?.tiempoActivo?.toDate() ), "isoDate")}</div>
                    </li>}
                    { user?.area && <li className="list-group-item user_info_item">
                        <div className="left">Área en APAC</div>
                        <div className="right">{user?.area}</div>
                    </li>}
                    { user?.matricula && <li className="list-group-item user_info_item">
                        <div className="left">Matricula</div>
                        <div className="right">{user?.matricula}</div>
                    </li>}
                    { user?.tipo && <li className="list-group-item user_info_item_line">
                        <div className="left">Tipo de Usuario</div>
                        <div className="right">{user?.tipo}</div>
                    </li>}
                    { user?.modalidad && <li className="list-group-item user_info_item">
                        <div className="left">Modalidad</div>
                        <div className="right">{user?.modalidad}</div>
                    </li>}
                    { user?.uid && <li className="list-group-item user_info_item_line">
                        <div className="left">ID de Usuario</div>
                        <div className="right">{user?.uid}</div>
                    </li>}
                    { user?.proyecto && <li className="list-group-item user_info_item">
                        <div className="left">Proyecto en APAC</div>
                        <div className="right">{user?.proyecto}</div>
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
            </div>

            {/* LISTA DOCS */
            tipo !== "Administrador" &&
            <>
                <h1 className="hp_h1_secondary">Documentos de Usuario</h1>
                <h2>Estos son los documentos que este usuario ha subido.</h2>

                
                <ul className="list-group">
                    { user?.mis_docs?.map( (doc, index) => (
                        <li className="lista_item list-group-item" key={index}>
                            <p>{doc?.nombre}</p>
                            <a href={doc?.link} target="_blank" rel="noreferrer">
                                <i className="fas fa-download"></i>
                            </a>
                        </li>
                    ))}
                </ul>        
            </> }

        </div>
    )
}

export default UserInfo
