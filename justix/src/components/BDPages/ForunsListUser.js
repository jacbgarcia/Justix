import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../Card/Card.module.css';
import { Link } from 'react-router-dom';

const ForunsListPageUser = () => {
  const [foruns, setForuns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    listarForuns();
  }, []);

  const listarForuns = async () => {
    try {
      const res = await axios.get('http://localhost:3001/foruns');
      const forunsWithRatings = await Promise.all(
        res.data.map(async (forum) => {
          try {
            const ratingRes = await axios.get(`http://localhost:3001/foruns_avaliacao/${forum.id_forum}`);
            const mediaAvaliacao = parseFloat(ratingRes.data.media_avaliacao) || 0;
            return {
              ...forum,
              avaliacao_media: mediaAvaliacao
            };
          } catch (err) {
            console.error(`Erro ao buscar avaliação para fórum ${forum.id_forum}:`, err);
            return {
              ...forum,
              avaliacao_media: 0
            };
          }
        })
      );
      setForuns(forunsWithRatings);
    } catch (err) {
      console.error('Erro ao listar fóruns:', err);
    }
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/foruns/')) {
      return `http://localhost:3001${imagem}`;
    }
    return `http://localhost:3001/uploads/foruns/${imagem}`;
  };

  const handleVisualizarClick = (id_forum) => {
    localStorage.setItem('id_forum', id_forum);
  };

  const filteredForuns = foruns.filter(forum => 
    forum.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    forum.endereco.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatRating = (rating) => {
    const numRating = parseFloat(rating);
    return isNaN(numRating) ? "0.0" : numRating.toFixed(1);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={style.searchInput}
      />

      {filteredForuns.map(forum => (
        <div key={forum.id_forum} className={style.card}>
          <div className={style.cardleft}>
            {forum.imagem ? (
              <img
                src={getImagemUrl(forum.imagem)}
                alt={`Imagem de ${forum.nome}`}
                className={style.cardleft1}
              />
            ) : (
              <div className={style.profileimg}>
                Sem imagem
              </div>
            )}
            <div className={style.cardinfo}>
              <h3>{forum.nome}</h3>
              <p className={style.tag}>
                {forum.endereco}, {forum.cidade} - {forum.estado}, {forum.cep}
              </p>
              <p className={style.tag1}>
                Média: ★ {formatRating(forum.avaliacao_media)}
              </p>
            </div>
          </div>
          <div>
            <Link
              className={style.visualizarbtn}
              to={`/user/dashboard/foruns/${forum.id_forum}/feedback`}
              onClick={() => handleVisualizarClick(forum.id_forum)}
              style={{ marginRight: '5px' }}
            >
              Visualizar
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForunsListPageUser;