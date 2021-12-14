import React from 'react'
import {Bar, Pie} from "react-chartjs-2"
import {UserContext} from "../contexts/UserContext"
import {db} from "../firebase"
import "./Reportes.css"
import "./Users.css"

// Array of colors for graphs
const colors = [
    "#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177" ,"#0d5ac1" ,
    "#f205e6" ,"#1c0365" ,"#14a9ad" ,"#4ca2f9" ,"#a4e43f" ,"#d298e2" ,"#6119d0",
    "#d2737d" ,"#c0a43c" ,"#f2510e" ,"#651be6" ,"#79806e" ,"#61da5e" ,"#cd2f00" ,
    "#9348af" ,"#01ac53" ,"#c5a4fb" ,"#996635","#b11573" ,"#4bb473" ,"#75d89e" ,
    "#2f3f94" ,"#2f7b99" ,"#da967d" ,"#34891f" ,"#b0d87b" ,"#ca4751" ,"#7e50a8" ,
    "#c4d647" ,"#e0eeb8" ,"#11dec1" ,"#289812" ,"#566ca0" ,"#ffdbe1" ,"#2f1179" ,
    "#935b6d" ,"#916988" ,"#513d98" ,"#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
    "#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977",
    "#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
    "#5be4f0", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c", "#088baf",
    "#f158bf", "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234",
    "#6749e8", "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158",
    "#fb21a3", "#51aed9", "#5bb32d", "#807fb", "#21538e", "#89d534", "#d36647",
    "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
    "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
    "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#21538e", "#89d534", "#d36647",
    "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
    "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
    "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#9cb64a", "#996c48", "#9ab9b7",
    "#06e052", "#e3a481", "#0eb621", "#fc458e", "#b2db15", "#aa226d", "#792ed8",
    "#73872a", "#520d3a", "#cefcb8", "#a5b3d9", "#7d1d85", "#c4fd57", "#f1ae16",
    "#8fe22a", "#ef6e3c", "#243eeb", "#1dc18", "#dd93fd", "#3f8473", "#e7dbce",
    "#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a", "#15b9ee", "#0f5997",
    "#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7", "#cb2582", "#ce00be",
    "#32d5d6", "#17232", "#608572", "#c79bc2", "#00f87c", "#77772a", "#6995ba",
    "#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e", "#d00043",
    "#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052", "#e08c56",
    "#28fcfd", "#bb09b", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
    "#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
    "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9",
    "#615af0", "#4be47", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4",
    "#7ad236", "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06",
    "#f53b2a", "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a",
    "#4cf09d", "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#ff065",
    "#71b1f4", "#a2f8a5", "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35",
    "#1c65cb", "#5d1d0c", "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44",
    "#1bede6", "#8798a4", "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#25b67",
    "#88e9b8", "#c2b0e2", "#86e98f", "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff",
    "#f812b3", "#b17fc9", "#8d6c2f", "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6",
    "#dba2e6", "#76fc1b", "#608fa4", "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"
]

const Reportes = () => {

    // VARIABLES
    const {areas, universidades, carreras} = React.useContext(UserContext);
    const [tipo, setTipo] = React.useState("Voluntario");
    const [campo, setCampo] = React.useState("genero");
    const [tipoFlitracion, setTipoFlitracion] = React.useState("porcampo");
    const [universidad, setUniversidad] = React.useState(universidades[0]);
    const [carrera, setCarrera] = React.useState(carreras[0]);
    const [graphData, setGraphData] = React.useState({});
    const [graphDataLoaded, setGraphDataLoaded] = React.useState(false);
    const [graphType, setGraphType] = React.useState("bar");
    
    // CAMPOS DE FILTRACIÓN Y OPCIONES
    const camposData = {
        Voluntario: {
            campos: [
                {nombre: "genero", titulo: "Género"},
                {nombre: "area", titulo: "Área en APAC"},
                {nombre: "modalidad", titulo: "Modalidad"}
            ],
            genero: ["Masculino", "Femenino"],
            area: areas,
            modalidad: ["Presencial", "A distancia", "Internacional", "Por proyecto", "Por fecha especial"]
        },
        Prestador: {
            campos: [
                {nombre: "genero", titulo: "Género"},
                {nombre: "area", titulo: "Área en APAC"},
                {nombre: "modalidad", titulo: "Modalidad"},
                {nombre: "universidad", titulo: "Universidad"},
                {nombre: "carrera", titulo: "Carrera"},
                {nombre: "tipoPrestador", titulo: "Tipo de Prestador"}
            ],
            genero: ["Masculino", "Femenino"],
            area: areas,
            modalidad: ["Presencial", "En línea", "Híbrida"],
            universidad: universidades,
            carrera: carreras,
            tipoPrestador: ["Prestador en Línea", "Prestador Presencial", "Prácticas en Línea", "Prácticas Presenciales"]
        },
        Investigador: {
            campos: [
                {nombre: "genero", titulo: "Género"},
                {nombre: "area", titulo: "Área en APAC"},
                {nombre: "universidad", titulo: "Universidad"},
                {nombre: "carrera", titulo: "Carrera"}
            ],
            genero: ["Masculino", "Femenino"],
            area: areas,
            universidad: universidades,
            carrera: carreras
        },
        Recorridos: {
            campos: [
                {nombre: "genero", titulo: "Género"}
            ],
            genero: ["Masculino", "Femenino"]
        },
        titulos: {
            genero: "Género",
            area: "Área en APAC",
            modalidad: "Modalidad",
            universidad: "Universidad",
            carrera: "Carrera",
            tipoPrestador: "Tipo de Prestador"
        },
        tipos: {
            Voluntario: "Voluntarios",
            Prestador: "Prestadores",
            Investigador: "Investigadores",
            Recorridos: "Recorridos"
        }
    }

    // GENERAR DATA DE GRÁFICAS - Recibe parametros de filtro y hace fetch para generar data para gráficos
    async function generateGraphData(){
        try{
            // Fecha de hoy
            const hoy = new Date();
            
            // Iniciar dataset
            var graphData = {
                labels: [],
                datasets: [{
                    label: "Sin Título",
                    data: [],
                    backgroundColor: colors
                }]
            };

            // Cualquiera y campo
            if (tipoFlitracion === "porcampo"){
                // Modo de búsqueda
                console.log("MODO 1");

                // Recibir usarios activos
                const res = await db.collection(tipo).where("tiempoActivo", ">=", hoy).get();
                const users = res.docs.map( doc => doc.data() );

                // Poner nombre al dataset
                graphData.datasets[0].label = `${camposData.tipos[tipo]} - ${camposData.titulos[campo]}`;

                // Iterar sobre los posibles valores del campo de usuario seleccionado
                camposData[tipo][campo].forEach( valor => {
                    // Contador cantidad de usuarios por valor actual
                    var contador = 0;

                    // Iterar por usuario activo y aumentar contador
                    users.forEach( user => user[campo] === valor && contador++ );

                    // Si contador es diferente de 0 guarda la información en el dataset
                    if (contador !== 0){
                        graphData.labels.push(valor);
                        graphData.datasets[0].data.push(contador);
                    } 
                })
            }
            // Compuesta y campo
            else if (tipoFlitracion === "compuesta"){
                // Modo de búsqueda
                console.log("MODO 2");

                // Recibir usarios activos
                const res = await db.collection(tipo).where("tiempoActivo", ">=", hoy).where("universidad", "==", universidad).where("carrera", "==", carrera).get();
                const users = res.docs.map( doc => doc.data() );

                // Poner nombre al dataset
                graphData.datasets[0].label = `${camposData.tipos[tipo]} - ${universidad} - ${carrera} - ${camposData.titulos[campo]}`;

                // Iterar sobre los posibles valores de el campo de usuario seleccionado
                camposData[tipo][campo].forEach( valor => {
                    // Contador cantidad de usuarios por valor actual
                    var contador = 0;

                    // Iterar por usuario activo y aumentar contador
                    users.forEach( user => user[campo] === valor && contador++ );

                    // Si contador es diferente de 0 guarda la información en el dataset
                    if (contador !== 0){
                        graphData.labels.push(valor);
                        graphData.datasets[0].data.push(contador);
                    } 
                })
            }
            // Compuesta y sin campo
            else if (tipoFlitracion === "carreras"){
                // Modo de búsqueda
                console.log("MODO 3");

                // Recibir usarios activos
                const res = await db.collection(tipo).where("tiempoActivo", ">=", hoy).where("universidad", "==", universidad).get();
                const users = res.docs.map( doc => doc.data() );

                // Poner nombre al dataset
                graphData.datasets[0].label = `${camposData.tipos[tipo]} - ${universidad} - Carrera`;

                // Iterar sobre los posibles valores de el campo de usuario seleccionado
                carreras.forEach( carrera => {
                    // Contador cantidad de usuarios por valor actual
                    var contador = 0;

                    // Iterar por usuario activo y aumentar contador
                    users.forEach( user => user?.carrera === carrera && contador++ );

                    // Si contador es diferente de 0 guarda la información en el dataset
                    if (contador !== 0){
                        graphData.labels.push(carrera);
                        graphData.datasets[0].data.push(contador);
                    } 
                })
            }

            // Settear data de gráficos
            setGraphData(graphData);

            // Renderizar gráficas
            setGraphDataLoaded(true);
        }
        catch(error){
            console.log("GENERATE GRAPH DATA ERROR:", error);
            alert("Hubo un error con la generación de gráficas, por favor intentalo otra vez.");
        }
    }

    // SUBMIT HANDLER
    async function submitHandler(e){
        e.preventDefault();

        // Validaciones
        if (!tipo.trim() || tipo === "" ||
            !tipoFlitracion.trim() || tipoFlitracion === "" ||
            !universidad.trim() || universidad === "" ||
            !carrera.trim() || carrera === "" ||
            !campo.trim() || campo === "" ){
            alert("Debes llenar todos los campos.");
            return;
        }

        // Generar data
        generateGraphData();
    }

    return (
        <div className="home_page">

            {/* HEADER */}
            <h1>Reportes Gráficos</h1>
            <h2>En esta página se pueden ver gráficos con los campos indicados.</h2>

            {/* FILTRO */}
            <form className="filtro" onSubmit={submitHandler}>

                <div className="flitro_nivel">

                    {/* TIPO DE USUARIO */}
                    <div className="filtro_campo">
                        <p className="filtro_campo_nombre">Tipo de Usuario</p>
                        <select className="form-select" value={tipo} onChange={(e) => {
                            const value = e.target.value;
                            setTipo(value);
                            if (value === "Administrador" || value === "Voluntario" || value === "Recorridos") setTipoFlitracion("porcampo");
                            if (value === "Administrador" || value === "Voluntario" || value === "Recorridos") setCampo("genero");
                        }}>
                            <option value="Voluntario">Voluntario</option>
                            <option value="Prestador">Prestador</option>
                            <option value="Investigador">Investigador</option>
                            <option value="Recorridos">Recorridos</option>
                        </select>
                    </div>

                    {/* CAMPOS */
                    tipoFlitracion !== "carreras" &&
                    <div className="filtro_campo">
                        <p className="filtro_campo_nombre">Campo</p>
                        <select className="form-select" value={campo} onChange={e => setCampo(e.target.value)}>
                            { camposData[tipo].campos.map( (item, index) => (
                                <option value={item.nombre} key={index}>{item.titulo}</option>
                            ))}
                        </select>
                    </div> }

                    {/* TIPO DE FILTRACIÓN */
                    ( tipo === "Prestador" || tipo === "Investigador" ) &&
                    <div className="filtro_campo">
                        <p className="filtro_campo_nombre">Tipo de Filtración</p>
                        <select className="form-select" value={tipoFlitracion} onChange={e => {
                            setTipoFlitracion(e.target.value);
                            setCampo("genero");
                        }}>
                            <option value="porcampo">Por Campo</option>
                            <option value="carreras">Carreras</option>
                            <option value="compuesta">Compuesta</option>
                        </select>
                    </div> }

                </div>

                <div className="flitro_nivel">

                    {/* CAMPOS CARRERAS */
                    tipoFlitracion === "carreras" && ( tipo === "Prestador" || tipo === "Investigador" ) &&
                    <div className="filtro_campo">
                        <p className="filtro_campo_nombre">Universidad</p>
                        <select className="form-select" value={universidad} onChange={e => setUniversidad(e.target.value)}>
                            { universidades.map( (item, index) => (
                                <option value={item} key={index}>{item}</option>
                            ))}
                        </select>
                    </div> }

                    {/* CAMPOS COMPUESTOS */
                    tipoFlitracion === "compuesta" && ( tipo === "Prestador" || tipo === "Investigador" ) &&
                    <>
                        {/* UNIVERSIDAD */}
                        <div className="filtro_campo">
                            <p className="filtro_campo_nombre">Universidad</p>
                            <select className="form-select" value={universidad} onChange={e => setUniversidad(e.target.value)}>
                                { universidades.map( (item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>

                        {/* CARRERA */}
                        <div className="filtro_campo">
                            <p className="filtro_campo_nombre">Carrera</p>
                            <select className="form-select" value={carrera} onChange={e => setCarrera(e.target.value)}>
                                { carreras.map( (item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </> }

                </div>

                {/* BUTTON */}
                <button className="btn btn-primary filtro_boton" type="submit">Buscar</button>
                
            </form>

            {/* GRAPH */
            graphDataLoaded &&
            <div className="graphs">

                {/* GRAPH SELECTOR */}
                <div className="graph_selector">
                    <div className="btn-group btn-group-sm" role="group">
                        <input type="radio" className="btn-check" name="graph_selector" id="bar" defaultChecked/>
                        <label className="btn btn-outline-primary" htmlFor="bar" onClick={() => setGraphType("bar")}>Barras</label>

                        <input type="radio" className="btn-check" name="graph_selector" id="pie"/>
                        <label className="btn btn-outline-primary" htmlFor="pie" onClick={() => setGraphType("pie")}>Pastel</label>
                    </div>
                </div>

                {/* BAR GRAPH */
                graphType === "bar" &&
                <div className="bar_graph">
                    <Bar
                        data={graphData}
                        heigth={400}
                        width={600}
                        option={{
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                </div> }
                
                {/* PIE GRAPH */
                graphType === "pie" &&
                <div className="pie_graph">
                    <Pie
                        data={graphData}
                        heigth={400}
                        width={600}
                        option={{
                            maintainAspectRatio: false,
                        }}
                    />
                </div> }

            </div> }
        </div>
    )
}

export default Reportes
