
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ForunsList from "./pages/BDForuns/ForunsList";
import ForunsForm from "./pages/BDForuns/ForunsForm";
import React, { useState } from 'react';
import Forunsindex from "./pages/Foruns/Forunsindex";
import ForunsindexFeed from "./pages/Foruns/Feedback/ForunsindexFeed";
import ForunsForms from "./pages/Foruns/Feedback/ForunsForms";
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
import TribunaisindexFeed from "./pages/Tribunais/Feedback/TribunaisindexFeed"
import TribunaisForms from "./pages/Tribunais/Feedback/TribunaisForms"
import Audienciasindex from "./pages/Audiencias/Audienciasindex"
import  AudienciasindexFeed from "./pages/Audiencias/Feedback/AudienciasindexFeed";
import AudienciasForms from "./pages/Audiencias/Feedback/AudienciasForms";
import Mediacoesindex from "./pages/Mediacoes/Mediacoesindex";
import MediacoesindexFeed from "./pages/Mediacoes/Feedback/MediacoesindexFeed";
import MediacoesForms from "./pages/Mediacoes/Feedback/MediacoesForms";
import Advocaciaindex  from "./pages/Advocacias/Advocaciasindex";
import AdvocaciaindexFeed from "./pages/Advocacias/Feedback/AdvocaciaindexFeed"
import  AdvocaciaForms from "./pages/Advocacias/Feedback/AdvocaciaForms";
import Portaisindex  from "./pages/Portais/Portaisindex";
import  PortaisindexFeed from "./pages/Portais/Feedback/PortaisindexFeed";
import PortaisForms from "./pages/Portais/Feedback/PortaisForms";


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
        <Route path="/user/dashboard/foruns/:id_forum/feedback" element={<ForunsindexFeed/>}></Route>
        <Route path="/user/dashboard/foruns/:id_forum/feedback/add" element={<ForunsForms/>}></Route>
        <Route path="/user/dashboard/tribunais/:id_tribunal/feedback/" element={<TribunaisindexFeed/>}></Route>
        <Route path="/user/dashboard/tribunais/:id_tribunal/feedback/add" element={<TribunaisForms/>}></Route>
        <Route path="/user/dashboard/mediacoes/:id_mediador/feedback/add" element={<MediacoesForms/>}></Route>
        <Route path="/user/dashboard/mediacoes/:id_mediador/feedback/" element={<MediacoesindexFeed/>}></Route>
        <Route path="/user/dashboard/audiencias/:id_juiz/feedback/add" element={<AudienciasForms/>}></Route>
        <Route path="/user/dashboard/audiencias/:id_juiz/feedback/" element={<AudienciasindexFeed/>}></Route>
        <Route path="/user/dashboard/advocacia/:id_advocacia/feedback/add" element={<AdvocaciaForms/>}></Route>
        <Route path="/user/dashboard/advocacia/:id_advocacia/feedback/" element={<AdvocaciaindexFeed/>}></Route>
        <Route path="/user/dashboard/portais/:id_portal/feedback/add" element={<PortaisForms/>}></Route>
        <Route path="/user/dashboard/portais/:id_portal/feedback/" element={<PortaisindexFeed/>}></Route>
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