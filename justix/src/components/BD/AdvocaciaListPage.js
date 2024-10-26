import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../Card/Card.module.css';

const AdvocaciaListPageO = () => {
  const [profissionais, setProfissionais] = useState([]);
  const [filteredProfissionais, setFilteredProfissionais] = useState([]);
  const [filter, setFilter] = useState('todos'); // Estado para controlar o filtro
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de busca
  const navigate = useNavigate();

  useEffect(() => {
    listarProfissionais();
  }, []);

  // Função para listar os profissionais
  const listarProfissionais = async () => {
    try {
      const res = await axios.get('http://localhost:3001/advocacia');
      setProfissionais(res.data);
      setFilteredProfissionais(res.data); // Inicialmente, mostra todos os profissionais
    } catch (err) {
      console.error('Erro ao listar profissionais:', err);
    }
  };

  // Função para excluir um profissional
  const excluirProfissional = async (id) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este card?');
    if (!confirmacao) return;

    try {
      await axios.delete(`http://localhost:3001/advocacia/${id}`);
      listarProfissionais(); // Atualiza a lista após a exclusão
    } catch (err) {
      console.error('Erro ao excluir profissional:', err);
    }
  };

  // Função para editar um profissional
  const handleEdit = (profissional) => {
    navigate('/admin/dashboard/advocacia/edit', { state: { advocacia: profissional } });
  };

  // Função para obter a URL da imagem
  const getImagemUrl = (imagem) => {
    if (!imagem) return null;
    if (imagem.startsWith('/uploads/')) {
      return `http://localhost:3001${imagem}`;
    }
    return `http://localhost:3001/uploads/${imagem}`;
  };

  // Função para filtrar os profissionais pela profissão
  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);

    const filtered = selectedFilter === 'todos' 
      ? profissionais 
      : profissionais.filter(prof => prof.profissao === selectedFilter);

    // Aplica também o filtro pelo termo de busca
    setFilteredProfissionais(filtered.filter(prof => 
      prof.nome.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  };

  // Função para lidar com a mudança do campo de busca
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filtra profissionais com base no termo de busca e no filtro de profissão
    const filtered = profissionais.filter(prof => 
      prof.nome.toLowerCase().includes(term.toLowerCase())
    );

    // Aplica o filtro de profissão
    if (filter !== 'todos') {
      setFilteredProfissionais(filtered.filter(prof => prof.profissao === filter));
    } else {
      setFilteredProfissionais(filtered);
    }
  };

  // Função para renderizar informações específicas baseado na profissão
  const renderProfissionalInfo = (profissional) => {
    switch (profissional.profissao) {
      case 'Escritório':
        return (
          <div className={style.cardinfo}>
            <h3>{profissional.nome}</h3>
            <p className={style.tag1}>Endereço: {profissional.endereco}</p>
            <p className={style.tag}>Escritório</p>
            <p className={style.tag}>Média:  ★{profissional.avaliacao_media}</p>
          </div>
        );
      case 'Advogado':
        return (
          <div className={style.cardinfo}>
            <h3>{profissional.nome}</h3>
            <p className={style.tag}>{profissional.experiencia} anos de experiência</p>
            <p className={style.tag1}>{profissional.escritorio}</p>
            <p className={style.tag}>Advogado</p>
            <p className={style.tag}>Média:  ★{profissional.avaliacao_media}</p>
          </div>
        );
      case 'Promotor':
        return (
          <div className={style.cardinfo}>
            <h3>{profissional.nome}</h3>
            <p className={style.tag1}>{profissional.experiencia} anos de experiência</p>
            <p className={style.tag}>Promotor</p>
            <p className={style.tag}>Média:  ★{profissional.avaliacao_media}</p>
          </div>
        );
      default:
        return (
          <div className={style.cardinfo}>
            <h3>{profissional.nome}</h3>
            <p className={style.tag}>Profissional</p>
            <p className={style.tag}>Média:  ★{profissional.avaliacao_media}</p>
          </div>
        );
    }
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

      {/* Dropdown para selecionar o filtro */}
      <div>
        <select
          onChange={handleFilterChange}
          value={filter}
          className={style.container}
        >
          <option value="todos">Todos</option>
          <option value="Escritório">Escritórios</option>
          <option value="Advogado">Advogados</option>
          <option value="Promotor">Promotores</option>
        </select>
      </div>

      {/* Renderização dos profissionais filtrados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfissionais.map((profissional) => (
          <div key={profissional.id_advocacia} className={style.card}>
            <div className={style.cardleft}>
              {profissional.imagem ? (
                <img
                  src={getImagemUrl(profissional.imagem)}
                  alt={`Imagem de ${profissional.nome}`}
                  className={style.cardleft1}
                />
              ) : (
                <div className={style.profileimg}>Sem imagem</div>
              )}
              {renderProfissionalInfo(profissional)}
            </div>
            <div>
              <button
                className={style.visualizarbtn}
                onClick={() => handleEdit(profissional)}
                style={{ marginRight: '5px' }}
              >
                Editar
              </button>
              <button
                className={style.visualizarbtn}
                onClick={() => excluirProfissional(profissional.id_advocacia)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvocaciaListPageO;
