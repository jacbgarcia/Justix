// src/pages/Foruns/ForunsList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MediacoesListPageO from '../../components/BD/MediacoesListPage';

const MediacoesListPage = () => {
  const navigate = useNavigate();

  const handleEdit = (mediador) => {
    navigate('/admin/dashboard/mediador/edit', { state: { mediador } });
  };

  const handleNew = () => {
    navigate('/admin/dashboard/mediador/new');
  };

  return (
    <div>
      <h2>Lista de Mediadores</h2>
      <button onClick={handleNew}>Novo Mediador</button>
      <MediacoesListPageO onEdit={handleEdit} />
    </div>
  );
};

export default MediacoesListPage;