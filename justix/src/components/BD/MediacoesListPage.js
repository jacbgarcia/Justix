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

  const excluirMediador = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/mediador/${id}`);
      listarMediadores();
    } catch (err) {
      console.error('Erro ao excluir mediador:', err);
    }
  };

  const handleEdit = (mediador) => {
    navigate('/admin/dashboard/mediador/edit', { state: { mediador } });
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/mediador/')) {
      return `http://localhost:3001${imagem}`;
    }
    return `http://localhost:3001/uploads/mediador/${imagem}`;
  };

  return (
    <div>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Estado</th>
            <th>Avaliação Média</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {mediador.map(mediador => (
            <tr key={mediador.id_mediador}>
              <td style={{ width: '150px', textAlign: 'center' }}>
                {mediador.imagem ? (
                  <img
                    src={getImagemUrl(mediador.imagem)}
                    alt={`Imagem de ${mediador.nome}`}
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
              <td>{mediador.nome}</td>
              <td>{mediador.estado}</td>
              <td>{mediador.avaliacao_media}</td>
              <td>
                <button 
                  onClick={() => handleEdit(mediador)}
                  style={{ marginRight: '5px' }}
                >
                  Editar
                </button>
                <button 
                  onClick={() => excluirMediador(mediador.id_mediador)}
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

export default MediacoesListPageO;