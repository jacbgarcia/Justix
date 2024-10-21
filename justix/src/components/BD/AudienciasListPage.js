// src/pages/Juizes/JuizesListPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AudienciasListPageO = () => {
  const [juizes, setJuizes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listarJuizes();
  }, []);

  const listarJuizes = async () => {
    try {
      const res = await axios.get('http://localhost:3001/juiz');
      setJuizes(res.data);
    } catch (err) {
      console.error('Erro ao listar fóruns:', err);
    }
  };

  const excluirJuiz = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/juiz/${id}`);
      listarJuizes();
    } catch (err) {
      console.error('Erro ao excluir juiz:', err);
    }
  };

  const handleEdit = (juiz) => {
    navigate('/juiz/edit', { state: { juiz } });
  };

//   const handleNew = () => {
//     navigate('/juizes/new');
//   };

  return (
    <div>
      {/* <h2>Lista de Juizes</h2> */}
      {/* <button onClick={handleNew}>Novo Juiz</button> */}
      
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tempo de Serviço</th>
            <th>Casos Julgados</th>
            <th>Avaliação Média</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {juizes.map(juiz => (
            <tr key={juiz.id_juiz}>
              <td>{juiz.nome}</td>
              <td>{juiz.tempo_servico}</td>
              <td>{juiz.casos_julgados}</td>
              <td>{juiz.avaliacao_media}</td>
              <td>
                <button onClick={() => handleEdit(juiz)}>Editar</button>
                <button onClick={() => excluirJuiz(juiz.id_juiz)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AudienciasListPageO;