import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContainerHome from "../../components/ContainerHome";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        senha: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        senha: ''
    });

    const validateEmail = (email) => {
        if (!email) return 'Email é obrigatório';
        if (!email.includes('@')) return 'Email deve conter @';
        if (!email.includes('.com')) return 'Email deve conter .com';
        return '';
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));

        setErrors(prevState => ({
            ...prevState,
            [id]: ''
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const emailError = validateEmail(formData.email);
        const senhaError = !formData.senha ? 'Senha é obrigatória' : '';

        if (emailError || senhaError) {
            setErrors({
                email: emailError,
                senha: senhaError
            });
            return;
        }
        
        console.log('Dados do formulário:', formData);
    };

    return (
        <>
            <Header>
                <div className={styles.navleft}>
                    <Link to="/Cadastro" className={styles.cadastrese}>Cadastre-se</Link>
                    <Link to="/Sobre_nos" className={styles.navlinks}>Sobre nós</Link>
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
                                {errors.email && (
                                    <span className={styles.errorText}>{errors.email}</span>
                                )}
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
                                {errors.senha && (
                                    <span className={styles.errorText}>{errors.senha}</span>
                                )}
                            </div>
                            <Link to="/Tribunais">
                            <button type="submit" className={styles.submitButton}>
                                Entrar
                            </button>
                            </Link>
                        </form>
                    </div>
                </section>
            </ContainerHome>
            <Footer />
        </>
    );
}

export default Login;