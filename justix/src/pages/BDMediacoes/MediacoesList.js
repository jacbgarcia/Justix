// src/pages/Foruns/ForunsList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MediacoesListPageO from '../../components/BD/MediacoesListPage';
import HeaderLggd from '../../components/HeaderLggd';
import  Footer from '../../components/Footer';
import ContainerLggd from '../../components/ContainerLggd'
import style from '../../components/Card/Card.module.css';
import {Link} from "react-router-dom";

const MediacoesListPage = () => {
  const navigate = useNavigate();

  const handleEdit = (mediador) => {
    navigate('/admin/dashboard/mediador/edit', { state: { mediador } });
  };

  const handleNew = () => {
    navigate('/admin/dashboard/mediador/new');
  };

  return (
    <>
    <HeaderLggd>
      <div className={style.navlinkscontainer}>
      <Link to="/admin/dashboard/tribunais" className={style.navlinksl}>Tribunais</Link>
      <Link to="/admin/dashboard/foruns" className={style.navlinksl}>Fóruns</Link>
      <Link to="/admin/dashboard/juiz" className={style.navlinksl}>Audiências</Link>
      <Link to="" className={style.navlinks2}>Mediações</Link>
      </div>
    </HeaderLggd>
    <ContainerLggd>
    
    <div class="flex items-center justify-center space-x-4">
      <h2 class="text-center text-xl">Lista de Mediadores</h2>
      <button className={style.visualizarbtn1} onClick={handleNew}>Adicionar Mediador</button>
   </div>   
   <MediacoesListPageO onEdit={handleEdit} />
    
    
    
    <Footer/>
    </ContainerLggd>
    </>
  );
};

export default MediacoesListPage;