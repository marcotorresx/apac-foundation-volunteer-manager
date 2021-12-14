import React from 'react'
import {db} from "../firebase"

export const GeneralContext = React.createContext()

const GeneralProvider = ({children}) => {

    // VARIABLES
    const [loadedData, setLoadedData] = React.useState(false); // Indica si la data ya esta cargada

    // DOCUMENTOS DE USUARIO
    const [docsPresSubir, setDocsPresSubir] = React.useState([]); // Documentos de prestadores a subir
    const [docsPresIniciales, setDocsPresIniciales] = React.useState([]); // Documentos de prestadores iniciales
    const [docsVolSubir, setDocsVolSubir] = React.useState([]); // Documentos de voluntarios a subir
    const [docsVolIniciales, setDocsVolIniciales] = React.useState([]); // Documentos de voluntarios iniciales
    const [docsInvSubir, setDocsInvSubir] = React.useState([]); // Documentos de investigadores a subir
    const [docsInvIniciales, setDocsInvIniciales] = React.useState([]); // Documentos de investigadores iniciales
    const [docsRecSubir, setDocsRecSubir] = React.useState([]); // Documentos de recorridos a subir
    const [docsRecIniciales, setDocsRecIniciales] = React.useState([]); // Documentos de recorridos iniciales

    // CARGAR DATA GENERAL - Carga los datos necesarios para la aplicación antes de su renderización
    async function loadGeneralData(){
        try{
            // Descargamos los documentos de prestadores y voluntarios
            const docsPresRes = await db.collection("Datos Iniciales").doc("Docs Prestador").get();
            const docsVolRes = await db.collection("Datos Iniciales").doc("Docs Voluntario").get();
            const docsInvRes = await db.collection("Datos Iniciales").doc("Docs Investigador").get();
            const docsRecRes = await db.collection("Datos Iniciales").doc("Docs Recorridos").get();
            
            // Poner los arrays de docs en el contexto
            setDocsPresSubir( docsPresRes.data().docs_subir );
            setDocsPresIniciales( docsPresRes.data().docs_iniciales );
            setDocsVolSubir( docsVolRes.data().docs_subir );
            setDocsVolIniciales( docsVolRes.data().docs_iniciales );
            setDocsInvSubir( docsInvRes.data().docs_subir );
            setDocsInvIniciales( docsInvRes.data().docs_iniciales );
            setDocsRecSubir( docsRecRes.data().docs_subir );
            setDocsRecIniciales( docsRecRes.data().docs_iniciales );

            // Dejamos renderizar el home
            setLoadedData(true);
        }
        catch(error){
            console.log("LOAD GENERAL DATA ERROR:", console.log(error));
        }
    }

    // USE EFFECT
    React.useEffect(() => {
        loadGeneralData();
    }, []);

    return (
        // Si ya se cargó la data entonces renderiza la aplicación
        loadedData &&
        <GeneralContext.Provider 
            value={{
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
            }}
        >
            {children}
        </GeneralContext.Provider>
    )
}

export default GeneralProvider