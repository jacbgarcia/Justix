// src/pages/Juiz/JuizListPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AudienciasListPageO = () => {
  const [juiz, setJuiz] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listarJuiz();
  }, []);

  const listarJuiz = async () => {
    try {
      const res = await axios.get('http://localhost:3001/juiz');
      setJuiz(res.data);
    } catch (err) {
      console.error('Erro ao listar juizes:', err);
    }
  };

  const excluirJuiz = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/juiz/${id}`);
      listarJuiz();
    } catch (err) {
      console.error('Erro ao excluir juiz:', err);
    }
  };

  const handleEdit = (juiz) => {
    navigate('/admin/dashboard/juiz/edit', { state: { juiz } });
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    // Verifique se a imagem já contém o prefixo
    if (imagem.startsWith('/uploads/juiz/')) {
      return `http://localhost:3001${imagem}`; // Apenas retorna a URL completa
    }
    return `http://localhost:3001/uploads/juiz/${imagem}`; // Adiciona o prefixo se não estiver presente
  };

  return (
    <div>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Tempo de Serviço</th>
            <th>Casos Julgados</th>
            <th>Avaliação Média</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {juiz.map(juiz => (
            <tr key={juiz.id_juiz}>
              <td style={{ width: '150px', textAlign: 'center' }}>
                {juiz.imagem ? (
                  <img
                    src={getImagemUrl(juiz.imagem)}
                    alt={`Imagem de ${juiz.nome}`}
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
              <td>{juiz.nome}</td>
              <td>{juiz.tempo_servico}</td>
              <td>{juiz.casos_julgados}</td>
              <td>{juiz.avaliacao_media}</td>
              <td>
                <button 
                  onClick={() => handleEdit(juiz)}
                  style={{ marginRight: '5px' }}
                >
                  Editar
                </button>
                <button 
                  onClick={() => excluirJuiz(juiz.id_juiz)}
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

export default AudienciasListPageO;