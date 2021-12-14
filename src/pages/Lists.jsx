import React from 'react'
import {UserContext} from '../contexts/UserContext';
import {db} from "../firebase"
import "./Docs.css"

const Lists = () => {

    // VARIABLES
    const {universidades, setUniversidades, carreras, setCarreras, areas, setAreas } = React.useContext(UserContext);
    const [showAddForm, setShowAddForm] = React.useState(false);
    const [listType, setListType] = React.useState("");
    const nuevoElemento = React.useRef("");

    // ADD ELEMENT HANDLER - Agregar a la DB un nuevo elemnto a una lista
    async function addElementHandler(e){
        e.preventDefault();
        try{
            // Validar el nuevo elemento
            if (!nuevoElemento.current.value.trim() || nuevoElemento.current.value === ""){
                alert("Debes de colocar un nuevo elemento en el campo.");
                return
            }

            // Close Form
            setShowAddForm(false);

            // Cambia la lista de acuerdo al tipo de lista
            switch(listType){

                // Universidades
                case "universidades": 
                    const newUniversidades = [...universidades, nuevoElemento.current.value];
                    await db.collection("Datos Iniciales").doc("Listas").update({universidades: newUniversidades});
                    setUniversidades(newUniversidades);
                    break;

                // Carreras
                case "carreras":
                    const newCarreras = [...carreras, nuevoElemento.current.value];
                    await db.collection("Datos Iniciales").doc("Listas").update({carreras: newCarreras});
                    setCarreras(newCarreras);
                    break;

                // Areas
                case "areas":
                    const newAreas = [...areas, nuevoElemento.current.value]; 
                    await db.collection("Datos Iniciales").doc("Listas").update({areas: newAreas});
                    setAreas(newAreas);
                    break;

                default: break;
            }
        }
        catch(error){
            console.log("ADD ELEMENT TO LIST ERROR:", error);
            alert("Ha ocurrido un error al añadir el nuevo elemento a la lista, intentalo otra vez.")
        }
    }

    // DELETE ELEMENT HANDLER - Borrar elemento de una lista de la DB 
    async function deleteElement(element){
        try{
            // Confirmar eliminación de elemento
            const confirm = window.confirm("¿Estás seguro que quieres eliminar el elemento de la lista?");
            if (!confirm) return;

            // Cambia la lista de acuerdo al tipo de lista
            switch(listType){

                // Universidades
                case "universidades": 
                    const newUniversidades = universidades.filter( item => item !== element);
                    await db.collection("Datos Iniciales").doc("Listas").update({universidades: newUniversidades});
                    setUniversidades(newUniversidades);
                    break;

                // Carreras
                case "carreras":
                    const newCarreras = carreras.filter( item => item !== element);
                    await db.collection("Datos Iniciales").doc("Listas").update({carreras: newCarreras});
                    setCarreras(newCarreras);
                    break;

                // Areas
                case "areas":
                    const newAreas = areas.filter(item => item !== element);
                    await db.collection("Datos Iniciales").doc("Listas").update({areas: newAreas});
                    setAreas(newAreas);
                    break;

                default: break;
            }
        }
        catch(error){
            console.log("DELETE ELEMENT FROM LIST ERROR:", error);
            alert("Ha ocurrido un error al eliminar el elemento de la lista, por favor intentalo otra vez");
        }
    }
    
    return (
        <div className="home_page">
            {/* HEADER */}
            <h1>Listas de Datos</h1>
            <h2>Estas son las listas de los diferentes datos que un usuario puede tener, se pueden agregar y borrar elementos de cada lista.</h2>

            {/* SELECT LIST */}
            <select className="form-select" aria-label="Default select example" value={listType} onChange={e => setListType(e.target.value)}>
                <option value="">Selecciona una lista</option>
                <option value="universidades">Universidades</option>
                <option value="carreras">Carreras</option>
                <option value="areas">Áreas de APAC</option>
            </select>

            {/* LIST TYPE */}
            <div className="list_type" style={{marginTop: "40px"}}>
                <ul className="list-group"> 
                
                    {/* Universidades */}
                    { listType === "universidades" &&
                    universidades.map( (item, index) => (
                    <li className="lista_item list-group-item" key={index}>
                        <p>{item}</p>
                        <i className="fas fa-times" onClick={() => deleteElement(item)}></i>
                    </li>
                    ))}

                    {/* Carreras */}
                    { listType === "carreras" &&
                    carreras.map( (item, index) => (
                    <li className="lista_item list-group-item" key={index}>
                        <p>{item}</p>
                        <i className="fas fa-times" onClick={() => deleteElement(item)}></i>
                    </li>
                    ))}

                    {/* Areas de APAC */}
                    { listType === "areas" &&
                    areas.map( (item, index) => (
                    <li className="lista_item list-group-item" key={index}>
                        <p>{item}</p>
                        <i className="fas fa-times" onClick={() => deleteElement(item)}></i>
                    </li>
                    ))}
                </ul>

                {/* BUTTON */
                !showAddForm && listType !== "" && 
                <button className="btn btn-primary w-100 list_btn slef-align-right" onClick={() => setShowAddForm(true)}>
                    Agregar Elemento
                    <i className="fas fa-plus"></i>
                </button> }

                {/* FORM */
                showAddForm &&
                <form className="card doc_form">
                    <label htmlFor="nuevoElemento" className="form-label">Nuevo Elemento</label>
                    <input 
                        required
                        className="form-control" 
                        id="nuevoElemento" 
                        placeholder="Escribe el nuevo elemento..."
                        ref={nuevoElemento}
                    />
                    <button 
                        className="btn btn-primary w-100 list_btn slef-align-right" 
                        onClick={addElementHandler}
                    >
                        Agregar Documento
                        <i className="fas fa-plus"></i>
                    </button>
                </form> }
                
            </div>
        </div>
    )
}

export default Lists
