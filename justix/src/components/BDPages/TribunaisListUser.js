import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../Card/Card.module.css';

const TribunaisListPageUser = () => {
  const [tribunais, setTribunais] = useState([]);

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


  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/tribunais/')) {
      return `http://localhost:3001${imagem}`;
    }
    return `http://localhost:3001/uploads/tribunais/${imagem}`;
  };

  return (
    <div>
      {tribunais.map(tribunal => (
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
                Média:  ★ {tribunal.avaliacao_media}
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

export default TribunaisListPageUser;