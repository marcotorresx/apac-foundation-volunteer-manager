import React from 'react'
import {Link} from "react-router-dom"

const Navbar = () => {
    return (
        <div className="navbar">
            <h1>Sistema de Servicio Social, Prácticas Profesionales y Voluntariado</h1>
            <Link to="/home/mi_perfil">
                <img src="/img/user_icon.png" alt="" />
            </Link>
        </div>
    )
}

export default Navbar
