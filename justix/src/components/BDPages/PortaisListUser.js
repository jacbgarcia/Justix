import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../Card/Card.module.css';

const PortaisListPageUser = () => {
  const [portais, setPortais] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado do termo de busca

  useEffect(() => {
    listarPortais();
  }, []);

  const listarPortais = async () => {
    try {
      const res = await axios.get('http://localhost:3001/portais');
      setPortais(res.data);
    } catch (err) {
      console.error('Erro ao listar portais:', err);
    }
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/portais/')) {
      return `http://localhost:3001${imagem}`;
    }
    return `http://localhost:3001/uploads/portais/${imagem}`;
  };

  // Filtra os portais com base no termo de busca
  const filteredPortais = portais.filter((portal) =>
    portal.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={style.searchInput}
      />

      {/* Renderiza apenas os portais filtrados */}
      {filteredPortais.length > 0 ? (
        filteredPortais.map((portal) => (
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
              <button className={style.visualizarbtn}>Visualizar</button>
            </div>
          </div>
        ))
      ) : (
        <p>Nenhum portal encontrado.</p>
      )}
    </div>
  );
};

export default PortaisListPageUser;
