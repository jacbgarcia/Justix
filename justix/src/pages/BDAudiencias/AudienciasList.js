// src/pages/Tribunais/TribunaisListPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AudienciasListPageO from '../../components/BD/AudienciasListPage';
import HeaderLggd from '../../components/HeaderLggd';
import  Footer from '../../components/Footer';
import ContainerLggd from '../../components/ContainerLggd'
import style from '../../components/Card/Card.module.css';
import {Link} from "react-router-dom";


const AudienciasListPage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleEdit = (juiz) => {
    navigate('/admin/dashboard/juiz/edit', { state: { juiz } });
  };

  const handleNew = () => {
    navigate('/admin/dashboard/juiz/new');
  };

  return (
    <>
    <HeaderLggd>
    {isMobile ? (
          <div className={style.menuIcon} onClick={toggleMenu}>
            ☰ {/* Ícone de menu hamburger */}
          </div>
        ) : (
      <div className="w-full flex justify-start items-center gap-6 pl-4 -ml-8">
      <Link to="/admin/dashboard/tribunais" className={style.navlinksl}>Tribunais</Link>
      <Link to="/admin/dashboard/foruns" className={style.navlinksl}>Fóruns</Link>
      <Link to="" className={style.navlinks2}>Audiências</Link>
      <Link to="/admin/dashboard/mediador" className={style.navlinksl}>Mediações</Link>
      <Link to="/admin/dashboard/advocacia" className={style.navlinksl}>Advocacia</Link>
      <Link to="/admin/dashboard/portais" className={style.navlinksl}>Portais</Link>
      </div>
      )}
      {isMobile && menuOpen && (
        <div className={style.mobileMenu}>
          <Link to="/admin/dashboard/tribunais" onClick={toggleMenu} className={style.navlinksl}>Tribunais</Link>
          <Link to="/admin/dashboard/foruns" onClick={toggleMenu} className={style.navlinksl}>Fóruns</Link>
          <Link to="" onClick={toggleMenu} className={style.navlinks2}>Audiências</Link>
          <Link to="/admin/dashboard/mediador" onClick={toggleMenu} className={style.navlinksl}>Mediações</Link>
          <Link to="/admin/dashboard/advocacia" onClick={toggleMenu} className={style.navlinksl}>Advocacia</Link>
          <Link to="/admin/dashboard/portais" onClick={toggleMenu} className={style.navlinksl}>Portais</Link>
          </div>
        )}
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
