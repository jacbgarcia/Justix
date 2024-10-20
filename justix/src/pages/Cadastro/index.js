import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from "./Cadastro.module.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContainerHome from "../../components/ContainerHome";

function Cadastro() {
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        senha: '',
        confirmarSenha: ''
    });

    const [errors, setErrors] = useState({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        senha: '',
        confirmarSenha: ''
    });

    // Função para formatar CPF
    const formatCPF = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    };

    // Função para formatar telefone
    const formatTelefone = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    };

    // Validações
    const validateField = (name, value) => {
        switch (name) {
            case 'nome':
                return value.length < 3 ? 'Nome deve ter pelo menos 3 caracteres' : '';
            
            case 'cpf':
                return value.replace(/\D/g, '').length !== 11 
                    ? 'CPF deve ter 11 dígitos' 
                    : '';
            
            case 'email':
                return !value.includes('@') || !value.includes('.com')
                    ? 'Email deve conter @ e .com'
                    : '';
            
            case 'telefone':
                return value.replace(/\D/g, '').length < 11
                    ? 'Telefone deve ter 11 dígitos'
                    : '';
            
            case 'senha':
                return value.length < 6
                    ? 'Senha deve ter pelo menos 6 caracteres'
                    : '';
            
            case 'confirmarSenha':
                return value !== formData.senha
                    ? 'As senhas não coincidem'
                    : '';
            
            default:
                return '';
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        let formattedValue = value;

        // Aplica formatação específica para CPF e telefone
        if (id === 'cpf') {
            formattedValue = formatCPF(value);
        } else if (id === 'telefone') {
            formattedValue = formatTelefone(value);
        }

        setFormData(prevState => ({
            ...prevState,
            [id]: formattedValue
        }));

        const error = validateField(id, formattedValue);
        setErrors(prevState => ({
            ...prevState,
            [id]: error
        }));

        // Valida confirmação de senha quando a senha é alterada
        if (id === 'senha') {
            const confirmarSenhaError = formData.confirmarSenha 
                ? validateField('confirmarSenha', formData.confirmarSenha) 
                : '';
            setErrors(prevState => ({
                ...prevState,
                confirmarSenha: confirmarSenhaError
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Valida todos os campos
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            newErrors[key] = validateField(key, formData[key]);
        });

        // Verifica se há algum erro
        if (Object.values(newErrors).some(error => error !== '')) {
            setErrors(newErrors);
            return;
        }
        
        // Se chegou aqui, o formulário está válido
        console.log('Dados do formulário:', formData);
    };

    return (
        <>
            <Header>
                <div className={styles.navleft}>
                    <Link to="/Login" className={styles.navlinksl}>Login</Link>
                    <Link to="/Sobre_nos"className={styles.navlinks}>Sobre nós</Link>
                </div>
            </Header>
            <ContainerHome>
                <section className={styles.cadastroSection}>
                    <div className={styles.cadastroContainer}>
                        <Link to="/" className={styles.backButton}>
                            <span className={styles.backArrow}>←</span>
                            Voltar
                        </Link>
                        
                        <h2 className={styles.title}>CADASTRO</h2>
                        
                        <form onSubmit={handleSubmit} className={styles.cadastroForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="nome">Nome:</label>
                                <input
                                    type="text"
                                    id="nome"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    className={errors.nome ? styles.inputError : ''}
                                    required
                                />
                                {errors.nome && (
                                    <span className={styles.errorText}>{errors.nome}</span>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="cpf">CPF:</label>
                                <input
                                    type="text"
                                    id="cpf"
                                    value={formData.cpf}
                                    onChange={handleInputChange}
                                    className={errors.cpf ? styles.inputError : ''}
                                    maxLength="14"
                                    required
                                />
                                {errors.cpf && (
                                    <span className={styles.errorText}>{errors.cpf}</span>
                                )}
                            </div>

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
                                <label htmlFor="telefone">Telefone:</label>
                                <input
                                    type="text"
                                    id="telefone"
                                    value={formData.telefone}
                                    onChange={handleInputChange}
                                    className={errors.telefone ? styles.inputError : ''}
                                    placeholder="(XX) XXXXX-XXXX"
                                    maxLength="15"
                                    required
                                />
                                {errors.telefone && (
                                    <span className={styles.errorText}>{errors.telefone}</span>
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

                            <div className={styles.formGroup}>
                                <label htmlFor="confirmarSenha">Confirmar Senha:</label>
                                <input
                                    type="password"
                                    id="confirmarSenha"
                                    value={formData.confirmarSenha}
                                    onChange={handleInputChange}
                                    className={errors.confirmarSenha ? styles.inputError : ''}
                                    required
                                />
                                {errors.confirmarSenha && (
                                    <span className={styles.errorText}>{errors.confirmarSenha}</span>
                                )}
                            </div>
                            <Link to="/Tribunais">
                            <button type="submit" className={styles.submitButton}>
                                Cadastrar
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

export default Cadastro;