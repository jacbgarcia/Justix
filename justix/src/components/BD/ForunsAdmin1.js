// src/components/Foruns.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ForunsAdmin = () => {
  const [foruns, setForuns] = useState([]);
  const [forumAtivo, setForumAtivo] = useState(null);  // Usado para edição
  const [novoForum, setNovoForum] = useState({
    nome: '',
    cidade: '',
    estado: '',
    endereco: '',
    cep: '',
    avaliacao_media: 0
  });

  useEffect(() => {
    listarForuns();
  }, []);

  // Função para buscar todos os fóruns
  const listarForuns = async () => {
    try {
      const res = await axios.get('http://localhost:3001/foruns');
      setForuns(res.data);
    } catch (err) {
      console.error('Erro ao listar fóruns:', err);
    }
  };

  // Função para excluir um fórum
  const excluirForum = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/foruns/${id}`);
      listarForuns();
    } catch (err) {
      console.error('Erro ao excluir fórum:', err);
    }
  };

  // Função para inserir um novo fórum
  const inserirForum = async () => {
    try {
      await axios.post('http://localhost:3001/foruns', novoForum);
      listarForuns(); // Atualiza a lista
      resetarFormulario();
    } catch (err) {
      console.error('Erro ao inserir fórum:', err);
    }
  };

  // Função para atualizar um fórum existente
  const editarForum = async () => {
    try {
      await axios.put(`http://localhost:3001/foruns/${forumAtivo.id_forum}`, novoForum);
      listarForuns();
      resetarFormulario();
    } catch (err) {
      console.error('Erro ao editar fórum:', err);
    }
  };

  // Preencher o formulário para edição
  const selecionarParaEdicao = (forum) => {
    setNovoForum(forum);
    setForumAtivo(forum);
  };

  // Resetar o formulário
  const resetarFormulario = () => {
    setNovoForum({
      nome: '',
      cidade: '',
      estado: '',
      endereco: '',
      cep: '',
      avaliacao_media: 0
    });
    setForumAtivo(null);
  };

  return (
    <div>
      <h2>Lista de Fóruns</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Endereço</th>
            <th>CEP</th>
            <th>Avaliação Média</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {foruns.map(forum => (
            <tr key={forum.id_forum}>
              <td>{forum.nome}</td>
              <td>{forum.cidade}</td>
              <td>{forum.estado}</td>
              <td>{forum.endereco}</td>
              <td>{forum.cep}</td>
              <td>{forum.avaliacao_media}</td>
              <td>
                <button onClick={() => selecionarParaEdicao(forum)}>Editar</button>
                <button onClick={() => excluirForum(forum.id_forum)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{forumAtivo ? 'Editar Fórum' : 'Inserir Novo Fórum'}</h3>
      <form onSubmit={forumAtivo ? editarForum : inserirForum}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={novoForum.nome}
            onChange={(e) => setNovoForum({ ...novoForum, nome: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Cidade:</label>
          <input
            type="text"
            value={novoForum.cidade}
            onChange={(e) => setNovoForum({ ...novoForum, cidade: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Estado:</label>
          <input
            type="text"
            value={novoForum.estado}
            onChange={(e) => setNovoForum({ ...novoForum, estado: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Endereço:</label>
          <input
            type="text"
            value={novoForum.endereco}
            onChange={(e) => setNovoForum({ ...novoForum, endereco: e.target.value })}
          />
        </div>
        <div>
          <label>CEP:</label>
          <input
            type="text"
            value={novoForum.cep}
            onChange={(e) => setNovoForum({ ...novoForum, cep: e.target.value })}
          />
        </div>
        <div>
          <label>Avaliação Média:</label>
          <input
            type="number"
            value={novoForum.avaliacao_media}
            onChange={(e) => setNovoForum({ ...novoForum, avaliacao_media: e.target.value })}
            step="0.01"
            min="0"
            max="10"
            required
          />
        </div>
        <button type="submit">{forumAtivo ? 'Salvar Alterações' : 'Inserir Fórum'}</button>
        {forumAtivo && <button type="button" onClick={resetarFormulario}>Cancelar Edição</button>}
      </form>
    </div>
  );
};

export default ForunsAdmin;
