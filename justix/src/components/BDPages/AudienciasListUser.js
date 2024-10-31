import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../Card/Card.module.css';
import { Link } from 'react-router-dom';

const AudienciasListPageUser = () => {
  const [juizes, setJuizes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de busca

  useEffect(() => {
    listarJuiz();
  }, []);

  const listarJuiz = async () => {
    try {
      const res = await axios.get('http://localhost:3001/juiz');
      const juizWithRatings = await Promise.all(
        res.data.map(async (juiz) => {
          try {
            const ratingRes = await axios.get(`http://localhost:3001/juiz_avaliacao/${juiz.id_juiz}`);
            const mediaAvaliacao = parseFloat(ratingRes.data.media_avaliacao) || 0;
            return {
              ...juiz,
              avaliacao_media: mediaAvaliacao
            };
          } catch (err) {
            console.error(`Erro ao buscar avaliação para fórum ${juiz.id_juiz}:`, err);
            return {
              ...juiz,
              avaliacao_media: 0
            };
          }
        })
      );
      setJuizes(juizWithRatings);
    } catch (err) {
      console.error('Erro ao listar fóruns:', err);
    }
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/juiz/')) {
      return `http://localhost:3001${imagem}`;
    }
    return `http://localhost:3001/uploads/juiz/${imagem}`;
  };

  const handleVisualizarClick = (id_juiz) => {
    localStorage.setItem('id_juiz', id_juiz);
  };

  // Filtra os juízes com base no termo de busca
  const filteredJuizes = juizes.filter(juiz => 
    juiz.nome.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra por nome
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
        className={style.searchInput} // Adicione uma classe de estilo, se desejar
      />

      {filteredJuizes.map(juiz => (
        <div key={juiz.id_juiz} className={style.card}>
          <div className={style.cardleft}>
            {juiz.imagem ? (
              <img
                src={getImagemUrl(juiz.imagem)}
                alt={`Imagem de ${juiz.nome}`}
                className={style.cardleft1}
              />
            ) : (
              <div className={style.profileimg}>
                Sem imagem
              </div>
            )}
            <div className={style.cardinfo}>
              <h3>{juiz.nome}</h3>
              <p className={style.tag}>
                {juiz.tempo_servico} anos de serviço - {juiz.casos_julgados} casos julgados
              </p>
              <p className={style.tag1}>
                Média:  ★ {formatRating(juiz.avaliacao_media)}
              </p>
            </div>
          </div>
          
          <div>
          <Link
              className={style.visualizarbtn}
              to={`/user/dashboard/audiencias/${juiz.id_juiz}/feedback`}
              onClick={() => handleVisualizarClick(juiz.id_juiz)}
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

export default AudienciasListPageUser;
