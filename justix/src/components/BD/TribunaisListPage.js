// src/pages/Tribunais/TribunaisListPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TribunaisListPageO = () => {
  const [tribunais, setTribunais] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listarTribunais();
  }, []);

  const listarTribunais = async () => {
    try {
      const res = await axios.get('http://localhost:3001/tribunais');
      setTribunais(res.data);
    } catch (err) {
      console.error('Erro ao listar fóruns:', err);
    }
  };

  const excluirTribunal = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tribunais/${id}`);
      listarTribunais();
    } catch (err) {
      console.error('Erro ao excluir tribunal:', err);
    }
  };

  const handleEdit = (tribunal) => {
    navigate('/tribunais/edit', { state: { tribunal } });
  };

//   const handleNew = () => {
//     navigate('/tribunais/new');
//   };

  return (
    <div>
      {/* <h2>Lista de Tribunais</h2> */}
      {/* <button onClick={handleNew}>Novo Tribunal</button> */}
      
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
          {tribunais.map(tribunal => (
            <tr key={tribunal.id_tribunal}>
              <td>{tribunal.nome}</td>
              <td>{tribunal.cidade}</td>
              <td>{tribunal.estado}</td>
              <td>{tribunal.endereco}</td>
              <td>{tribunal.cep}</td>
              <td>{tribunal.avaliacao_media}</td>
              <td>
                <button onClick={() => handleEdit(tribunal)}>Editar</button>
                <button onClick={() => excluirTribunal(tribunal.id_tribunal)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TribunaisListPageO;