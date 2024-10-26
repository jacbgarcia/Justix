// src/pages/Tribunais/TribunaisListPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdvocaciaListPageO from '../../components/BD/AdvocaciaListPage';
import HeaderLggd from '../../components/HeaderLggd';
import Footer from '../../components/Footer';
import ContainerLggd from '../../components/ContainerLggd';
import style from '../../components/Card/Card.module.css';

const AdvocaciasListPage = () => {
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

  const handleEdit = (advocacia) => {
    navigate('/admin/dashboard/advocacia/edit', { state: { advocacia } });
  };

  const handleNew = () => {
    navigate('/admin/dashboard/advocacia/new');
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
            <Link to="/admin/dashboard/juiz" className={style.navlinksl}>Audiências</Link>
            <Link to="/admin/dashboard/mediador" className={style.navlinksl}>Mediações</Link>
            <Link to="" className={style.navlinks2}>Advocacia</Link>
            <Link to="/admin/dashboard/portais" className={style.navlinksl}>Portais</Link>
          </div>
        )}
        {isMobile && menuOpen && (
          <div className={style.mobileMenu}>
            <Link to="/admin/dashboard/tribunais" onClick={toggleMenu} className={style.navlinksl}>Tribunais</Link>
            <Link to="/admin/dashboard/foruns" onClick={toggleMenu} className={style.navlinksl}>Fóruns</Link>
            <Link to="/admin/dashboard/juiz" onClick={toggleMenu} className={style.navlinksl}>Audiências</Link>
            <Link to="/admin/dashboard/mediador" onClick={toggleMenu} className={style.navlinksl}>Mediações</Link>
            <Link to="" onClick={toggleMenu} className={style.navlinks2}>Advocacia</Link>
            <Link to="/admin/dashboard/portais" onClick={toggleMenu} className={style.navlinksl}>Portais</Link>
          </div>
        )}
      </HeaderLggd>
      <ContainerLggd>
        <div className="flex flex-col items-center justify-center space-y-4 h-screen">
          <h2 className="text-center text-xl">Lista de Advocacia</h2>
          <button className={`${style.visualizarbtn1} text-center text-xl`} onClick={handleNew}>
            Adicionar ao Setor
          </button>
        </div>
        <AdvocaciaListPageO onEdit={handleEdit} />
      </ContainerLggd>
      <Footer />
    </>
  );
};

export default AdvocaciasListPage;
