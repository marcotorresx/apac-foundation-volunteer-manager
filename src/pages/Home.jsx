import React from 'react'
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import InitialDocs from "./InitialDocs"
import NewAdmin from "./NewAdmin"
import AdminDocs from "../components/AdminDocs"
import MyProfile from './MyProfile'
import ChangePassword from './ChangePassword'
import EditProfile from './EditProfile'
import Users from './Users'
import UserInfo from './UserInfo'
import Lists from './Lists'
import MyDocs from "./MyDocs"
import Reportes from "./Reportes"
import {Route, Redirect} from "react-router-dom"
import { UserContext } from '../contexts/UserContext'
import AdminRoute from "../routes/AdminRoute"
import GeneralProvider from "../contexts/GeneralContext"
import AdminProvider from "../contexts/AdminContext"
import "./Home.css"

const Home = () => {

    // CHECK AUTH USER - Todas las rutas del home requieren auth entonces se checa que haya usuario
    const {user} = React.useContext(UserContext);
    if (!user) return <Redirect to="/login"/>; 

    else return (
        <GeneralProvider>
            <div className="home">

                {/* TOP */}
                <Navbar/>

                {/* BOTTOM */}
                <div className="home_bottom">
                    <Sidebar/>

                    {/* RUTAS USUARIO */}
                    <Route path="/home/mi_perfil" component={MyProfile}/>
                    <Route path="/home/editar_perfil" component={EditProfile}/>
                    <Route path="/home/docs_iniciales" component={InitialDocs}/>
                    <Route path="/home/mis_docs" component={MyDocs}/>

                    {/* RUTAS ADMINISTRADOR */}
                    <Route path="/home/admin">
                        <AdminRoute>
                            <AdminProvider>

                                <Route path="/home/admin/usuarios" component={Users}/>
                                <Route path="/home/admin/usuario/:tipo/:uid" component={UserInfo}/>
                                <Route path="/home/admin/nuevo_admin" component={NewAdmin}/>
                                <Route path="/home/admin/cambiar_contrasena" component={ChangePassword}/>
                                <Route path="/home/admin/reportes" component={Reportes}/>
                                <Route path="/home/admin/docs" component={AdminDocs}/>
                                <Route path="/home/admin/listas" component={Lists}/>

                            </AdminProvider>
                        </AdminRoute>
                    </Route>

                </div>
            </div>
        </GeneralProvider>
    )
}

export default Home