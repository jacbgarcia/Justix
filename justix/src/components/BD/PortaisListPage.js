import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../Card/Card.module.css';

const PortaisListPageO = () => {
  const [portais, setPortais] = useState([]);
  const [filteredPortais, setFilteredPortais] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de busca
  const navigate = useNavigate();

  useEffect(() => {
    listarPortais();
  }, []);

  const listarPortais = async () => {
    try {
      const res = await axios.get('http://localhost:3001/portais');
      setPortais(res.data);
      setFilteredPortais(res.data); // Inicialmente, mostra todos os portais
    } catch (err) {
      console.error('Erro ao listar portais:', err);
    }
  };

  const excluirPortais = async (id) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este portal?');
    if (!confirmacao) return;

    try {
      await axios.delete(`http://localhost:3001/portais/${id}`);
      listarPortais(); // Atualiza a lista após a exclusão
    } catch (err) {
      console.error('Erro ao excluir portais:', err);
    }
  };

  const handleEdit = (portais) => {
    navigate('/admin/dashboard/portais/edit', { state: { portais } });
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/portais/')) {
      return `http://localhost:3001${imagem}`;
    }
    return `http://localhost:3001/uploads/portais/${imagem}`;
  };

  // Função para lidar com a mudança do campo de busca
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filtra portais com base no termo de busca
    const filtered = portais.filter(portal =>
      portal.nome.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredPortais(filtered);
  };

  return (
    <div>
      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={style.searchInput} // Adicione uma classe de estilo, se desejar
      />

      {/* Renderização dos portais filtrados */}
      {filteredPortais.map(portal => (
        <div key={portal.id_portal} className={style.card}>
          <div className={style.cardleft}>
            {portal.imagem ? (
              <img
                src={getImagemUrl(portal.imagem)}
                alt={`Imagem de ${portal.nome}`}
                className={style.cardleft1}
              />
            ) : (
              <div className={style.profileimg}>Sem imagem</div>
            )}
            <div className={style.cardinfo}>
              <h3>{portal.nome}</h3>
              <p className={style.tag}>{portal.url}</p>
              <p className={style.tag1}>Média: ★ {portal.avaliacao_media}</p>
            </div>
          </div>
          <div>
            <button
              className={style.visualizarbtn}
              onClick={() => handleEdit(portal)}
              style={{ marginRight: '5px' }}
            >
              Editar
            </button>
            <button
              className={style.visualizarbtn}
              onClick={() => excluirPortais(portal.id_portal)}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortaisListPageO;