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
      console.error('Erro ao listar tribunais:', err);
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
    navigate('/admin/dashboard/tribunais/edit', { state: { tribunal } });
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/tribunais/')) {
      return `http://localhost:3001${imagem}`;
    }
    return `http://localhost:3001/uploads/tribunais/${imagem}`;
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
          {tribunais.map(tribunal => (
            <tr key={tribunal.id_tribunal}>
              <td style={{ width: '150px', textAlign: 'center' }}>
                {tribunal.imagem ? (
                  <img
                    src={getImagemUrl(tribunal.imagem)}
                    alt={`Imagem de ${tribunal.nome}`}
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
              <td>{tribunal.nome}</td>
              <td>{tribunal.cidade}</td>
              <td>{tribunal.estado}</td>
              <td>{tribunal.endereco}</td>
              <td>{tribunal.cep}</td>
              <td>{tribunal.avaliacao_media}</td>
              <td>
                <button 
                  onClick={() => handleEdit(tribunal)}
                  style={{ marginRight: '5px' }}
                >
                  Editar
                </button>
                <button 
                  onClick={() => excluirTribunal(tribunal.id_tribunal)}
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

export default TribunaisListPageO;