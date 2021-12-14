import React from 'react'
import {Redirect} from "react-router-dom"
import {UserContext} from "../contexts/UserContext"

const Initial = () => {

    const {user} = React.useContext(UserContext); // Obten user
    
    if (user) return <Redirect to="/home"/>; // Si hay user ve al home
    else return <Redirect to="/login"/>; // Si no hay user ve a login

}

export default Initial
