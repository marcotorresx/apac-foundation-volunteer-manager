import './App.css';
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Initial from "./routes/Initial"
import {Switch, Route} from "react-router-dom"
import dateFormat from "dateformat"

// DATE FORMAL LABELS
dateFormat.i18n = {
  dayNames: [
    "Dom",
    "Lun",
    "Mar",
    "Mie",
    "Jue",
    "Vie",
    "Sab",
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  monthNames: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]
};

function App() {
  return (
    <div className="App">
      <Switch>
        
        {/* NO AUTH */}
        <Route path="/" exact component={Initial}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>

        {/* HOME PRIVATE ROUTE */}
        <Route path="/home" component={Home}/>

      </Switch>
    </div>
  );
}

export default App;
