import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../Card/Card.module.css';

const ForunsListPageUser = () => {
  const [foruns, setForuns] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de busca

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

  // Filtra os fóruns com base no termo de busca
  const filteredForuns = foruns.filter(forum => 
    forum.nome.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtra por nome
    forum.endereco.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra por endereço
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

export default ForunsListPageUser;
