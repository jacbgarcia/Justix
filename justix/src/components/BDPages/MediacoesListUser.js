import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../Card/Card.module.css';

const MediacoesListPageUser = () => {
  const [mediador, setMediadores] = useState([]);

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

  return (
    
        <div>
          {mediador.map(mediador => (
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