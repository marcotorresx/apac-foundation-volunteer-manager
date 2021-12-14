import React from 'react'
import {Redirect} from "react-router-dom"
import {UserContext} from "../contexts/UserContext"

const AdminRoute = ({children}) => {

    // Obten user
    const {user} = React.useContext(UserContext);

    // Si user tipo no es Admin ve a home
    if (!user || user?.tipo !== "Administrador"){
        alert("Solo usuarios Administradores pueden acceder a esta página.")
        return <Redirect to="/home"/>; 
    } 

    // Si user es Admin renderiza children
    return <>{children}</>

}

export default AdminRoute
