import React, { useState, useEffect, useRef } from 'react';
import styles from "./HeaderLggd.module.css";

function HeaderLggd({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const popupRef = useRef(null);
    const [user, setUser] = useState(null);
    const [firstLetter, setFirstLetter] = useState('');
    const [userColor, setUserColor] = useState('#000000');
    const [progress, setProgress] = useState(0);
    const [rewardToken, setRewardToken] = useState('');

    const generateRandomToken = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 16;
        let token = '';
        for (let i = 0; i < length; i++) {
            token += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return token;
    };

    const handleGenerateToken = () => {
        const token = generateRandomToken();
        setRewardToken(token);
        // You might want to store this token or send it to your backend
        localStorage.setItem('rewardToken', token);
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('usuarios'));
        if (storedUser) {
            setUser(storedUser);
            setFirstLetter(storedUser.nome.charAt(0).toUpperCase());
            
            let userColor = localStorage.getItem('userColor');
            if (!userColor) {
                userColor = generateRandomColor();
                localStorage.setItem('userColor', userColor);
            }
            setUserColor(userColor);

            // Load progress from localStorage
            const storedProgress = localStorage.getItem(`userProgress_${storedUser.id}`);
            setProgress(storedProgress ? parseInt(storedProgress) : 0);
        }
    }, []);

    // ... existing color generation and click outside handler code ...

    const generateRandomColor = () => {
        const colors = [
            '#2196F3', '#4CAF50', '#9C27B0', '#F44336', '#FF9800',
            '#009688', '#3F51B5', '#795548', '#607D8B', '#E91E63'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsOpen(false);
                setShowDetails(false);
                setShowProgress(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuarios');
        localStorage.removeItem('userColor');
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
                            <div className={styles.popupLinkStyle}>{user?.nome}</div>

                            {user?.role !== 'admin' ? (
                                <>
                                    <button
                                        onClick={() => setShowDetails(!showDetails)}
                                        className={styles.popupLinkStyle}
                                    >
                                        Dados do usuário
                                    </button>

                                    {showDetails && (
                                        <div style={{ borderRadius: '10px', backgroundColor: 'white', paddingLeft: '16px', paddingRight: '16px', color: '#fffff', fontSize: '13px' }}>
                                            <div>CPF: {user?.cpf || 'Não disponível'}</div>
                                            <div>Telefone: {user?.telefone || 'Não disponível'}</div>
                                            <div>Email: {user?.email || 'Não disponível'}</div>
                                        </div>
                                    )}

                                    <button 
                                        onClick={() => setShowProgress(!showProgress)}
                                        className={styles.popupLinkStyle}
                                    >
                                        Pontuação
                                    </button>

                                    {showProgress && (
                                        <div className="p-4 bg-white rounded-lg shadow-md">
                                            <div className="w-full h-6 bg-black rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-blue-500 transition-all duration-300"
                                                    style={{ width: `${(progress / 1000) * 100}%` }}
                                                ></div>
                                            </div>
                                            <div className="mt-2 text-center text-sm">
                                                {progress} / 1000 pontos
                                            </div>
                                            {progress >= 1000 && !rewardToken && (
                                                <button
                                                    onClick={handleGenerateToken}
                                                    className="mt-2 w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                                >
                                                    Gerar Token de Recompensa
                                                </button>
                                            )}
                                            {rewardToken && (
                                                <div className="mt-2 p-2 bg-gray-100 rounded text-center break-all">
                                                    <p className="text-xs font-medium">Seu Token:</p>
                                                    <p className="text-sm">{rewardToken}</p>
                                                </div>
                                            )}
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