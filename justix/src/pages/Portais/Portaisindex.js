import React, { useState, useEffect } from 'react';
import PortaisListUser from '../../components/BDPages/PortaisListUser';
import HeaderLggd from '../../components/HeaderLggd';
import  Footer from '../../components/Footer';
import ContainerLggd from '../../components/ContainerLggd'
import style from '../../components/Card/Card.module.css';
import {Link} from "react-router-dom";




const Portaisindex = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <>
    <HeaderLggd>
    {isMobile ? (
          <div className={style.menuIcon} onClick={toggleMenu}>
            ☰ {/* Ícone de menu hamburger */}
          </div>
        ) : (
    <div className="w-full flex justify-start items-center gap-6 pl-4 -ml-8">
  <Link to="/user/dashboard/tribunais" className={style.navlinksl}>Tribunais</Link>
  <Link to="/user/dashboard/foruns" className={style.navlinksl}>Fóruns</Link>
  <Link to="/user/dashboard/audiencias" className={style.navlinksl}>Audiências</Link>
  <Link to="/user/dashboard/mediacoes" className={style.navlinksl}>Mediações</Link>
  <Link to="/user/dashboard/advocacia" className={style.navlinksl}>Advocacia</Link>
  <Link to="" className={style.navlinks2}>Portais</Link>
</div>
     )}
        {isMobile && menuOpen && (
          <div className={style.mobileMenu}>
         <Link to="/user/dashboard/tribunais" onClick={toggleMenu} className={style.navlinksl}>Tribunais</Link>
         <Link to="/user/dashboard/foruns" onClick={toggleMenu} className={style.navlinksl}>Fóruns</Link>
         <Link to="/user/dashboard/audiencias" onClick={toggleMenu} className={style.navlinksl}>Audiências</Link>
         <Link to="/user/dashboard/mediacoes" onClick={toggleMenu} className={style.navlinksl}>Mediações</Link>
         <Link to="/user/dashboard/advocacia" onClick={toggleMenu} className={style.navlinksl}>Advocacia</Link>
         <Link to="" onClick={toggleMenu} className={style.navlinks2}>Portais</Link>
       </div> 
        )}
    </HeaderLggd>
    <ContainerLggd>
     
    <div class="flex items-center justify-center space-x-4">
      <h2 class="text-center text-xl">Portais</h2>
   </div>   
   <PortaisListUser />
    
    
    
    <Footer/>
    </ContainerLggd>
    </>
    
  );
};

export default Portaisindex;