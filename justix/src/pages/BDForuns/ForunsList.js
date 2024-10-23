// src/pages/Foruns/ForunsList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ForunsListPageO from '../../components/BD/ForunsListPage';

const ForunsListPage = () => {
  const navigate = useNavigate();

  const handleEdit = (forum) => {
    navigate('/admin/dashboard/foruns/edit', { state: { forum } });
  };

  const handleNew = () => {
    navigate('/admin/dashboard/foruns/new');
  };

  return (
    <div>
      <h2>Lista de Fóruns</h2>
      <button onClick={handleNew}>Novo Fórum</button>
      <ForunsListPageO onEdit={handleEdit} />
    </div>
  );
};

export default ForunsListPage;