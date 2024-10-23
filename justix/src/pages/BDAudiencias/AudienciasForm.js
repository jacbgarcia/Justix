// src/pages/Tribunais/TribunaisFormPage.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AudienciasFormPageO from '../../components/BD/AudienciasFormPage';

const AudienciasFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const juizAtivo = location.state?.juiz || null;

  const handleSave = async (juiz) => {
    // Lógica de salvamento via API
    navigate('/admin/dashboard/juiz');
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/juiz');
  };

  return (
    <div>
      <AudienciasFormPageO juizAtivo={juizAtivo} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default AudienciasFormPage;
