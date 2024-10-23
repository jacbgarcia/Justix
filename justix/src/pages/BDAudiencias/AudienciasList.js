// src/pages/Tribunais/TribunaisListPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AudienciasListPageO from '../../components/BD/AudienciasListPage';
import HeaderLggd from '../../components/HeaderLggd';
import  Footer from '../../components/Footer';
import ContainerLggd from '../../components/ContainerLggd'
import style from '../../components/Card/Card.module.css';
import {Link} from "react-router-dom";


const AudienciasListPage = () => {
  const navigate = useNavigate();

  const handleEdit = (juiz) => {
    navigate('/admin/dashboard/juiz/edit', { state: { juiz } });
  };

  const handleNew = () => {
    navigate('/admin/dashboard/juiz/new');
  };

  return (
    <>
    <HeaderLggd>
      <div className={style.navlinkscontainer}>
      <Link to="/admin/dashboard/tribunais" className={style.navlinksl}>Tribunais</Link>
      <Link to="/admin/dashboard/foruns" className={style.navlinksl}>Fóruns</Link>
      <Link to="" className={style.navlinks2}>Audiências</Link>
      <Link to="/admin/dashboard/mediador" className={style.navlinksl}>Mediações</Link>
      </div>
    </HeaderLggd>
    <ContainerLggd>
    
    <div class="flex items-center justify-center space-x-4">
      <h2 class="text-center text-xl">Lista de Juizes</h2>
      <button className={style.visualizarbtn1} onClick={handleNew}>Adicionar Juiz</button>
   </div>   
   <AudienciasListPageO onEdit={handleEdit} />
    
    
    
    <Footer/>
    </ContainerLggd>
    </>
  );
};

export default AudienciasListPage;
