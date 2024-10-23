import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../Card/Card.module.css';

const AudienciasListPageUser = () => {
  const [juiz, setJuiz] = useState([]);

  useEffect(() => {
    listarJuiz();
  }, []);

  const listarJuiz = async () => {
    try {
      const res = await axios.get('http://localhost:3001/juiz');
      setJuiz(res.data);
    } catch (err) {
      console.error('Erro ao listar juizes:', err);
    }
  };

  

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    // Verifique se a imagem já contém o prefixo
    if (imagem.startsWith('/uploads/juiz/')) {
      return `http://localhost:3001${imagem}`; // Apenas retorna a URL completa
    }
    return `http://localhost:3001/uploads/juiz/${imagem}`; // Adiciona o prefixo se não estiver presente
  };

  return (
    <div> 
          {juiz.map(juiz => (
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
                Média:  ★ {juiz.avaliacao_media}
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

export default AudienciasListPageUser;