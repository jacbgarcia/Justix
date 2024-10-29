import React, { useState, useEffect, useRef } from 'react';
import styles from "./HeaderLggd.module.css";

function HeaderLggd({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const popupRef = useRef(null);
    const [user, setUser] = useState(null);
    const [firstLetter, setFirstLetter] = useState('');
    const [userColor, setUserColor] = useState('#000000');

      // Função para gerar cor aleatória
      const generateRandomColor = () => {
        // Lista de cores agradáveis pré-definidas
        const colors = [
            '#2196F3', // Azul
            '#4CAF50', // Verde
            '#9C27B0', // Roxo
            '#F44336', // Vermelho
            '#FF9800', // Laranja
            '#009688', // Verde-azulado
            '#3F51B5', // Índigo
            '#795548', // Marrom
            '#607D8B', // Azul-acinzentado
            '#E91E63'  // Rosa
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('usuarios'));
        if (storedUser) {
            setUser(storedUser);
            setFirstLetter(storedUser.nome.charAt(0).toUpperCase());
            
            // Verifica se já existe uma cor salva
            let userColor = localStorage.getItem('userColor');
            if (!userColor) {
                // Se não existir, gera uma nova cor e salva
                userColor = generateRandomColor();
                localStorage.setItem('userColor', userColor);
            }
            setUserColor(userColor);
        }
    }, []);
    

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsOpen(false);
                setShowDetails(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuarios');
        localStorage.removeItem('userColor'); // Remove a cor ao fazer logout
        window.location.href = '/login';
    };


    return (
        <header>
            <nav className={styles.navbar}>
                <div className={styles.navleft} ref={popupRef}>
                    <button
                        className={styles.usuario}
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ backgroundColor: userColor }}
                    >
                        {firstLetter}
                    </button>

                    {isOpen && (
                        <div className={styles.popupStyle}>
                            <div className={styles.usuario} style={{ backgroundColor: userColor }}>{firstLetter}</div>
                            <div className={styles.popupLinkStyle}>
                                
                                {user?.nome}
                            </div>

                            {user?.role !== 'admin' ? (
                                <>
                                    <button
                                        onClick={() => setShowDetails(!showDetails)}
                                        className={styles.popupLinkStyle}
                                    >
                                        Dados do usuário
                                    </button>

                                    {showDetails && (
                                        <div style={{ borderRadius: '10px', backgroundColor: 'white',paddingLeft: '16px', paddingRight: '16px', color: '#fffff', fontSize: '13px', }}>
                                            <div>CPF: {user?.cpf || 'Não disponível'}</div>
                                            <div>Telefone: {user?.telefone || 'Não disponível'}</div>
                                            <div>Email: {user?.email || 'Não disponível'}</div>
                                        </div>
                                    )}
                                </>
                            ) : null}

                            <button
                                onClick={handleLogout}
                                className={styles.popupLinkStyle}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
                {children}
                <span className={styles.brand}>JUSTIX</span>
            </nav>
        </header>
    );
}

export default HeaderLggd;
