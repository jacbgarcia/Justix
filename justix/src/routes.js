import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Sobre from "./pages/Sobre";
import Tribunais from "./pages/Tribunais";
import Foruns from "./pages/Foruns";
import Audiencias from "./pages/Audiencias"
import Mediacoes from "./pages/Mediacoes";
import Advocacia from "./pages/Advocacias";
import Portais from "./pages/Portais";

function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home /> }></Route>
                <Route path="/Login" element={ <Login/> }></Route>
                <Route path="/Cadastro" element={ <Cadastro/> }></Route>
                <Route path="/Sobre_nos" element={ <Sobre/> }></Route>
                <Route path="/Tribunais" element={ <Tribunais/> }></Route>
                <Route path="/Foruns" element={ <Foruns/> }></Route>
                <Route path="/Audiencias" element={ <Audiencias/> }></Route>
                <Route path="/Mediacoes" element={ <Mediacoes/> }></Route>
                <Route path="/Advocacia" element={ <Advocacia/> }></Route>
                <Route path="/Portais" element={ <Portais/> }></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;