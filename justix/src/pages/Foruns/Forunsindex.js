import React from 'react';
import { useNavigate } from 'react-router-dom';
import ForunsListPageUser from '../../components/BDPages/ForunsListUser';
import HeaderLggd from '../../components/HeaderLggd';
import  Footer from '../../components/Footer';
import ContainerLggd from '../../components/ContainerLggd'
import style from '../../components/Card/Card.module.css';
import {Link} from "react-router-dom";


const Forunsindex = () => {
  const navigate = useNavigate();


  return (
    <>
    <HeaderLggd>
      <div className={style.navlinkscontainer}>
      <Link to="/user/dashboard/tribunais" className={style.navlinksl}>Tribunais</Link>
      <Link to="" className={style.navlinks2}>Fóruns</Link>
      <Link to="/user/dashboard/audiencias" className={style.navlinksl}>Audiências</Link>
      <Link to="/user/dashboard/mediacoes" className={style.navlinksl}>Mediações</Link>
      </div>
    </HeaderLggd>
    <ContainerLggd>
    
    <div class="flex items-center justify-center space-x-4">
      <h2 class="text-center text-xl">Fóruns</h2>
   </div>   
   <ForunsListPageUser />
    <Footer/>
    </ContainerLggd>
    </>
  );
};

export default Forunsindex;