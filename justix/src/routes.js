
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ForunsList from "./pages/BDForuns/ForunsList";
import ForunsForm from "./pages/BDForuns/ForunsForm";
import React, { useState } from 'react';
import Forunsindex from "./pages/Foruns/Forunsindex";
import AdvocaciasList from "./pages/BDAdvocacias/AdvocaciasList";
import AdvocaciasForm from "./pages/BDAdvocacias/AdvocaciasForm";
import TribunaisList from './pages/BDTribunais/TribunaisList';
import TribunaisForm from './pages/BDTribunais/TribunaisForm';
import AudienciasList from './pages/BDAudiencias/AudienciasList';
import AudienciasForm from './pages/BDAudiencias/AudienciasForm';
import PortaisList from "./pages/BDPortais/PortaisList";
import  PortaisForm from "./pages/BDPortais/PortaisForm";
import MediacoesList from "./pages/BDMediacoes/MediacoesList";
import MediacoesForm from "./pages/BDMediacoes/MediacoesForm";
import UsuariosList from './pages/BDUsuarios/UsuariosList';
import UsuariosForm from './pages/BDUsuarios/UsuariosForm';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Sobre from "./pages/Sobre";
import Tribunaisindex from "./pages/Tribunais/Tribunaisindex";
import Audienciasindex from "./pages/Audiencias/Audienciasindex"
import Mediacoesindex from "./pages/Mediacoes/Mediacoesindex";
import Advocaciaindex  from "./pages/Advocacias/Advocaciasindex";
import Portaisindex  from "./pages/Portais/Portaisindex";


function App() {
  const [forumEditado, setForumEditado] = useState(null);
  const [tribunalEditado, setTribunalEditado] = useState(null);
  const [juizEditado, setJuizEditado] = useState(null);
  const [mediadorEditado, setMediadorEditado] = useState(null);
  const [advocaciaEditado, setAdvocaciaEditado] = useState(null);
  const [portaisEditado, setPortaisEditado] = useState(null);
  const [usuarioEditado, setUsuarioEditado] = useState(null);

  return (
    <BrowserRouter>
   
   
      <Routes>
        <Route path="/login"  element={<Login />}></Route>
        <Route path="/cadastro"   element={<Cadastro />}></Route>
        <Route path="/" element={ <Home /> }></Route>
        <Route path="/info" element={ <Sobre/> }></Route>
        <Route path="/user/dashboard/tribunais" element={ <Tribunaisindex/> }></Route>
        <Route path="/user/dashboard/foruns" element={ <Forunsindex/> }></Route>
        <Route path="/user/dashboard/audiencias" element={ <Audienciasindex/> }></Route>
        <Route path="/user/dashboard/mediacoes" element={ <Mediacoesindex/> }></Route>
        <Route path="/user/dashboard/advocacia" element={ <Advocaciaindex/> }></Route>
        <Route path="/user/dashboard/portais" element={ <Portaisindex/> }></Route>
        <Route 
          path="/admin/dashboard/portais"
          element={<PortaisList onEdit={setPortaisEditado} />}
        />
        <Route 
          path="/admin/dashboard/portais/new"
          element={<PortaisForm portaisAtivo={null} onSave={() => {}} />}
        />
        <Route 
          path="/admin/dashboard/portais/edit"
          element={<PortaisForm portaisAtivo={portaisEditado} onSave={() => {}} onCancel={() => setPortaisEditado(null)} />}
        />
        <Route 
          path="/admin/dashboard/advocacia"
          element={<AdvocaciasList onEdit={setAdvocaciaEditado} />}
        />
        <Route 
          path="/admin/dashboard/advocacia/new"
          element={<AdvocaciasForm advocaciaAtivo={null} onSave={() => {}} />}
        />
        <Route 
          path="/admin/dashboard/advocacia/edit"
          element={<AdvocaciasForm advocaciaAtivo={advocaciaEditado} onSave={() => {}} onCancel={() => setAdvocaciaEditado(null)} />}
        />
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