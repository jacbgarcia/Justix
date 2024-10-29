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
      setForuns(res.data);
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
    localStorage.setItem('id_forum', id_forum); // Armazena o id_forum no localStorage
  };

  const filteredForuns = foruns.filter(forum => 
    forum.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    forum.endereco.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                Média:  ★ {forum.avaliacao_media}
              </p>
            </div>
          </div>
          
          <div>
            <Link
              className={style.visualizarbtn}
              to={`/user/dashboard/foruns/${forum.id_forum}/feedback`}
              onClick={() => handleVisualizarClick(forum.id_forum)} // Armazena o id_forum ao clicar
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
