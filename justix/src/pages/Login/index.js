import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate,  Link } from 'react-router-dom'; 

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContainerHome from "../../components/ContainerHome";
import styles from './Login.module.css'; // Certifique-se de ter um arquivo CSS para os estilos

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', senha: '' });
    const [errors, setErrors] = useState({ email: '', senha: '' });
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        if (!email) return 'Email é obrigatório';
        if (!email.includes('@')) return 'Email deve conter @';
        if (!email.includes('.com')) return 'Email deve conter .com';
        return '';
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setErrors(prev => ({ ...prev, [id]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailError = validateEmail(formData.email);
        const senhaError = !formData.senha ? 'Senha é obrigatória' : '';

        if (emailError || senhaError) {
            setErrors({ email: emailError, senha: senhaError });
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                login(data);

                // Redirecionar baseado no role
                switch(data.user.role) {
                    case 'admin':
                        navigate('/admin/dashboard/tribunais');
                        break;
                    default:
                        navigate('/user/dashboard/tribunais');
                }
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError('Erro ao fazer login');
        }
    };

    return (
        <>
            <Header>
                <div className={styles.navleft}>
                    <Link to="/cadastro" className={styles.cadastrese}>Cadastre-se</Link>
                    <Link to="/info" className={styles.navlinks}>Sobre nós</Link>
                </div>
            </Header>
            <ContainerHome>
                <section className={styles.loginSection}>
                    <div className={styles.loginContainer}>
                        <Link to="/" className={styles.backButton}>
                            <span className={styles.backArrow}>←</span>
                            Voltar
                        </Link>
                        
                        <h2 className={styles.title}>LOGIN</h2>
                        {error && <span className={styles.errorText}>{error}</span>}
                        
                        <form onSubmit={handleSubmit} className={styles.loginForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">E-mail:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={errors.email ? styles.inputError : ''}
                                    required
                                />
                                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="senha">Senha:</label>
                                <input
                                    type="password"
                                    id="senha"
                                    value={formData.senha}
                                    onChange={handleInputChange}
                                    className={errors.senha ? styles.inputError : ''}
                                    required
                                />
                                {errors.senha && <span className={styles.errorText}>{errors.senha}</span>}
                            </div>

                            <button type="submit" className={styles.submitButton}>
                                Entrar
                            </button>
                        </form>
                    </div>
                </section>
            </ContainerHome>
            <Footer />
        </>
    );
}

export default Login;
