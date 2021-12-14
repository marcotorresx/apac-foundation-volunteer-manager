import React from 'react'
import {GeneralContext} from "../contexts/GeneralContext"
import shortid from "shortid"
import {db, storage} from "../firebase"

export const AdminContext = React.createContext()

const AdminProvider = ({children}) => {

    // VARIABLES
    const {
        docsPresSubir,
        setDocsPresSubir,
        docsPresIniciales,
        setDocsPresIniciales,
        docsVolSubir,
        setDocsVolSubir,
        docsVolIniciales,
        setDocsVolIniciales,
        docsInvSubir,
        setDocsInvSubir,
        docsInvIniciales,
        setDocsInvIniciales,
        docsRecSubir,
        setDocsRecSubir,
        docsRecIniciales,
        setDocsRecIniciales
    } = React.useContext(GeneralContext);

    // AÑADIR DOC SUBIR - Añade a la lista de documentos que un usuario debe subir en la DB un nuevo documento
    async function addDocSubir(nombre, des, tipo){
        try{
            // Crear nuevo objeto de documento a subir
            const newDocObject = {nombre, des}

            // Seleccionar el array de docs correcto
            var docsSubir = [];
            if (tipo === "Prestador") docsSubir = docsPresSubir;
            if (tipo === "Voluntario") docsSubir = docsVolSubir;
            if (tipo === "Investigador") docsSubir = docsInvSubir;
            if (tipo === "Recorridos") docsSubir = docsRecSubir;

            // Crear nuevo array de documentos a subir
            const newDocsSubir = [...docsSubir, newDocObject];

            // Añadir documento a la DB
            await db.collection("Datos Iniciales").doc("Docs " + tipo).update({docs_subir: newDocsSubir});

            // Cambiar el contexto
            if (tipo === "Prestador") setDocsPresSubir(newDocsSubir);
            if (tipo === "Voluntario") setDocsVolSubir(newDocsSubir);
            if (tipo === "Investigador") setDocsInvSubir(newDocsSubir);
            if (tipo === "Recorridos") setDocsRecSubir(newDocsSubir);

        }
        catch(error){
            console.log("AÑADIR DOC SUBIR ERROR:", error);
            alert("Hubo un error en la subida del nuevo documento, intentalo otra vez.")
        }
    }
    
    // BORRAR DOC SUBIR - Eliminar de la DB un documento a subir
    async function deleteDocSubir(nombre, des, tipo){
        try{
            // Confirmar eliminación
            const confirm = window.confirm("¿Estás seguro que quieres eliminar el documento a subir?");
            if (!confirm) return;

            // Seleccionar el array de docs correcto
            var docsSubir = [];
            if (tipo === "Prestador") docsSubir = docsPresSubir;
            if (tipo === "Voluntario") docsSubir = docsVolSubir;
            if (tipo === "Investigador") docsSubir = docsInvSubir;
            if (tipo === "Recorridos") docsSubir = docsRecSubir;

            // Filtrar el array con documentos quitando el que coincida con los datos
            const newDocsSubir = docsSubir.filter( doc => {
                if ( nombre === doc?.nombre && des === doc?.des ) return false;
                else return true;
            })
            
            // Cambiar la DB
            await db.collection("Datos Iniciales").doc("Docs " + tipo).update({docs_subir: newDocsSubir})

            // Cambiar el contexto
            if (tipo === "Prestador") setDocsPresSubir(newDocsSubir);
            if (tipo === "Voluntario") setDocsVolSubir(newDocsSubir);
            if (tipo === "Investigador") setDocsInvSubir(newDocsSubir);
            if (tipo === "Recorridos") setDocsRecSubir(newDocsSubir);

        }
        catch(error){
            console.log("BORRAR DOC SUBIR ERROR:", error);
            alert("Hubo un error en la eliminación del documento a subir, intentelo otra vez.")
        }
    }

    // AÑADIR DOC INICIAL
    async function addDocInicial(nombre, file, tipo){
        try{
            // Si el tipo es Prestador
            if (tipo === "Prestador"){
                // Crear nombre y referencia con que se va a subir el archivo
                const fileName = nombre + "_" + shortid.generate();
                const ref = "docs_iniciales_prestadores/" + fileName;

                // Añadir el file a storage
                const fileRef = storage.ref(ref);
                await fileRef.put(file);
                const fileURL = await fileRef.getDownloadURL();

                // Construir nuevo documento inicial
                const newDocsPresInicales = [...docsPresIniciales, {nombre, link: fileURL, ref}];
                
                // Añadir nuevo doc a la DB
                await db.collection("Datos Iniciales").doc("Docs Prestador").update({docs_iniciales: newDocsPresInicales})

                // Camabiar el contexto
                setDocsPresIniciales(newDocsPresInicales);
            }

            // Si el tipo es Voluntario
            if (tipo === "Voluntario"){
                // Crear nombre y referencia con que se va a subir el archivo
                const fileName = nombre + "_" + shortid.generate();
                const ref = "docs_iniciales_voluntarios/" + fileName;

                // Añadir el file a storage
                const fileRef = storage.ref(ref);
                await fileRef.put(file);
                const fileURL = await fileRef.getDownloadURL();

                // Construir nuevo documento inicial
                const newDocsVolInicales = [...docsVolIniciales, {nombre, link: fileURL, ref}];
                
                // Añadir nuevo doc a la DB
                await db.collection("Datos Iniciales").doc("Docs Voluntario").update({docs_iniciales: newDocsVolInicales})

                // Cmabiar el contexto
                setDocsVolIniciales(newDocsVolInicales);
            }

            // Si el tipo es Investigador
            if (tipo === "Investigador"){
                // Crear nombre y referencia con que se va a subir el archivo
                const fileName = nombre + "_" + shortid.generate();
                const ref = "docs_iniciales_investigadores/" + fileName;

                // Añadir el file a storage
                const fileRef = storage.ref(ref);
                await fileRef.put(file);
                const fileURL = await fileRef.getDownloadURL();

                // Construir nuevo documento inicial
                const newDocsInvInicales = [...docsInvIniciales, {nombre, link: fileURL, ref}];
                
                // Añadir nuevo doc a la DB
                await db.collection("Datos Iniciales").doc("Docs Investigador").update({docs_iniciales: newDocsInvInicales})

                // Cmabiar el contexto
                setDocsInvIniciales(newDocsInvInicales);
            }

            // Si el tipo es Recorridos
            if (tipo === "Recorridos"){
                // Crear nombre y referencia con que se va a subir el archivo
                const fileName = nombre + "_" + shortid.generate();
                const ref = "docs_iniciales_recorridos/" + fileName;

                // Añadir el file a storage
                const fileRef = storage.ref(ref);
                await fileRef.put(file);
                const fileURL = await fileRef.getDownloadURL();

                // Construir nuevo documento inicial
                const newDocsRecInicales = [...docsRecIniciales, {nombre, link: fileURL, ref}];
                
                // Añadir nuevo doc a la DB
                await db.collection("Datos Iniciales").doc("Docs Recorridos").update({docs_iniciales: newDocsRecInicales})

                // Cmabiar el contexto
                setDocsRecIniciales(newDocsRecInicales);
            }
        }
        catch(error){
            console.log("AÑADIR DOC SUBIR ERROR:", error);
            alert("Hubo un error en la subida del nuevo documento, intentelo otra vez.");
        }
    }

    // BORRAR DOC INICIAL - Eliminar de la DB un documento inicial
    async function deleteDocInicial(ref, tipo){
        try{
            // Confirmar eliminación
            const confirm = window.confirm("¿Estás seguro que quieres eliminar el documento inicial?");
            if (!confirm) return;

            // Crear referencia al archivo y eliminala
            const fileRef = storage.ref(ref);
            await fileRef.delete();

            // Seleccionar el array de docs correcto
            var docsIniciales = [];
            if (tipo === "Prestador") docsIniciales = docsPresIniciales;
            if (tipo === "Voluntario") docsIniciales = docsVolIniciales;
            if (tipo === "Investigador") docsIniciales = docsInvIniciales;
            if (tipo === "Recorridos") docsIniciales = docsRecIniciales;

            // Crear nuevo array de documentos iniciales
            const newDocsIniciales = docsIniciales.filter( doc => {
                if (doc?.ref !== ref) return true;
                else return false;
            })

            // Cambiar los docs iniciales de la DB
            await db.collection("Datos Iniciales").doc("Docs " + tipo).update({docs_iniciales: newDocsIniciales});

            // Cambiar el contexto
            if (tipo === "Prestador") setDocsPresIniciales(newDocsIniciales);
            if (tipo === "Voluntario") setDocsVolIniciales(newDocsIniciales);
            if (tipo === "Investigador") setDocsInvIniciales(newDocsIniciales);
            if (tipo === "Recorridos") setDocsRecIniciales(newDocsIniciales);
            
        }   
        catch(error){
            console.log("DELETE DOC INICIAL ERROR:", error);
            alert("Hubo un error en la eliminación del documento a subir, intentalo otra vez.")
        }
    }

    // BUSCAR USUARIOS - Buscar usuarios con los parámetros de filtración
    async function findUsers(tipo, actividad, tipoFlitracion, universidad, carrera, campo, valor){
        try{
            // Fecha de hoy
            const hoy = new Date();

            // Variable que recibirá los resultados de la busqueda
            var usuarios = [];

            // Todos
            if (actividad === "todos" && tipoFlitracion === "porcampo" && campo === "sincampo"){
                // Modo de búsqueda
                console.log("MODO 1");

                // Buscar en la DB todos los usuarios de un tipo
                const resultados = await db.collection(tipo).get();
                usuarios = resultados.docs.map( doc => doc.data() );
            }
            // Usuarios activos
            else if (actividad === "activos" && tipoFlitracion === "porcampo" && campo === "sincampo"){
                // Modo de búsqueda
                console.log("MODO 2");

                // Buscar en la DB todos los usuarios activos de un tipo
                const resultados = await db.collection(tipo).where("tiempoActivo", ">=", hoy).get();
                usuarios = resultados.docs.map( doc => doc.data() );
            }
            // Todos y con campo
            else if (actividad === "todos" && tipoFlitracion === "porcampo" && campo !== "sincampo"){
                // Modo de búsqueda
                console.log("MODO 3");

                // Buscar en la DB todos los usuarios que coincidan en un campo
                const resultados = await db.collection(tipo).get();
                const usuariosSinFiltrar = resultados.docs.map( doc => doc.data() );

                // Filtrar resultados por el campo indicado
                usuarios = usuariosSinFiltrar.filter( user => user[campo] === valor);
            }
            // Usuarios activos y con campo
            else if (actividad === "activos" && tipoFlitracion === "porcampo" && campo !== "sincampo"){
                // Modo de búsqueda
                console.log("MODO 4");

                // Buscar en la DB todos los usuarios activos que coincidan en un campo
                const resultados = await db.collection(tipo).where("tiempoActivo", ">=", hoy).get();
                const usuariosSinFiltrar = resultados.docs.map( doc => doc.data() );

                // Filtrar resultados por el campo indicado
                usuarios = usuariosSinFiltrar.filter( user => user[campo] === valor);
            }
            // Todos y compuesta
            else if (actividad === "todos" && tipoFlitracion === "compuesta" && campo === "sincampo"){
                // Modo de búsqueda
                console.log("MODO 5");

                // Buscar en la DB todos los usuarios de un tipo donde coincidan universidad y carrera
                const resultados = await db.collection(tipo).where("universidad", "==", universidad).where("carrera", "==", carrera).get();
                usuarios = resultados.docs.map( doc => doc.data() );
            }
            // Activos y compuesta
            else if (actividad === "activos" && tipoFlitracion === "compuesta" && campo === "sincampo"){
                // Modo de búsqueda
                console.log("MODO 6");

                // Buscar en la DB todos los usuarios activos de un tipo
                const resultados = await db.collection(tipo).where("tiempoActivo", ">=", hoy).where("universidad", "==", universidad).where("carrera", "==", carrera).get();
                usuarios = resultados.docs.map( doc => doc.data() );
            }
            // Todos, compuesta y con campo
            else if (actividad === "todos" && tipoFlitracion === "compuesta" && campo !== "sincampo"){
                // Modo de búsqueda
                console.log("MODO 7");

                // Buscar en la DB todos los usuarios que coincidan en un campo
                const resultados = await db.collection(tipo).where("universidad", "==", universidad).where("carrera", "==", carrera).get();
                const usuariosSinFiltrar = resultados.docs.map( doc => doc.data() );

                // Filtrar resultados por el campo indicado
                usuarios = usuariosSinFiltrar.filter( user => user[campo] === valor);
            }
            // Usuarios activos, compuesta y con campo
            else if (actividad === "activos" && tipoFlitracion === "compuesta" && campo !== "sincampo"){
                // Modo de búsqueda
                console.log("MODO 8");

                // Buscar en la DB todos los usuarios activos que coincidan en un campo
                const resultados = await db.collection(tipo).where("tiempoActivo", ">=", hoy).where("universidad", "==", universidad).where("carrera", "==", carrera).get();
                const usuariosSinFiltrar = resultados.docs.map( doc => doc.data() );

                // Filtrar resultados por el campo indicado
                usuarios = usuariosSinFiltrar.filter( user => user[campo] === valor);
            }
            else {
                alert("No se pudo realizar la búsqueda con los campos seleccionados.");
                return [];
            }

            // Regresar resultados
            return usuarios;

        }
        catch(error){
            console.log("FIND USERS ERROR:", error);
            alert("Hubo un error con la búsqueda de usuarios, por favor intenta otra vez.");
            return [];
        }
    }

    return (
        <AdminContext.Provider 
            value={{
                addDocSubir,
                deleteDocSubir,
                addDocInicial,
                deleteDocInicial,
                findUsers
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}

export default AdminProvider