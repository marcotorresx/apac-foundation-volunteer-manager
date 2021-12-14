import React from 'react'
import {GeneralContext} from '../contexts/GeneralContext';
import {UserContext} from "../contexts/UserContext"
import "./Docs.css"

const MyDocs = () => {

    // VARIABLES
    const {user, addMyDoc, deleteMyDoc} = React.useContext(UserContext);
    const {docsPresSubir, docsVolSubir, docsInvSubir, docsRecSubir} = React.useContext(GeneralContext);
    const [showAddDocInicial, setShowAddDocInicial] = React.useState(false); // Marca si se debe mostrar el formulario
    const nombreDocInicial = React.useRef("");
    const fileDocInicial = React.useRef(null);

    // ADD DOC INICIAL
    function addDocInicialHandler(e){
        e.preventDefault();

        // Validaciones - Que no estén vacíos y que el file sea pdf o imágen
        if (!nombreDocInicial.current.value.trim() || nombreDocInicial.current.value === "" ||
            fileDocInicial.current.files.length <= 0 ){
            alert("Para agregar un documento a subir debes agregar nombre y un archivo.")
            return
        }
        if ( !(fileDocInicial.current.files[0].type === "application/pdf" || 
               fileDocInicial.current.files[0].type === "image/jpeg" ||
               fileDocInicial.current.files[0].type === "image/jpg" ||
               fileDocInicial.current.files[0].type === "image/png" )){
            alert("Solo se pueden subir archivos en formato pdf o imágenes en formato jpeg / jpg / png");
            return
        }

        // Cerrar formulario
        setShowAddDocInicial(false);

        // Añadir
        addMyDoc(nombreDocInicial.current.value, fileDocInicial.current.files[0]);
    }

    return (
        <div className="home_page">

            <div className="docs_subir">
                {/* DOCS A SUBIR */}
                <h1>Documentos a Subir</h1>
                <h2>Sube los siguientes Documentos en PDF con nombre, por ejemplo: INE_Pablito Rodríguez Álvarez.</h2>

                <ul className="list-group list_ul">

                    {/* DOCS A SUBIR PRESTADORES */
                    user?.tipo === "Prestador" && 
                    docsPresSubir.map( (doc, index) => (
                        <li className="lista_item lista_item_my list-group-item d-flex justify-content-between align-items-start" key={index}>
                            <div className="list_info">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{doc?.nombre}</div>
                                    {doc?.des}
                                </div>
                            </div>
                        </li>
                    )) }

                    {/* DOCS A SUBIR VOLUNTARIOS */
                    user?.tipo === "Voluntario" && 
                    docsVolSubir.map( (doc, index) => (
                        <li className="lista_item lista_item_my list-group-item d-flex justify-content-between align-items-start" key={index}>
                            <div className="list_info">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{doc?.nombre}</div>
                                    {doc?.des}
                                </div>
                            </div>
                        </li>
                    )) }

                    {/* DOCS A SUBIR INVESTIGADORES */
                    user?.tipo === "Investigador" && 
                    docsInvSubir.map( (doc, index) => (
                        <li className="lista_item lista_item_my list-group-item d-flex justify-content-between align-items-start" key={index}>
                            <div className="list_info">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{doc?.nombre}</div>
                                    {doc?.des}
                                </div>
                            </div>
                        </li>
                    )) }

                    {/* DOCS A SUBIR RECORRIDOS */
                    user?.tipo === "Recorridos" && 
                    docsRecSubir.map( (doc, index) => (
                        <li className="lista_item lista_item_my list-group-item d-flex justify-content-between align-items-start" key={index}>
                            <div className="list_info">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{doc?.nombre}</div>
                                    {doc?.des}
                                </div>
                            </div>
                        </li>
                    )) }

                </ul>
            </div>

            {/* MIS DOCUMENTOS */}
            <div className="mis_docs">
                <h1 className="hp_h1_secondary">Mis Documentos</h1>
                <h2>Estos son los documentos que has compartido, puedes agregar o eliminar. Cada documento debe tener el nombre descriptivo de la lista de documentos iniciales.</h2>

                {/* LISTA MIS DOCS */}
                <ul className="list-group">
                    { user?.mis_docs?.map( (doc, index) => (
                        <li className="lista_item list-group-item" key={index}>
                            <p>{doc?.nombre}</p>
                            <a href={doc?.link} target="_blank" rel="noreferrer">
                                <i className="fas fa-download"></i>
                            </a>
                            <i className="fas fa-times" onClick={() => deleteMyDoc(doc?.ref)}></i>
                        </li>
                    ))}
                </ul>

                {/* BOTON MIS DOCS */
                !showAddDocInicial && 
                <button className="btn btn-primary w-100 list_btn slef-align-right" onClick={() => setShowAddDocInicial(true)}>
                    Agregar Documento
                    <i className="fas fa-plus"></i>
                </button> }

                {/* FORM MIS DOCS */
                showAddDocInicial && 
                <form className="card doc_form">
                    <label htmlFor="nombreDocInicial" className="form-label">Nombre de Documento</label>
                    <input 
                        required
                        className="form-control" 
                        id="nombreDocInicial" 
                        placeholder="Escribe el nombre o título del documento..."
                        ref={nombreDocInicial}
                    />
                    <label htmlFor="fileDocInicial" className="form-label">Documento PDF o Imágen</label>
                    <input 
                        required
                        accept=".pdf,image/*"
                        type="file"
                        className="form-control" 
                        id="fileDocInicial" 
                        placeholder="Selecciona archivo a subir..."
                        ref={fileDocInicial}
                    />
                    <button 
                        className="btn btn-primary w-100 list_btn slef-align-right" 
                        onClick={addDocInicialHandler}
                    >
                        Agregar Documento
                        <i className="fas fa-plus"></i>
                    </button>
                </form> }
            </div>
        </div>
    )
}

export default MyDocs
