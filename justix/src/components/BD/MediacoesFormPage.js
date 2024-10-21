import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const MediacoesFormPageO = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mediadorAtivo = location.state?.mediador || null;

  const [formData, setFormData] = useState({
    nome: '',
    estado: '',
    avaliacao_media: 0
  });

  useEffect(() => {
    if (mediadorAtivo) {
      setFormData(mediadorAtivo);
    }
  }, [mediadorAtivo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mediadorAtivo) {
        await axios.put(`http://localhost:3001/mediador/${mediadorAtivo.id_mediador}`, formData);
      } else {
        await axios.post('http://localhost:3001/mediador', formData);
      }
      navigate('/mediador');
    } catch (err) {
      console.error('Erro ao salvar mediador:', err);
    }
  };

  const handleCancel = () => {
    navigate('/mediador');
  };

  return (
    <div>
      <h3>{mediadorAtivo ? 'Editar Mediador' : 'Novo Mediador'}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Estado:</label>
          <input
            type="text"
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Avaliação Média:</label>
          <input
            type="number"
            value={formData.avaliacao_media}
            onChange={(e) => setFormData({ ...formData, avaliacao_media: e.target.value })}
            step="0.01"
            min="0"
            max="10"
            required
          />
        </div>
        <button type="submit">
          {mediadorAtivo ? 'Salvar Alterações' : 'Criar Mediador'}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default MediacoesFormPageO;