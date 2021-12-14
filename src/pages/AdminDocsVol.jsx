import React from 'react'
import {GeneralContext} from '../contexts/GeneralContext'
import {AdminContext} from '../contexts/AdminContext'
import "./Docs.css"

const AdminDocsVol = () => {

    // VARIABLES
    const [showAddDocSubir, setShowAddDocSubir] = React.useState(false); // Marca si se debe mostrar el formulario 1
    const [showAddDocInicial, setShowAddDocInicial] = React.useState(false); // Marca si se debe mostrar el formulario 2
    const {docsVolSubir, docsVolIniciales} = React.useContext(GeneralContext);
    const {addDocSubir, deleteDocSubir, addDocInicial, deleteDocInicial} = React.useContext(AdminContext);

    // REFERENCIAS DE INPUTS
    const nombreDocSubir = React.useRef("");
    const desDocSubir = React.useRef("");
    const nombreDocInicial = React.useRef("");
    const fileDocInicial = React.useRef(null);

    // ADD DOC SUBIR - Añade un doc a la lista de docs que un usuario debe subir en la DB
    function addDocSubirHandler(e){
        e.preventDefault();

        // Validaciones
        if (!nombreDocSubir.current.value.trim() || nombreDocSubir.current.value === "" ||
            !desDocSubir.current.value.trim() || desDocSubir.current.value === "" ){
            alert("Para agregar un documento a subir debes agregar nombre y descripción.")
            return
        }

        // Cerrar formulario
        setShowAddDocSubir(false);

        // Añadir
        addDocSubir(nombreDocSubir.current.value, desDocSubir.current.value, "Voluntario");
    }

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
        addDocInicial(nombreDocInicial.current.value, fileDocInicial.current.files[0], "Voluntario");

    }

    return (
        <div className="doc_page">

            {/* DOCS A SUBIR */}
            <div>

                {/* HEADER SUBIR */}
                <h1 className="doc_title">Documentos a Subir Voluntarios</h1>
                <h2>Esta es la lista de los documentos que deberán subir los voluntarios, los documentos tienen un titulo y una descripción detallada sobre lo que se debe subir.</h2>
                
                {/* LISTA SUBIR */}
                <ul className="list-group">
                    { docsVolSubir.map( (doc, index) => (
                        <li className="lista_item lista_item_my list-group-item d-flex justify-content-between align-items-start" key={index}>
                            {/* INFO */}
                            <div className="list_info">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{doc?.nombre}</div>
                                    {doc?.des}
                                </div>
                            </div>
                            {/* ICON */}
                            <div className="list_actions">
                                <i 
                                    className="fas fa-times" 
                                    onClick={() => deleteDocSubir(doc?.nombre, doc?.des, "Voluntario")}
                                ></i>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* BUTTON SUBIR */}
                { !showAddDocSubir &&
                <button className="btn btn-primary w-100 list_btn slef-align-right" onClick={() => setShowAddDocSubir(true)}>
                    Agregar Documento
                    <i className="fas fa-plus"></i>
                </button>
                }

                {/* FORM SUBIR */}
                { showAddDocSubir && 
                <form className="card doc_form">
                    <label htmlFor="nombreDocSubir" className="form-label">Nombre de Documento</label>
                    <input 
                        required
                        className="form-control" 
                        id="nombreDocSubir" 
                        placeholder="Escribe el nombre o título del documento..."
                        ref={nombreDocSubir}
                    />
                    <label htmlFor="desDocSubir" className="form-label">Descripción de Documento</label>
                    <input 
                        required
                        className="form-control" 
                        id="desDocSubir" 
                        placeholder="Escribe una descripción o indicaciones de la subida..."
                        ref={desDocSubir}
                    />
                    <button 
                        className="btn btn-primary w-100 list_btn slef-align-right" 
                        onClick={addDocSubirHandler}
                    >
                        Agregar Documento
                        <i className="fas fa-plus"></i>
                    </button>
                </form>
                }

            </div>
            
            {/* DOCS INICIALES */}
            <div>
                {/* HEADER INICALES */}
                <h1 className="doc_title">Doumentos Iniciales Voluntarios</h1>
                <h2>Estos son los documentos iniciales que podrán descargar los usuarios que sean voluntarios.</h2>

                {/* LISTA INICALES */}
                <ul className="list-group">
                    { docsVolIniciales.map( (doc, index) => (
                        <li className="lista_item list-group-item" key={index}>
                            <p>{doc?.nombre}</p>
                            <a href={doc?.link} target="_blank" rel="noreferrer">
                                <i className="fas fa-download"></i>
                            </a>
                            <i className="fas fa-times" onClick={() => deleteDocInicial(doc?.ref, "Voluntario")}></i>
                        </li>
                    ))}
                </ul>

                {/* BOTON INICALES */}
                { !showAddDocInicial && 
                <button className="btn btn-primary w-100 list_btn slef-align-right" onClick={() => setShowAddDocInicial(true)}>
                    Agregar Documento
                    <i className="fas fa-plus"></i>
                </button>
                }

                {/* FORM INICALES */}
                { showAddDocInicial && 
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
                </form>
                }

            </div>
        </div>
    )
}

export default AdminDocsVol
