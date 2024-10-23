// src/pages/Foruns/ForunsList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ForunsListPageO from '../../components/BD/ForunsListPage';
import HeaderLggd from '../../components/HeaderLggd';
import  Footer from '../../components/Footer';
import ContainerLggd from '../../components/ContainerLggd'
import style from '../../components/Card/Card.module.css';
import {Link} from "react-router-dom";


const ForunsListPage = () => {
  const navigate = useNavigate();

  const handleEdit = (forum) => {
    navigate('/admin/dashboard/foruns/edit', { state: { forum } });
  };

  const handleNew = () => {
    navigate('/admin/dashboard/foruns/new');
  };

  return (
    <>
    <HeaderLggd>
      <div className={style.navlinkscontainer}>
      <Link to="/admin/dashboard/tribunais" className={style.navlinksl}>Tribunais</Link>
      <Link to="" className={style.navlinks2}>Fóruns</Link>
      <Link to="/admin/dashboard/juiz" className={style.navlinksl}>Audiências</Link>
      <Link to="/admin/dashboard/mediador" className={style.navlinksl}>Mediações</Link>
      </div>
    </HeaderLggd>
    <ContainerLggd>
    
    <div class="flex items-center justify-center space-x-4">
      <h2 class="text-center text-xl">Lista de Fóruns</h2>
      <button className={style.visualizarbtn1} onClick={handleNew}>Adicionar Fórum</button>
   </div>   
   <ForunsListPageO onEdit={handleEdit} />
    <Footer/>
    </ContainerLggd>
    </>
  );
};

export default ForunsListPage;