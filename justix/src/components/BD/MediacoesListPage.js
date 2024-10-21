// src/pages/Mediadores/MediadoresListPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MediacoesListPageO = () => {
  const [mediador, setMediadores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listarMediadores();
  }, []);

  const listarMediadores = async () => {
    try {
      const res = await axios.get('http://localhost:3001/mediador');
      setMediadores(res.data);
    } catch (err) {
      console.error('Erro ao listar mediadores:', err);
    }
  };

  const excluirForum = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/mediador/${id}`);
      listarMediadores();
    } catch (err) {
      console.error('Erro ao excluir mediador:', err);
    }
  };

  const handleEdit = (mediador) => {
    navigate('/mediador/edit', { state: { mediador } });
  };

//   const handleNew = () => {
//     navigate('/mediador/new');
//   };

  return (
    <div>
      {/* <h2>Lista de Mediadores</h2> */}
      {/* <button onClick={handleNew}>Novo Forum</button> */}
      
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Estado</th>
            <th>Avaliação Média</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {mediador.map(mediador => (
            <tr key={mediador.id_mediador}>
              <td>{mediador.nome}</td>
              <td>{mediador.estado}</td>
              <td>{mediador.avaliacao_media}</td>
              <td>
                <button onClick={() => handleEdit(mediador)}>Editar</button>
                <button onClick={() => excluirForum(mediador.id_mediador)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MediacoesListPageO;