import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../Card/Card.module.css';

const ForunsListPageO = () => {
  const [foruns, setForuns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listarForuns();
  }, []);

  const listarForuns = async () => {
    try {
      const res = await axios.get('http://localhost:3001/foruns');
      setForuns(res.data);
    } catch (err) {
      console.error('Erro ao listar fóruns:', err);
    }
  };

  const excluirForum = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/foruns/${id}`);
      listarForuns();
    } catch (err) {
      console.error('Erro ao excluir fórum:', err);
    }
  };

  const handleEdit = (forum) => {
    navigate('/admin/dashboard/foruns/edit', { state: { forum } });
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    // Verifique se a imagem já contém o prefixo
    if (imagem.startsWith('/uploads/foruns/')) {
        return `http://localhost:3001${imagem}`; // Apenas retorna a URL completa
    }
    return `http://localhost:3001/uploads/foruns/${imagem}`; // Adiciona o prefixo se não estiver presente
};

  return (
    <div>
          {foruns.map(forum => (
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
                Média:  ★ {forum.avaliacao_media}
              </p>
            </div>
              </div>
             <div>
                <button 
                className={style.visualizarbtn}
                  onClick={() => handleEdit(forum)}
                  style={{ marginRight: '5px' }}
                >
                  Editar
                </button>
                <button 
                className={style.visualizarbtn}
                  onClick={() => excluirForum(forum.id_forum)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default ForunsListPageO;