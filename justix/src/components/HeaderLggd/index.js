/* eslint-disable no-unused-vars */
import { Link, useLocation } from "react-router-dom";
import styles from "./HeaderLggd.module.css";


function HeaderLggd({children}) {
    const location = useLocation();

    
    const navigation = [
        { name: 'Tribunais', path: '/user/dashboard/tribunais' },
        { name: 'Fóruns', path: '/user/dashboard/foruns' },
        { name: 'Audiências', path: '/user/dashboard/audiencias' },
        { name: 'Mediações', path: '/user/dashboard/mediacoes' },
        { name: 'Advocacia', path: '/user/dashboard/advocacia' },
        { name: 'Portais', path: '/user/dashboard/portais' }
    ];

    

    const getCurrentTitle = () => {
        const currentRoute = navigation.find(
            item => item.path.toLowerCase() === location.pathname.toLowerCase()
        );
        return currentRoute ? currentRoute.name : '';
    };

    return (
        <header>
            <nav className={styles.navbar}>
                <div className={styles.navleft}>
                    <Link to="/" className={styles.usuario}>U</Link>
                </div>
                
               
                {children}
                <span className={styles.brand}>JUSTIX</span>
            </nav>
        </header>
    );
}

export default HeaderLggd;