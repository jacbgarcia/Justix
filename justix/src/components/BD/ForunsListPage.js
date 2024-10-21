// src/pages/Foruns/ForunsListPage.js
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
    navigate('/foruns/edit', { state: { forum } });
  };

//   const handleNew = () => {
//     navigate('/foruns/new');
//   };

  return (
    <div>
      {/* <h2>Lista de Foruns</h2> */}
      {/* <button onClick={handleNew}>Novo Forum</button> */}
      
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
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
              <td>{forum.nome}</td>
              <td>{forum.cidade}</td>
              <td>{forum.estado}</td>
              <td>{forum.endereco}</td>
              <td>{forum.cep}</td>
              <td>{forum.avaliacao_media}</td>
              <td>
                <button onClick={() => handleEdit(forum)}>Editar</button>
                <button onClick={() => excluirForum(forum.id_forum)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ForunsListPageO;