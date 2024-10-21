// src/pages/Tribunais/TribunaisFormPage.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AudienciasListPageO from '../../components/BD/AudienciasFormPage';

const AudienciasFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const juizAtivo = location.state?.juiz || null;

  const handleSave = async (tribunal) => {
    // Lógica de salvamento via API
    navigate('/juiz');
  };

  const handleCancel = () => {
    navigate('/juiz');
  };

  return (
    <div>
      <AudienciasListPageO juizAtivo={juizAtivo} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default AudienciasFormPage;
