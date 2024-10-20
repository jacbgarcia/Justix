import React, { useState } from 'react';
import styles from "./ContainerLggd.module.css";
import { useLocation } from 'react-router-dom';

const ContainerLggd = ({ children, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    
    const navigation = [
        { name: 'Tribunais', path: '/tribunais' },
        { name: 'Fóruns', path: '/foruns' },
        { name: 'Audiências', path: '/audiencias' },
        { name: 'Mediações', path: '/mediacoes' },
        { name: 'Advocacia', path: '/advocacia' },
        { name: 'Portais', path: '/portais' }
    ];

    const title = navigation.find(
        item => item.path.toLowerCase() === location.pathname.toLowerCase()
    )?.name || 'Página Inicial';

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <section>
            <div className={styles.container}>
                <div className={styles.searchpad}>
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className={styles.searchpa}
                    />
                </div>
                <div className={styles.titulo}>{title}</div>
                <div className="w-96"></div>
            </div>
            <main className="p-6">
                {children}
            </main>
        </section>
    );
};

export default ContainerLggd;