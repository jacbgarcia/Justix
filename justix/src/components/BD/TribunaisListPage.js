import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../Card/Card.module.css';

const TribunaisListPageO = () => {
  const [tribunais, setTribunais] = useState([]);
  const [filteredTribunais, setFilteredTribunais] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de busca
  const navigate = useNavigate();

  useEffect(() => {
    listarTribunais();
  }, []);

  const listarTribunais = async () => {
    try {
      const res = await axios.get('http://localhost:3001/tribunais');
      setTribunais(res.data);
      setFilteredTribunais(res.data); // Inicialmente, exibe todos os tribunais
    } catch (err) {
      console.error('Erro ao listar tribunais:', err);
    }
  };

  const excluirTribunal = async (id) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este tribunal?');
    if (!confirmacao) return;

    try {
      await axios.delete(`http://localhost:3001/tribunais/${id}`);
      listarTribunais(); // Atualiza a lista após a exclusão
    } catch (err) {
      console.error('Erro ao excluir tribunal:', err);
    }
  };

  const handleEdit = (tribunal) => {
    navigate('/admin/dashboard/tribunais/edit', { state: { tribunal } });
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/tribunais/')) {
      return `http://localhost:3001${imagem}`;
    }
    return `http://localhost:3001/uploads/tribunais/${imagem}`;
  };

  // Função para lidar com a mudança no campo de busca
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filtra tribunais com base no termo de busca
    const filtered = tribunais.filter(tribunal =>
      tribunal.nome.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredTribunais(filtered);
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

      {/* Renderização dos tribunais filtrados */}
      {filteredTribunais.map(tribunal => (
        <div key={tribunal.id_tribunal} className={style.card}>
          <div className={style.cardleft}>
            {tribunal.imagem ? (
              <img
                src={getImagemUrl(tribunal.imagem)}
                alt={`Imagem de ${tribunal.nome}`}
                className={style.cardleft1}
              />
            ) : (
              <div className={style.profileimg}>Sem imagem</div>
            )}
            <div className={style.cardinfo}>
              <h3>{tribunal.nome}</h3>
              <p className={style.tag}>
                {tribunal.endereco}, {tribunal.cidade} - {tribunal.estado}, {tribunal.cep}
              </p>
              <p className={style.tag1}>Média: ★ {tribunal.avaliacao_media}</p>
            </div>
          </div>
          
          <div>
            <button
              className={style.visualizarbtn}
              onClick={() => handleEdit(tribunal)}
              style={{ marginRight: '10px' }}
            >
              Editar
            </button>
            <button
              className={style.visualizarbtn}
              onClick={() => excluirTribunal(tribunal.id_tribunal)}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TribunaisListPageO;
