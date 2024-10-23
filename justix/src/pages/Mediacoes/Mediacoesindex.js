import React from 'react';
import { useNavigate } from 'react-router-dom';
import MediacoesListPageUser from '../../components/BDPages/MediacoesListUser';
import HeaderLggd from '../../components/HeaderLggd';
import  Footer from '../../components/Footer';
import ContainerLggd from '../../components/ContainerLggd'
import style from '../../components/Card/Card.module.css';
import {Link} from "react-router-dom";

const Mediacoesindex = () => {
  const navigate = useNavigate();


  return (
    <>
    <HeaderLggd>
      <div className={style.navlinkscontainer}>
      <Link to="/user/dashboard/tribunais" className={style.navlinksl}>Tribunais</Link>
      <Link to="/user/dashboard/foruns" className={style.navlinksl}>Fóruns</Link>
      <Link to="/user/dashboard/audiencias" className={style.navlinksl}>Audiências</Link>
      <Link to="" className={style.navlinks2}>Mediações</Link>
      </div>
    </HeaderLggd>
    <ContainerLggd>
    
    <div class="flex items-center justify-center space-x-4">
      <h2 class="text-center text-xl">Mediações</h2>
   </div>   
   <MediacoesListPageUser />
    
    
    
    <Footer/>
    </ContainerLggd>
    </>
  );
};

export default Mediacoesindex;