import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../Card/Card.module.css';
import { Link } from 'react-router-dom';

const TribunaisListPageUser = () => {
  const [tribunais, setTribunais] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de busca

  useEffect(() => {
    listarTribunais();
  }, []);

  const listarTribunais = async () => {
    try {
      const res = await axios.get('http://localhost:3001/tribunais');
      const tribunaisWithRatings = await Promise.all(
        res.data.map(async (tribunal) => {
          try {
            const ratingRes = await axios.get(`http://localhost:3001/tribunais_avaliacao/${tribunal.id_tribunal}`);
            const mediaAvaliacao = parseFloat(ratingRes.data.media_avaliacao) || 0;
            return {
              ...tribunal,
              avaliacao_media: mediaAvaliacao
            };
          } catch (err) {
            console.error(`Erro ao buscar avaliação para fórum ${tribunal.id_tribunal}:`, err);
            return {
              ...tribunal,
              avaliacao_media: 0
            };
          }
        })
      );
      setTribunais(tribunaisWithRatings);
    } catch (err) {
      console.error('Erro ao listar fóruns:', err);
    }
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/tribunais/')) {
      return `http://localhost:3001${imagem}`;
    }
    return `http://localhost:3001/uploads/tribunais/${imagem}`;
  };

  const handleVisualizarClick = (id_tribunal) => {
    localStorage.setItem('id_tribunal', id_tribunal);
  };

  const filteredTribunais = tribunais.filter(tribunal => 
    tribunal.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tribunal.endereco.toLowerCase().includes(searchTerm.toLowerCase())
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

      {filteredTribunais.map(tribunal => (
        <div key={tribunal.id_tribunal} className={style.card}>
          <div className={style.cardleft}>
            {tribunal.imagem ? (
              <img
                src={getImagemUrl(tribunal.imagem)}
                alt={`Imagem de ${tribunal.nome}`}
                className={style.cardleft1}
              />
            ) : (
              <div className={style.profileimg}>
                Sem imagem
              </div>
            )}
            <div className={style.cardinfo}>
              <h3>{tribunal.nome}</h3>
              <p className={style.tag}>
                {tribunal.endereco}, {tribunal.cidade} - {tribunal.estado}, {tribunal.cep}
              </p>
              <p className={style.tag1}>
                Média: ★ {formatRating(tribunal.avaliacao_media)}
              </p>
            </div>
          </div>
          
          <div>
            <Link
              className={style.visualizarbtn}
              to={`/user/dashboard/tribunais/${tribunal.id_tribunal}/feedback`}
              onClick={() => handleVisualizarClick(tribunal.id_tribunal)}
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

export default TribunaisListPageUser;