import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const TribunaisFormPageO = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tribunalAtivo = location.state?.tribunal || null;

  const [formData, setFormData] = useState({
    nome: '',
    cidade: '',
    estado: '',
    endereco: '',
    cep: '',
    avaliacao_media: 0
  });

  useEffect(() => {
    if (tribunalAtivo) {
      setFormData(tribunalAtivo);
    }
  }, [tribunalAtivo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (tribunalAtivo) {
        await axios.put(`http://localhost:3001/tribunais/${tribunalAtivo.id_tribunal}`, formData);
      } else {
        await axios.post('http://localhost:3001/tribunais', formData);
      }
      navigate('/tribunais');
    } catch (err) {
      console.error('Erro ao salvar tribunal:', err);
    }
  };

  const handleCancel = () => {
    navigate('/tribunais');
  };

  return (
    <div>
      <h3>{tribunalAtivo ? 'Editar Tribunal' : 'Novo Tribunal'}</h3>
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
          <label>Cidade:</label>
          <input
            type="text"
            value={formData.cidade}
            onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
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
          <label>Endereço:</label>
          <input
            type="text"
            value={formData.endereco}
            onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
          />
        </div>
        <div>
          <label>CEP:</label>
          <input
            type="text"
            value={formData.cep}
            onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
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
          {tribunalAtivo ? 'Salvar Alterações' : 'Criar Tribunal'}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default TribunaisFormPageO;