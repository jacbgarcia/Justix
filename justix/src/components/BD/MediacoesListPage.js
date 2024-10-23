import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../Card/Card.module.css';

const MediacoesListPageO = () => {
  const [mediador, setMediadores] = useState([]);
  const navigate = useNavigate();

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

  const excluirMediador = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/mediador/${id}`);
      listarMediadores();
    } catch (err) {
      console.error('Erro ao excluir mediador:', err);
    }
  };

  const handleEdit = (mediador) => {
    navigate('/admin/dashboard/mediador/edit', { state: { mediador } });
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
                  onClick={() => handleEdit(mediador)}
                  style={{ marginRight: '5px' }}
                >
                  Editar
                </button>
                <button
                  className={style.visualizarbtn} 
                  onClick={() => excluirMediador(mediador.id_mediador)}
                >
                  Excluir
                </button>
                </div>
              
            </div>
          ))}
        </div>
  );
};

export default MediacoesListPageO;