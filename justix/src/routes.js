
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Cadastro from "./pages/Cadastro";


// function AppRoutes() {
//     return(
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={ <Home /> }></Route>
//                 <Route path="/Login" element={ <Login/> }></Route>
//                 <Route path="/Cadastro" element={ <Cadastro/> }></Route>
                
//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default AppRoutes;
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ForunsList from "./pages/BDForuns/ForunsList";
import ForunsForm from "./pages/BDForuns/ForunsForm";
import React, { useState } from 'react';
import Foruns from "./pages/Foruns";
import TribunaisList from './pages/BDTribunais/TribunaisList';
import TribunaisForm from './pages/BDTribunais/TribunaisForm';
import AudienciasList from './pages/BDAudiencias/AudienciasList';
import AudienciasForm from './pages/BDAudiencias/AudienciasForm';
import MediacoesList from "./pages/BDMediacoes/MediacoesList";
import MediacoesForm from "./pages/BDMediacoes/MediacoesForm";
import UsuariosList from './pages/BDUsuarios/UsuariosList';
import UsuariosForm from './pages/BDUsuarios/UsuariosForm';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Sobre from "./pages/Sobre";
import Tribunais from "./pages/Tribunais";
import Audiencias from "./pages/Audiencias"
import Mediacoes from "./pages/Mediacoes";
import Advocacia from "./pages/Advocacias";
import Portais from "./pages/Portais";

function App() {
  const [forumEditado, setForumEditado] = useState(null);
  const [tribunalEditado, setTribunalEditado] = useState(null);
  const [juizEditado, setJuizEditado] = useState(null);
  const [mediadorEditado, setMediadorEditado] = useState(null);
  const [usuarioEditado, setUsuarioEditado] = useState(null);

  return (
    <BrowserRouter>
   
   
      <Routes>
        <Route path="/login"  element={<Login />}></Route>
        <Route path="/cadastro"   element={<Cadastro />}></Route>
        <Route path="/" element={ <Home /> }></Route>
        <Route path="/info" element={ <Sobre/> }></Route>
        <Route path="/user/dashboard/tribunais" element={ <Tribunais/> }></Route>
        <Route path="/user/dashboard/foruns" element={ <Foruns/> }></Route>
        <Route path="/user/dashboard/audiencias" element={ <Audiencias/> }></Route>
        <Route path="/user/dashboard/mediacoes" element={ <Mediacoes/> }></Route>
        <Route path="/user/dashboard/advocacia" element={ <Advocacia/> }></Route>
        <Route path="/user/dashboard/portais" element={ <Portais/> }></Route>
        <Route
          path="/admin/dashboard/foruns"
          element={<ForunsList onEdit={setForumEditado} />}
        />
        <Route
          path="/admin/dashboard/foruns/new"
          element={<ForunsForm forumAtivo={null} onSave={() => {}} />}
        />
        <Route
          path="/admin/dashboard/foruns/edit"
          element={<ForunsForm forumAtivo={forumEditado} onSave={() => {}} onCancel={() => setForumEditado(null)} />}
        />

        <Route
          path="/admin/dashboard/juiz"
          element={<AudienciasList onEdit={setJuizEditado} />}
        />
        <Route
          path="/admin/dashboard/juiz/new"
          element={<AudienciasForm juizAtivo={null} onSave={() => {}} />}
        />
        <Route
          path="/admin/dashboard/juiz/edit"
          element={<AudienciasForm juizAtivo={juizEditado} onSave={() => {}} onCancel={() => setJuizEditado(null)} />}
        />
        <Route
          path="/admin/dashboard/mediador"
          element={<MediacoesList onEdit={setMediadorEditado} />}
        />
        <Route
          path="/admin/dashboard/mediador/new"
          element={<MediacoesForm mediadorAtivo={null} onSave={() => {}} />}
        />
        <Route
          path="/admin/dashboard/mediador/edit"
          element={<MediacoesForm mediadorAtivo={mediadorEditado} onSave={() => {}} onCancel={() => setMediadorEditado(null)} />}
        />

        {/* Rota para Tribunais */}
        <Route
          path="/admin/dashboard/tribunais"
          element={<TribunaisList onEdit={setTribunalEditado} />}
        />
        <Route
          path="/admin/dashboard/tribunais/new"
          element={<TribunaisForm tribunalAtivo={null} onSave={() => {}} />}
        />
        <Route
          path="/admin/dashboard/tribunais/edit"
          element={<TribunaisForm tribunalAtivo={tribunalEditado} onSave={() => {}} onCancel={() => setTribunalEditado(null)} />}
        />

        {/* Rota para Usuários */}
        <Route
          path="/usuarios"
          element={<UsuariosList onEdit={setUsuarioEditado} />}
        />
        <Route
          path="/usuarios/new"
          element={<UsuariosForm usuarioAtivo={null} onSave={() => {}} />}
        />
        <Route
          path="/usuarios/edit"
          element={<UsuariosForm usuarioAtivo={usuarioEditado} onSave={() => {}} onCancel={() => setUsuarioEditado(null)} />}
        />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;