// src/pages/Foruns/ForunsFormPage.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ForunsFormPageO from '../../components/BD/ForunsFormPage';

const ForunsFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const forumAtivo = location.state?.forum || null;

  const handleSave = async (forum) => {
    // Lógica de salvamento via API
    navigate('/admin/dashboard/foruns');
  };

  const handleCancel = () => {
    navigate('/admin/dashboard/foruns');
  };

  return (
    <div>
      <ForunsFormPageO forumAtivo={forumAtivo} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
};

export default ForunsFormPage;