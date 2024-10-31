import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../Card/Card.module.css';
import { Link } from 'react-router-dom';

const AdvocaciaListPageUser = () => {
  const [advocacia, setAdvocacia] = useState([]);
  const [filteredAdvocacia, setFilteredAdvocacia] = useState([]);
  const [filter, setFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listarAdvocacia();
  }, []);

  useEffect(() => {
    const filtered = filter === 'todos' 
      ? advocacia 
      : advocacia.filter(prof => prof.profissao === filter);

    const searchFiltered = filtered.filter(prof => 
      prof.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredAdvocacia(searchFiltered);
  }, [advocacia, filter, searchTerm]);

  const listarAdvocacia = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3001/advocacia');
      
      const advocaciaWithRatings = await Promise.all(
        res.data.map(async (advocacia) => {
          try {
            const ratingRes = await axios.get(`http://localhost:3001/advocacia_avaliacao/${advocacia.id_advocacia}`);
            const mediaAvaliacao = parseFloat(ratingRes.data.media_avaliacao) || 0;
            return {
              ...advocacia,
              avaliacao_media: mediaAvaliacao
            };
          } catch (err) {
            console.error(`Erro ao buscar avaliação para advocacia ${advocacia.id_advocacia}:`, err);
            return {
              ...advocacia,
              avaliacao_media: 0
            };
          }
        })
      );
      
      setAdvocacia(advocaciaWithRatings);
      setFilteredAdvocacia(advocaciaWithRatings);
    } catch (err) {
      console.error('Erro ao listar advocacia:', err);
    } finally {
      setLoading(false);
    }
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/')) {
      return `http://localhost:3001${imagem}`;
    }
    return `http://localhost:3001/uploads/${imagem}`;
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleVisualizarClick = (id_advocacia) => {
    localStorage.setItem('id_advocacia', id_advocacia);
  };

  const formatRating = (rating) => {
    const numRating = parseFloat(rating);
    return isNaN(numRating) ? "0.0" : numRating.toFixed(1);
  };

  const renderAdvocaciaInfo = (advocacia) => {
    switch (advocacia.profissao) {
      case 'Escritório':
        return (
          <div className={style.cardinfo}>
            <h3>{advocacia.nome}</h3>
            <p className={style.tag1}>Endereço: {advocacia.endereco}</p>
            <p className={style.tag}>Escritório</p>
            <p className={style.tag}>Média: ★{formatRating(advocacia.avaliacao_media)}</p>
          </div>
        );
      case 'Advogado':
        return (
          <div className={style.cardinfo}>
            <h3>{advocacia.nome}</h3>
            <p className={style.tag}>{advocacia.experiencia} anos de experiência</p>
            <p className={style.tag1}>{advocacia.escritorio}</p>
            <p className={style.tag}>Advogado</p>
            <p className={style.tag}>Média: ★{formatRating(advocacia.avaliacao_media)}</p>
          </div>
        );
      case 'Promotor':
        return (
          <div className={style.cardinfo}>
            <h3>{advocacia.nome}</h3>
            <p className={style.tag1}>{advocacia.experiencia} anos de experiência</p>
            <p className={style.tag}>Promotor</p>
            <p className={style.tag}>Média: ★{formatRating(advocacia.avaliacao_media)}</p>
          </div>
        );
      default:
        return (
          <div className={style.cardinfo}>
            <h3>{advocacia.nome}</h3>
            <p className={style.tag}>Advocacia</p>
            <p className={style.tag}>Média: ★{formatRating(advocacia.avaliacao_media)}</p>
          </div>
        );
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={style.searchInput}
      />

      <div>
        <select
          onChange={handleFilterChange}
          value={filter}
          className={style.container}
        >
          <option value="todos">Todos</option>
          <option value="Escritório">Escritórios</option>
          <option value="Advogado">Advogados</option>
          <option value="Promotor">Promotores</option>
        </select>
      </div>

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAdvocacia.map((advocacia) => (
            <div key={advocacia.id_advocacia} className={style.card}>
              <div className={style.cardleft}>
                {advocacia.imagem ? (
                  <img
                    src={getImagemUrl(advocacia.imagem)}
                    alt={`Imagem de ${advocacia.nome}`}
                    className={style.cardleft1}
                  />
                ) : (
                  <div className={style.profileimg}>Sem imagem</div>
                )}
                {renderAdvocaciaInfo(advocacia)}
              </div>
              <div>
                <Link
                  className={style.visualizarbtn}
                  to={`/user/dashboard/advocacia/${advocacia.id_advocacia}/feedback`}
                  onClick={() => handleVisualizarClick(advocacia.id_advocacia)}
                  style={{ marginRight: '5px' }}
                >
                  Visualizar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvocaciaListPageUser;