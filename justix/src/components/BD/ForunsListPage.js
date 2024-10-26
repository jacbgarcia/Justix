import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../Card/Card.module.css';

const ForunsListPageO = () => {
  const [foruns, setForuns] = useState([]);
  const [filteredForuns, setFilteredForuns] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de busca
  const navigate = useNavigate();

  useEffect(() => {
    listarForuns();
  }, []);

  const listarForuns = async () => {
    try {
      const res = await axios.get('http://localhost:3001/foruns');
      setForuns(res.data);
      setFilteredForuns(res.data); // Inicialmente, mostra todos os fóruns
    } catch (err) {
      console.error('Erro ao listar fóruns:', err);
    }
  };

  const excluirForum = async (id) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este fórum?');
    if (!confirmacao) return;

    try {
      await axios.delete(`http://localhost:3001/foruns/${id}`);
      listarForuns(); // Atualiza a lista após a exclusão
    } catch (err) {
      console.error('Erro ao excluir fórum:', err);
    }
  };

  const handleEdit = (forum) => {
    navigate('/admin/dashboard/foruns/edit', { state: { forum } });
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/foruns/')) {
      return `http://localhost:3001${imagem}`; // Apenas retorna a URL completa
    }
    return `http://localhost:3001/uploads/foruns/${imagem}`; // Adiciona o prefixo se não estiver presente
  };

  // Função para lidar com a mudança do campo de busca
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filtra fóruns com base no termo de busca
    const filtered = foruns.filter(forum =>
      forum.nome.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredForuns(filtered);
  };

  return (
    <div>
      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={style.searchInput} // Adicione uma classe de estilo, se desejar
      />

      {/* Renderização dos fóruns filtrados */}
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
              <div className={style.profileimg}>Sem imagem</div>
            )}
            <div className={style.cardinfo}>
              <h3>{forum.nome}</h3>
              <p className={style.tag}>
                {forum.endereco}, {forum.cidade} - {forum.estado}, {forum.cep}
              </p>
              <p className={style.tag1}>Média: ★ {forum.avaliacao_media}</p>
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
