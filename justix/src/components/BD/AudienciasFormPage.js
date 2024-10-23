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

  const [imagemFile, setImagemFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);


  useEffect(() => {
    if (juizAtivo) {
      setFormData(juizAtivo);
      if (juizAtivo.imagem) {
        setPreviewUrl(`http://localhost:3001/uploads/${juizAtivo.imagem}`);
      }
    }
  }, [juizAtivo]);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitFormData = new FormData();
      
      // Adiciona todos os campos do formulário ao FormData
      Object.keys(formData).forEach(key => {
        submitFormData.append(key, formData[key]);
      });

      // Adiciona a imagem apenas se uma nova imagem foi selecionada
      if (imagemFile) {
        submitFormData.append('imagem', imagemFile);
      }

      if (juizAtivo) {
        await axios.put(
          `http://localhost:3001/juiz/${juizAtivo.id_juiz}`,
          submitFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else {
        await axios.post(
          'http://localhost:3001/juiz',
          submitFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }
      navigate('/admin/dashboard/juiz');
    } catch (err) {
      console.error('Erro ao salvar juiz:', err);
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/juiz');
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
        <div>
          <label>Foto:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagemChange}
          />
          {previewUrl && (
            <div>
              <img 
                src={previewUrl} 
                alt="Preview" 
                style={{ maxWidth: '200px', marginTop: '10px' }}
              />
            </div>
          )}
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