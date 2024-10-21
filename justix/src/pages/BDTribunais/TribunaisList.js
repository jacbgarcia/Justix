// src/pages/Tribunais/TribunaisListPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TribunaisListPageO from '../../components/BD/TribunaisListPage';


const TribunaisListPage = () => {
  const navigate = useNavigate();

  const handleEdit = (tribunal) => {
    navigate('/tribunais/edit', { state: { tribunal } });
  };

  const handleNew = () => {
    navigate('/tribunais/new');
  };

  return (
    <div>
      <h2>Lista de Tribunais</h2>
      <button onClick={handleNew}>Novo Tribunal</button>
      <TribunaisListPageO onEdit={handleEdit} />
    </div>
  );
};

export default TribunaisListPage;
