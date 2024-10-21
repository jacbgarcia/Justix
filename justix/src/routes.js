import {BrowserRouter, Route, Routes} from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Cadastro from "./pages/Cadastro";
// import Sobre from "./pages/Sobre";
// import Tribunais from "./pages/Tribunais";
// import Foruns from "./pages/Foruns";
// import Audiencias from "./pages/Audiencias"
// import Mediacoes from "./pages/Mediacoes";
// import Advocacia from "./pages/Advocacias";
// import Portais from "./pages/Portais";

// function AppRoutes() {
//     return(
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={ <Home /> }></Route>
//                 <Route path="/Login" element={ <Login/> }></Route>
//                 <Route path="/Cadastro" element={ <Cadastro/> }></Route>
//                 <Route path="/Sobre_nos" element={ <Sobre/> }></Route>
//                 <Route path="/Tribunais" element={ <Tribunais/> }></Route>
//                 <Route path="/Foruns" element={ <Foruns/> }></Route>
//                 <Route path="/Audiencias" element={ <Audiencias/> }></Route>
//                 <Route path="/Mediacoes" element={ <Mediacoes/> }></Route>
//                 <Route path="/Advocacia" element={ <Advocacia/> }></Route>
//                 <Route path="/Portais" element={ <Portais/> }></Route>
//             </Routes>
//         </BrowserRouter>
//     );
// }

// export default AppRoutes;
import Home from "./pages/Home";

import ForunsList from "./pages/BDForuns/ForunsList";
import ForunsForm from "./pages/BDForuns/ForunsForm";
import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import TribunaisList from './pages/BDTribunais/TribunaisList';
import TribunaisForm from './pages/BDTribunais/TribunaisForm';
import AudienciasList from './pages/BDAudiencias/AudienciasList';
import AudienciasForm from './pages/BDAudiencias/AudienciasForm';
import MediacoesList from "./pages/BDMediacoes/MediacoesList";
import MediacoesForm from "./pages/BDMediacoes/MediacoesForm";
import UsuariosList from './pages/BDUsuarios/UsuariosList';
import UsuariosForm from './pages/BDUsuarios/UsuariosForm';

function App() {
  const [forumEditado, setForumEditado] = useState(null);
  const [tribunalEditado, setTribunalEditado] = useState(null);
  const [juizEditado, setJuizEditado] = useState(null);
  const [mediadorEditado, setMediadorEditado] = useState(null);
  const [usuarioEditado, setUsuarioEditado] = useState(null);

  return (
    <BrowserRouter>
   
   
      <Routes>
        <Route path="/" element={ <Home /> }></Route>
         {/* Rota para Fóruns */}
        <Route
          path="/foruns"
          element={<ForunsList onEdit={setForumEditado} />}
        />
        <Route
          path="/foruns/new"
          element={<ForunsForm forumAtivo={null} onSave={() => {}} />}
        />
        <Route
          path="/foruns/edit"
          element={<ForunsForm forumAtivo={forumEditado} onSave={() => {}} onCancel={() => setForumEditado(null)} />}
        />

        <Route
          path="/juiz"
          element={<AudienciasList onEdit={setJuizEditado} />}
        />
        <Route
          path="/juiz/new"
          element={<AudienciasForm juizAtivo={null} onSave={() => {}} />}
        />
        <Route
          path="/juiz/edit"
          element={<AudienciasForm juizAtivo={juizEditado} onSave={() => {}} onCancel={() => setJuizEditado(null)} />}
        />
        <Route
          path="/mediador"
          element={<MediacoesList onEdit={setMediadorEditado} />}
        />
        <Route
          path="/mediador/new"
          element={<MediacoesForm mediadorAtivo={null} onSave={() => {}} />}
        />
        <Route
          path="/mediador/edit"
          element={<MediacoesForm mediadorAtivo={mediadorEditado} onSave={() => {}} onCancel={() => setMediadorEditado(null)} />}
        />

        {/* Rota para Tribunais */}
        <Route
          path="/tribunais"
          element={<TribunaisList onEdit={setTribunalEditado} />}
        />
        <Route
          path="/tribunais/new"
          element={<TribunaisForm tribunalAtivo={null} onSave={() => {}} />}
        />
        <Route
          path="/tribunais/edit"
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