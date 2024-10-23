// // src/pages/Foruns/ForunsListPage.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ForunsListPageO = () => {
//   const [foruns, setForuns] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     listarForuns();
//   }, []);

//   const listarForuns = async () => {
//     try {
//       const res = await axios.get('http://localhost:3001/foruns');
//       setForuns(res.data);
//     } catch (err) {
//       console.error('Erro ao listar fóruns:', err);
//     }
//   };

//   const excluirForum = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3001/foruns/${id}`);
//       listarForuns();
//     } catch (err) {
//       console.error('Erro ao excluir fórum:', err);
//     }
//   };

//   const handleEdit = (forum) => {
//     navigate('/foruns/edit', { state: { forum } });
//   };

// //   const handleNew = () => {
// //     navigate('/foruns/new');
// //   };

//   return (
//     <div>
//       {/* <h2>Lista de Foruns</h2> */}
//       {/* <button onClick={handleNew}>Novo Forum</button> */}
      
//       <table border="1" cellPadding="10" cellSpacing="0">
//         <thead>
//           <tr>
//             <th>Nome</th>
//             <th>Cidade</th>
//             <th>Estado</th>
//             <th>Endereço</th>
//             <th>CEP</th>
//             <th>Avaliação Média</th>
//             <th>Ações</th>
//           </tr>
//         </thead>
//         <tbody>
//           {foruns.map(forum => (
//             <tr key={forum.id_forum}>
//               <td>{forum.nome}</td>
//               <td>{forum.cidade}</td>
//               <td>{forum.estado}</td>
//               <td>{forum.endereco}</td>
//               <td>{forum.cep}</td>
//               <td>{forum.avaliacao_media}</td>
//               <td>
//                 <button onClick={() => handleEdit(forum)}>Editar</button>
//                 <button onClick={() => excluirForum(forum.id_forum)}>Excluir</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ForunsListPageO;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForunsListPageO = () => {
  const [foruns, setForuns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listarForuns();
  }, []);

  const listarForuns = async () => {
    try {
      const res = await axios.get('http://localhost:3001/foruns');
      setForuns(res.data);
    } catch (err) {
      console.error('Erro ao listar fóruns:', err);
    }
  };

  const excluirForum = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/foruns/${id}`);
      listarForuns();
    } catch (err) {
      console.error('Erro ao excluir fórum:', err);
    }
  };

  const handleEdit = (forum) => {
    navigate('/admin/dashboard/foruns/edit', { state: { forum } });
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    // Verifique se a imagem já contém o prefixo
    if (imagem.startsWith('/uploads/foruns/')) {
        return `http://localhost:3001${imagem}`; // Apenas retorna a URL completa
    }
    return `http://localhost:3001/uploads/foruns/${imagem}`; // Adiciona o prefixo se não estiver presente
};

  return (
    <div>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Endereço</th>
            <th>CEP</th>
            <th>Avaliação Média</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {foruns.map(forum => (
            <tr key={forum.id_forum}>
              <td style={{ width: '150px', textAlign: 'center' }}>
                {forum.imagem ? (
                  <img
                    src={getImagemUrl(forum.imagem)}
                    alt={`Imagem de ${forum.nome}`}
                    style={{
                      maxWidth: '120px',
                      maxHeight: '120px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '120px',
                      height: '120px',
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '4px',
                      margin: '0 auto'
                    }}
                  >
                    Sem imagem
                  </div>
                )}
              </td>
              <td>{forum.nome}</td>
              <td>{forum.cidade}</td>
              <td>{forum.estado}</td>
              <td>{forum.endereco}</td>
              <td>{forum.cep}</td>
              <td>{forum.avaliacao_media}</td>
              <td>
                <button 
                  onClick={() => handleEdit(forum)}
                  style={{ marginRight: '5px' }}
                >
                  Editar
                </button>
                <button 
                  onClick={() => excluirForum(forum.id_forum)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ForunsListPageO;