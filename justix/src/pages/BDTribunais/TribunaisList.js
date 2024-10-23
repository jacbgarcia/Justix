// src/pages/Tribunais/TribunaisListPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TribunaisListPageO from '../../components/BD/TribunaisListPage';
import HeaderLggd from '../../components/HeaderLggd';
import  Footer from '../../components/Footer';
import ContainerLggd from '../../components/ContainerLggd'
import style from '../../components/Card/Card.module.css';
import {Link} from "react-router-dom";




const TribunaisListPage = () => {
  const navigate = useNavigate();

  const handleEdit = (tribunal) => {
    navigate('/admin/dashboard/tribunais/edit', { state: { tribunal } });
  };

  const handleNew = () => {
    navigate('/admin/dashboard/tribunais/new');
  };

  return (
    <>
    <HeaderLggd>
      <div className={style.navlinkscontainer}>
      <Link to="" className={style.navlinks2}>Tribunais</Link>
      <Link to="/admin/dashboard/foruns" className={style.navlinksl}>Fóruns</Link>
      <Link to="/admin/dashboard/juiz" className={style.navlinksl}>Audiências</Link>
      <Link to="/admin/dashboard/mediador" className={style.navlinksl}>Mediações</Link>
      </div>
    </HeaderLggd>
    <ContainerLggd>
    
    <div class="flex items-center justify-center space-x-4">
      <h2 class="text-center text-xl">Lista de Tribunais</h2>
      <button className={style.visualizarbtn1} onClick={handleNew}>Adicionar Tribunal</button>
   </div>   
   <TribunaisListPageO onEdit={handleEdit} />
    
    
    
    <Footer/>
    </ContainerLggd>
    </>
    
  );
};

export default TribunaisListPage;
