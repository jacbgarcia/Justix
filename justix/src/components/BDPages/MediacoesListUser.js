import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../Card/Card.module.css';

const MediacoesListPageUser = () => {
  const [mediadores, setMediadores] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de busca

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

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/mediador/')) {
      return `http://localhost:3001${imagem}`;
    }
    return `http://localhost:3001/uploads/mediador/${imagem}`;
  };

  // Filtra os mediadores com base no termo de busca
  const filteredMediadores = mediadores.filter(mediador => 
    mediador.nome.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtra por nome
    mediador.estado.toLowerCase().includes(searchTerm.toLowerCase())  // Filtra por estado
  );

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

      {filteredMediadores.map(mediador => (
        <div key={mediador.id_mediador} className={style.card}>
          <div className={style.cardleft}>
            {mediador.imagem ? (
              <img
                src={getImagemUrl(mediador.imagem)}
                alt={`Imagem de ${mediador.nome}`}
                className={style.cardleft1}
              />
            ) : (
              <div className={style.profileimg}>
                Sem imagem
              </div>
            )}
            <div className={style.cardinfo}>
              <h3>{mediador.nome}</h3>
              <p className={style.tag}>
                {mediador.estado}
              </p>
              <p className={style.tag1}>
                Média:  ★ {mediador.avaliacao_media}
              </p>
            </div>
          </div>
          
          <div>
            <button
              className={style.visualizarbtn}
              style={{ marginRight: '5px' }}
            >
              Visualizar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediacoesListPageUser;
