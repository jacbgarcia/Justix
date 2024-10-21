import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AudienciasFormPageO = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const juizAtivo = location.state?.juiz || null;

  const [formData, setFormData] = useState({
    nome: '',
    tempo_servico: '',
    casos_julgados: '',
    avaliacao_media: 0
  });

  useEffect(() => {
    if (juizAtivo) {
      setFormData(juizAtivo);
    }
  }, [juizAtivo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (juizAtivo) {
        await axios.put(`http://localhost:3001/juiz/${juizAtivo.id_juiz}`, formData);
      } else {
        await axios.post('http://localhost:3001/juiz', formData);
      }
      navigate('/juiz');
    } catch (err) {
      console.error('Erro ao salvar juiz:', err);
    }
  };

  const handleCancel = () => {
    navigate('/juiz');
  };

  return (
    <div>
      <h3>{juizAtivo ? 'Editar Juiz' : 'Novo Juiz'}</h3>
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
          <label>Tempo de Serviço:</label>
          <input
            type="text"
            value={formData.tempo_servico}
            onChange={(e) => setFormData({ ...formData, tempo_servico: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Casos Julgados:</label>
          <input
            type="text"
            value={formData.casos_julgados}
            onChange={(e) => setFormData({ ...formData, casos_julgados: e.target.value })}
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
          {juizAtivo ? 'Salvar Alterações' : 'Criar Juiz'}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default AudienciasFormPageO;