// src/pages/Tribunais/TribunaisFormPage.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TribunaisFormPageO from '../../components/BD/TribunaisFormPage';

const TribunaisFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tribunalAtivo = location.state?.tribunal || null;

  const handleSave = async (tribunal) => {
    // Lógica de salvamento via API
    navigate('/tribunais');
  };

  const handleCancel = () => {
    navigate('/tribunais');
  };

  return (
    <div>
      <TribunaisFormPageO tribunalAtivo={tribunalAtivo} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default TribunaisFormPage;
