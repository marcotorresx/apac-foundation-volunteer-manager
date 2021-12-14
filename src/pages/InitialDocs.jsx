import React from 'react'
import {UserContext} from "../contexts/UserContext"
import {GeneralContext} from "../contexts/GeneralContext"
import "./Docs.css"

const InitialDocs = () => {

    // VARIABLES
    const {user} = React.useContext(UserContext);
    const {docsPresIniciales, docsVolIniciales, docsInvIniciales, docsRecIniciales} = React.useContext(GeneralContext);

    return (
        <div className="home_page">
            {/* HEADER */}
            <h1>Documentos Iniciales</h1>
            <h2>Documentos descargables y editables que deberás llenar y subir en la sección de Mis Documentos con tu nombre. Ejemplo: Reglamento_Juanito Pérez García.</h2>

            {/* LISTA */}
            <ul className="lista list-group">

                {/* DOCS INICIALES PRESTADORES */
                user?.tipo === "Prestador" && 
                docsPresIniciales.map( (doc, index) => (
                    <li className="lista_item list-group-item" key={index}>
                        <p>{doc?.nombre}</p>
                        <a href={doc?.link} target="_blank" rel="noreferrer">
                            <i className="fas fa-download"></i>
                        </a>
                    </li>
                )) }

                {/* DOCS INICIALES VOLUNTARIOS */
                user?.tipo === "Voluntario" && 
                docsVolIniciales.map( (doc, index) => (
                    <li className="lista_item list-group-item" key={index}>
                        <p>{doc?.nombre}</p>
                        <a href={doc?.link} target="_blank" rel="noreferrer">
                            <i className="fas fa-download"></i>
                        </a>
                    </li>
                )) }

                {/* DOCS INICIALES INVESTIGADORES */
                user?.tipo === "Investigador" && 
                docsInvIniciales.map( (doc, index) => (
                    <li className="lista_item list-group-item" key={index}>
                        <p>{doc?.nombre}</p>
                        <a href={doc?.link} target="_blank" rel="noreferrer">
                            <i className="fas fa-download"></i>
                        </a>
                    </li>
                )) }

                {/* DOCS INICIALES RECORRIDOS */
                user?.tipo === "Recorridos" && 
                docsRecIniciales.map( (doc, index) => (
                    <li className="lista_item list-group-item" key={index}>
                        <p>{doc?.nombre}</p>
                        <a href={doc?.link} target="_blank" rel="noreferrer">
                            <i className="fas fa-download"></i>
                        </a>
                    </li>
                )) }

            </ul>
        </div>
    )
}

export default InitialDocs
