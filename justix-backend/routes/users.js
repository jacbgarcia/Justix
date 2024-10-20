const express = require('express');
const router = express.Router();

// Rota para cadastro de usuário
router.post('/api/usuarios/cadastro', async (req, res) => {
    try {
        const { nome, cpf, email, telefone, senha } = req.body;
        
        // Aqui você vai adicionar a lógica do banco de dados
        // Por enquanto, só vamos validar e retornar os dados
        
        // Exemplo de validação básica
        if (!nome || !cpf || !email || !telefone || !senha) {
            return res.status(400).json({ 
                error: 'Todos os campos são obrigatórios' 
            });
        }

        // Simula registro no banco (você substituirá isso pela lógica do seu banco)
        const novoUsuario = {
            nome,
            cpf,
            email,
            telefone,
            // Nunca armazene senhas em texto puro!
            // Você deve usar bcrypt ou similar para hash
            senha: senha // Você deve fazer: await bcrypt.hash(senha, 10)
        };

        // Resposta de sucesso
        res.status(201).json({ 
            message: 'Usuário cadastrado com sucesso',
            usuario: novoUsuario 
        });

    } catch (error) {
        console.error('Erro no cadastro:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
});

module.exports = router;