import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../Card/Card.module.css';
import { Link } from 'react-router-dom';

const PortaisListPageUser = () => {
  const [portais, setPortais] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado do termo de busca

  useEffect(() => {
    listarPortais();
  }, []);

  const listarPortais = async () => {
      try {
        const res = await axios.get('http://localhost:3001/portais');
        const portaisWithRatings = await Promise.all(
          res.data.map(async (portal) => {
            try {
              const ratingRes = await axios.get(`http://localhost:3001/portal_avaliacao/${portal.id_portal}`);
              const mediaAvaliacao = parseFloat(ratingRes.data.media_avaliacao) || 0;
              return {
                ...portal,
                avaliacao_media: mediaAvaliacao
              };
            } catch (err) {
              console.error(`Erro ao buscar avaliação para portal ${portal.id_portal}:`, err);
              return {
                ...portal,
                avaliacao_media: 0
              };
            }
          })
        );
        setPortais(portaisWithRatings);
      } catch (err) {
        console.error('Erro ao listar portal:', err);
      }
    };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/portais/')) {
      return `http://localhost:3001${imagem}`;
    }
    return `http://localhost:3001/uploads/portais/${imagem}`;
  };

  const handleVisualizarClick = (id_portal) => {
    localStorage.setItem('id_portal', id_portal);
  };

  // Filtra os portais com base no termo de busca
  const filteredPortais = portais.filter((portal) =>
    portal.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatRating = (rating) => {
    const numRating = parseFloat(rating);
    return isNaN(numRating) ? "0.0" : numRating.toFixed(1);
  };

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
                <p className={style.tag1}>Média: ★ {formatRating(portal.avaliacao_media)}</p>
              </div>
            </div>
            <Link
              className={style.visualizarbtn}
              to={`/user/dashboard/portais/${portal.id_portal}/feedback`}
              onClick={() => handleVisualizarClick(portal.id_portal)}
              style={{ marginRight: '5px' }}
            >
              Visualizar
            </Link>
          </div>
        ))
      ) : (
        <p>Nenhum portal encontrado.</p>
      )}
    </div>
  );
};

export default PortaisListPageUser;
