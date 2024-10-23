import React from 'react';
import { useNavigate } from 'react-router-dom';
import TribunaisListPageUser from '../../components/BDPages/TribunaisListUser';
import HeaderLggd from '../../components/HeaderLggd';
import  Footer from '../../components/Footer';
import ContainerLggd from '../../components/ContainerLggd'
import style from '../../components/Card/Card.module.css';
import {Link} from "react-router-dom";




const Tribunaisindex = () => {
  const navigate = useNavigate();

  return (
    <>
    <HeaderLggd>
      <div className={style.navlinkscontainer}>
      <Link to="" className={style.navlinks2}>Tribunais</Link>
      <Link to="/user/dashboard/foruns" className={style.navlinksl}>Fóruns</Link>
      <Link to="/user/dashboard/audiencias" className={style.navlinksl}>Audiências</Link>
      <Link to="/user/dashboard/mediacoes" className={style.navlinksl}>Mediações</Link>
      </div>
    </HeaderLggd>
    <ContainerLggd>
    
    <div class="flex items-center justify-center space-x-4">
      <h2 class="text-center text-xl">Tribunais</h2>
   </div>   
   <TribunaisListPageUser />
    
    
    
    <Footer/>
    </ContainerLggd>
    </>
    
  );
};

export default Tribunaisindex;