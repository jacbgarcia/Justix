import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../Card/Card.module.css';

const AudienciasListPageO = () => {
  const [juizes, setJuizes] = useState([]);
  const [filteredJuizes, setFilteredJuizes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de busca
  const navigate = useNavigate();

  useEffect(() => {
    listarJuizes();
  }, []);

  const listarJuizes = async () => {
    try {
      const res = await axios.get('http://localhost:3001/juiz');
      setJuizes(res.data);
      setFilteredJuizes(res.data); // Inicialmente, mostra todos os juízes
    } catch (err) {
      console.error('Erro ao listar juízes:', err);
    }
  };

  const excluirJuiz = async (id) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este juiz?');
    if (!confirmacao) return;

    try {
      await axios.delete(`http://localhost:3001/juiz/${id}`);
      listarJuizes(); // Atualiza a lista após a exclusão
    } catch (err) {
      console.error('Erro ao excluir juiz:', err);
    }
  };

  const handleEdit = (juiz) => {
    navigate('/admin/dashboard/juiz/edit', { state: { juiz } });
  };

  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    // Verifique se a imagem já contém o prefixo
    if (imagem.startsWith('/uploads/juiz/')) {
      return `http://localhost:3001${imagem}`; // Apenas retorna a URL completa
    }
    return `http://localhost:3001/uploads/juiz/${imagem}`; // Adiciona o prefixo se não estiver presente
  };

  // Função para lidar com a mudança do campo de busca
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filtra juízes com base no termo de busca
    const filtered = juizes.filter(juiz => 
      juiz.nome.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredJuizes(filtered);
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

      {/* Renderização dos juízes filtrados */}
      {filteredJuizes.map(juiz => (
        <div key={juiz.id_juiz} className={style.card}>
          <div className={style.cardleft}>
            {juiz.imagem ? (
              <img
                src={getImagemUrl(juiz.imagem)}
                alt={`Imagem de ${juiz.nome}`}
                className={style.cardleft1}
              />
            ) : (
              <div className={style.profileimg}>Sem imagem</div>
            )}
            <div className={style.cardinfo}>
              <h3>{juiz.nome}</h3>
              <p className={style.tag}>
                {juiz.tempo_servico} anos de serviço - {juiz.casos_julgados} casos julgados
              </p>
              <p className={style.tag1}>Média: ★ {juiz.avaliacao_media}</p>
            </div>
          </div>
          <div>
            <button
              className={style.visualizarbtn}
              onClick={() => handleEdit(juiz)}
              style={{ marginRight: '5px' }}
            >
              Editar
            </button>
            <button 
              className={style.visualizarbtn}
              onClick={() => excluirJuiz(juiz.id_juiz)}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AudienciasListPageO;
