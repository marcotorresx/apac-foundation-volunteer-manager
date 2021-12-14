import React from 'react'
import {Redirect} from "react-router-dom"
import {UserContext} from "../contexts/UserContext"

const PrivateRoute = ({children}) => {

    // Obten user
    const {user} = React.useContext(UserContext);

    // Si no hay user ve a login
    if (!user) return <Redirect to="/login"/>; 

    // Si hay user renderiza children
    return <>{children}</>
    
}

export default PrivateRoute

