import React from 'react'
import shortid from "shortid"
import {db, auth, storage} from "../firebase"
import {useHistory} from 'react-router'

export const UserContext = React.createContext()

const UserProvider = ({children}) => {
    
    // VARIABLES
    const [user, setUser] = React.useState(null);
    const [initialDataChecked, setInitialDataChecked] = React.useState(false);
    const history = useHistory();

    // LISTAS - Para registrarse y para filtrar usuarios
    const [universidades, setUniversidades] = React.useState([]);
    const [carreras, setCarreras] = React.useState([]);
    const [areas, setAreas] = React.useState([]);

    // CHECK INITIAL DATA - Checkar antes de mostrar la app si es que hay un usuario logeado y descargar las listas de la DB
    async function checkInitialData(){
        try{
            // Checar usuario logeado
            auth.onAuthStateChanged( async user => {
                if (user){
                        // Intenta obtener usuario en las colecciones
                        const resAdmin = await db.collection("Administrador").doc(user?.uid).get();
                        const resPrestador = await db.collection("Prestador").doc(user?.uid).get();
                        const resVoluntario = await db.collection("Voluntario").doc(user?.uid).get();
                        const resInvestigador = await db.collection("Investigador").doc(user?.uid).get();
                        const resRecorridos = await db.collection("Recorridos").doc(user?.uid).get();
    
                        // Ver en cual coleccion está
                        if (resAdmin.exists) setUser( resAdmin.data() );
                        else if (resPrestador.exists) setUser( resPrestador.data() );
                        else if (resVoluntario.exists) setUser( resVoluntario.data() );
                        else if (resInvestigador.exists) setUser( resInvestigador.data() );
                        else if (resRecorridos.exists) setUser( resRecorridos.data() );
                }

                // Si no hay usuario set null
                else setUser(null);

                // Descargar listas de la DB
                const listsRes = await db.collection("Datos Iniciales").doc("Listas").get();
    
                // Settear listas
                setUniversidades( listsRes.data().universidades );
                setCarreras( listsRes.data().carreras );
                setAreas( listsRes.data().areas );
    
                // Marcar checked para renderizar el home o login
                setInitialDataChecked(true);
            })
        }
        catch(error){
            console.log("CHECK INITIAL DATA ERROR:", error);
            alert("Hubo un error con la carga inicial de la página, por favor vuelve a intentar cargar la página.");
        }
    }

    // REGISTER - Crear nuevos usuarios en la base de datos
    async function register(nombre, correo, contrasena, telefono, tipo, tiempoActivo, genero, area, proyecto, modalidad, universidad, carrera, matricula, tipoPrestador, carreraRecorridos, institucion, numeroAsistentes, entregaDonativo, desDonativo){
        try{
            // Formatear tiempo
            if (tiempoActivo) tiempoActivo = new Date( tiempoActivo.replaceAll("-", ",") );

            // Crear el usuario en auth
            const userRes = await auth.createUserWithEmailAndPassword(correo, contrasena);
            const nuevoAuthUsuario = userRes?.user;
            
            // Crear objetos de usuarios nuevos dependiendo el tipo
            var nuevoUsuario = {};
            const uid = nuevoAuthUsuario?.uid

            // Tipos de usuarios
            if (tipo === "Administrador") 
                nuevoUsuario = { nombre, correo, telefono, tipo, uid };

            if (tipo === "Voluntario") 
                nuevoUsuario = { nombre, correo, telefono, tipo, tiempoActivo, genero, area, proyecto, modalidad, uid, mis_docs: [] };

            if (tipo === "Prestador") 
                nuevoUsuario = { nombre, correo, telefono, tipo, tiempoActivo, genero, area, proyecto, modalidad, universidad, carrera, matricula, tipoPrestador, uid, mis_docs: [] };

            if (tipo === "Investigador") 
                nuevoUsuario = { nombre, correo, telefono, tipo, tiempoActivo, genero, area, proyecto, universidad, carrera, matricula, uid, mis_docs: [] };

            if (tipo === "Recorridos") 
                nuevoUsuario = { nombre, correo, telefono, tipo, tiempoActivo, genero, carreraRecorridos, institucion, numeroAsistentes, entregaDonativo, desDonativo, uid, mis_docs: [] };

            // Guardar el nuevo objeto usuario en DB
            await db.collection(tipo).doc(uid).set(nuevoUsuario);

            // Set user
            setUser(nuevoUsuario);
        }
        catch(error){
            console.log("REGISTER ERROR:", error);
            switch(error.code){
                case "auth/email-already-in-use": return "El correo ingresado ya ha sido usado en otra cuenta.";
                case "auth/invalid-email": return "El correo ingresado no es válido.";
                default: return error.message;
            }
        }
    }

    // LOGIN - Ingresar con correo y contraseña
    async function login(correo, contrasena){
        try{
            // Ingresar a cuenta auth
            const user = await auth.signInWithEmailAndPassword(correo, contrasena);

            // Si no hay errores bajar usuario de DB, como puede estar en alguna de las colecciones se intenta en todas
            const resAdmin = await db.collection("Administrador").doc(user?.user?.uid).get();
            const resPrestador = await db.collection("Prestador").doc(user?.user?.uid).get();
            const resVoluntario = await db.collection("Voluntario").doc(user?.user?.uid).get();
            const resInvestigador = await db.collection("Investigador").doc(user?.user?.uid).get();
            const resRecorridos = await db.collection("Recorridos").doc(user?.user?.uid).get();

            // Ver en cual coleccion está
            if (resAdmin.exists) setUser( resAdmin.data() );
            else if (resPrestador.exists) setUser( resPrestador.data() );
            else if (resVoluntario.exists) setUser( resVoluntario.data() );
            else if (resInvestigador.exists) setUser( resInvestigador.data() );
            else if (resRecorridos.exists) setUser( resRecorridos.data() );
            else return "Hubo un problema con el almacenamiento de los datos de tu cuenta, crea una nueva cuenta o contacta a soporte."
        }
        catch(error){
            console.log("LOGIN ERROR:", error);
            switch(error.code){
                case "auth/user-not-found": return "No hay una cuenta registrada con ese correo.";
                case "auth/wrong-password": return "La contraseña ingresada es incorrecta.";
                default: return error.message;
            }
        }
    }

    // SIGN OUT - Cerrar sesión
    async function signOut(){
        try{
            await auth.signOut();
            setUser(null);
        }
        catch(error){
            console.log("SIGN OUT ERROR:", error);
        }
    }

    // EDITAR PERFIL - Cambia los datos de un perfil de usuario
    async function editProfile(nombre, telefono, tiempoActivo, genero, area, proyecto, modalidad, universidad, carrera, matricula, tipoPrestador, carreraRecorridos, institucion, numeroAsistentes, entregaDonativo, desDonativo){
        try{
            // Se crea objeto de usuario que se va a actualizar
            var updateObject = {};

            // Si el usuario es Prestador
            if (user?.tipo === "Administrador")
                updateObject = {nombre, telefono};
            
            if (user?.tipo === "Voluntario")
                updateObject = {nombre, telefono, tiempoActivo, genero, area, proyecto, modalidad};
            
            if (user?.tipo === "Prestador")
                updateObject = {nombre, telefono, tiempoActivo, genero, area, proyecto, modalidad, universidad, carrera, matricula, tipoPrestador};
            
            if (user?.tipo === "Investigador")
                updateObject = {nombre, telefono, tiempoActivo, genero, area, proyecto, universidad, carrera, matricula};
            
            if (user?.tipo === "Recorridos")
                updateObject = {nombre, telefono, tiempoActivo, genero, carreraRecorridos, institucion, numeroAsistentes, entregaDonativo, desDonativo};

            // Actualizar los datos con el objeto en la DB
            await db.collection(user?.tipo).doc(user?.uid).update(updateObject);

            // Volver a actualizar los datos en el contexto descargando de la DB
            const resUser = await db.collection(user?.tipo).doc(user?.uid).get();
            setUser( resUser.data() );

            // Volver a mi perfil
            history.push("/home/mi_perfil");
        }
        catch(error){
            console.log("EDIT PROFILE ERROR:", error);
            alert("Ha ocurrido un error en la edición de datos de tu perfil, intentalo otra vez.");
            return;
        }
    }

    // AGREGAR DOC A MIS DOCS - Agregar un nuevo documento a mi perfil en mis_docs
    async function addMyDoc(nombre, file){
        try{
            // Crear nombre y referencia con que se va a subir el archivo
            const fileName = nombre + "_" + shortid.generate();
            const ref = user?.uid + "/" + fileName;

            // Añadir el file a storage
            const fileRef = storage.ref(ref);
            await fileRef.put(file);
            const fileURL = await fileRef.getDownloadURL();

            // Construir nuevo documento inicial
            const newMisDocs = [...user?.mis_docs, {nombre, link: fileURL, ref}];
            
            // Añadir nuevo doc a la DB
            await db.collection(user?.tipo).doc(user?.uid).update({mis_docs: newMisDocs});

            // Cambiar el contexto
            setUser({...user, mis_docs: newMisDocs});
        }
        catch(error){
            console.log("ADD MY DOC ERROR:", error);
            alert("Hubo un error en la subida del nuevo documento, intentelo otra vez.");
        }
    }

    // BORRAR DOC DE MIS DOCS - Eliminar un documento
    async function deleteMyDoc(ref){
        try{
            // Confirmar eliminación
            const confirm = window.confirm("¿Estás seguro que quieres eliminar el documento?");
            if (!confirm) return;

            // Crear referencia al archivo
            const fileRef = storage.ref(ref);

            // Eliminar del storage
            await fileRef.delete();

            // Crear nuevo array de documentos iniciales
            const newMisDocs = user?.mis_docs?.filter( doc => {
                if (doc.ref !== ref) return true;
                else return false;
            })

            // Cambiar los docs iniciales de la DB
            await db.collection(user?.tipo).doc(user?.uid).update({mis_docs: newMisDocs});

            // Cambiar el contexto
            setUser({...user, mis_docs: newMisDocs});
        }   
        catch(error){
            console.log("DELETE MY DOC ERROR:", error);
            alert("Hubo un error en la eliminación del documento, intentelo otra vez.")
        }
    }

    // USE EFFECT
    React.useEffect(() => {
        checkInitialData() // Checkar antes de mostrar la app si es que hay un usuario logeado y listas
    }, [])

    return (
        // Si ya se checaron los datos iniciales renderiza la app
        initialDataChecked && 
        <UserContext.Provider 
            value={{
                user,
                register,
                login,
                signOut,
                editProfile,
                addMyDoc,
                deleteMyDoc,
                universidades, 
                setUniversidades,
                carreras, 
                setCarreras,
                areas, 
                setAreas
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider