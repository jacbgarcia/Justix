// src/components/Tribunais.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const TribunaisAdmin = () => {
//   const [tribunais, setTribunais] = useState([]);
//   const [tribunalAtivo, setTribunalAtivo] = useState(null);  // Usado para edição
//   const [novoTribunal, setNovoTribunal] = useState({
//     nome: '',
//     cidade: '',
//     estado: '',
//     endereco: '',
//     cep: '',
//     avaliacao_media: 0
//   });

//   useEffect(() => {
//     listarTribunais();
//   }, []);

//   // Função para buscar todos os fóruns
//   const listarTribunais = async () => {
//     try {
//       const res = await axios.get('http://localhost:3001/tribunais');
//       setTribunais(res.data);
//     } catch (err) {
//       console.error('Erro ao listar fóruns:', err);
//     }
//   };

//   // Função para excluir um tribunal
//   const excluirTribunal = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3001/tribunais/${id}`);
//       listarTribunais();
//     } catch (err) {
//       console.error('Erro ao excluir tribunal:', err);
//     }
//   };

//   // Função para inserir um novo tribunal
//   const inserirTribunal = async () => {
//     try {
//       await axios.post('http://localhost:3001/tribunais', novoTribunal);
//       listarTribunais(); // Atualiza a lista
//       resetarFormulario();
//     } catch (err) {
//       console.error('Erro ao inserir tribunal:', err);
//     }
//   };

//   // Função para atualizar um tribunal existente
//   const editarTribunal = async () => {
//     try {
//       await axios.put(`http://localhost:3001/tribunais/${tribunalAtivo.id_tribunal}`, novoTribunal);
//       listarTribunais();
//       resetarFormulario();
//     } catch (err) {
//       console.error('Erro ao editar tribunal:', err);
//     }
//   };

//   // Preencher o formulário para edição
//   const selecionarParaEdicao = (tribunal) => {
//     setNovoTribunal(tribunal);
//     setTribunalAtivo(tribunal);
//   };

//   // Resetar o formulário
//   const resetarFormulario = () => {
//     setNovoTribunal({
//       nome: '',
//       cidade: '',
//       estado: '',
//       endereco: '',
//       cep: '',
//       avaliacao_media: 0
//     });
//     setTribunalAtivo(null);
//   };

//   return (
//     <div>
//       <h2>Lista de Tribunais</h2>
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
//           {tribunais.map(tribunal => (
//             <tr key={tribunal.id_tribunal}>
//               <td>{tribunal.nome}</td>
//               <td>{tribunal.cidade}</td>
//               <td>{tribunal.estado}</td>
//               <td>{tribunal.endereco}</td>
//               <td>{tribunal.cep}</td>
//               <td>{tribunal.avaliacao_media}</td>
//               <td>
//                 <button onClick={() => selecionarParaEdicao(tribunal)}>Editar</button>
//                 <button onClick={() => excluirTribunal(tribunal.id_tribunal)}>Excluir</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h3>{tribunalAtivo ? 'Editar Tribunal' : 'Inserir Novo Tribunal'}</h3>
//       <form onSubmit={tribunalAtivo ? editarTribunal : inserirTribunal}>
//         <div>
//           <label>Nome:</label>
//           <input
//             type="text"
//             value={novoTribunal.nome}
//             onChange={(e) => setNovoTribunal({ ...novoTribunal, nome: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label>Cidade:</label>
//           <input
//             type="text"
//             value={novoTribunal.cidade}
//             onChange={(e) => setNovoTribunal({ ...novoTribunal, cidade: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label>Estado:</label>
//           <input
//             type="text"
//             value={novoTribunal.estado}
//             onChange={(e) => setNovoTribunal({ ...novoTribunal, estado: e.target.value })}
//             required
//           />
//         </div>
//         <div>
//           <label>Endereço:</label>
//           <input
//             type="text"
//             value={novoTribunal.endereco}
//             onChange={(e) => setNovoTribunal({ ...novoTribunal, endereco: e.target.value })}
//           />
//         </div>
//         <div>
//           <label>CEP:</label>
//           <input
//             type="text"
//             value={novoTribunal.cep}
//             onChange={(e) => setNovoTribunal({ ...novoTribunal, cep: e.target.value })}
//           />
//         </div>
//         <div>
//           <label>Avaliação Média:</label>
//           <input
//             type="number"
//             value={novoTribunal.avaliacao_media}
//             onChange={(e) => setNovoTribunal({ ...novoTribunal, avaliacao_media: e.target.value })}
//             step="0.01"
//             min="0"
//             max="10"
//             required
//           />
//         </div>
//         <button type="submit">{tribunalAtivo ? 'Salvar Alterações' : 'Inserir Tribunal'}</button>
//         {tribunalAtivo && <button type="button" onClick={resetarFormulario}>Cancelar Edição</button>}
//       </form>
//     </div>
//   );
// };

// export default TribunaisAdmin;
// src/pages/TribunaisList.js
// src/pages/TribunaisAdmin.js
// src/pages/TribunaisAdmin.js
