/* eslint-disable no-unused-vars */
import { Link, useLocation } from "react-router-dom";
import styles from "./HeaderLggd.module.css";

function HeaderLggd({children}) {
    const location = useLocation();
    
    const navigation = [
        { name: 'Tribunais', path: '/tribunais' },
        { name: 'Fóruns', path: '/foruns' },
        { name: 'Audiências', path: '/audiencias' },
        { name: 'Mediações', path: '/mediacoes' },
        { name: 'Advocacia', path: '/advocacia' },
        { name: 'Portais', path: '/portais' }
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
                    <Link className={styles.usuario}>U</Link>
                </div>
                
                <div className={styles.navButtons}>
                    {navigation.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`${styles.navButton} ${
                                location.pathname.toLowerCase() === item.path.toLowerCase() 
                                    ? styles.active 
                                    : ''
                            }`}
                            onClick={(e) => {
                                if (location.pathname.toLowerCase() === item.path.toLowerCase()) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                
                {children}
                <span className={styles.brand}>JUSTIX</span>
            </nav>
        </header>
    );
}

export default HeaderLggd;