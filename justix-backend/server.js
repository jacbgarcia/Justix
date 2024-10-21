// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração da conexão MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root', // ajuste sua senha
  database: 'justix'
});

db.connect(err => {
  if (err) {
    console.log('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao MySQL');
  }
});

// Rotas para 'foruns'

// Listar todos os fóruns
app.get('/foruns', (req, res) => {
  const sql = 'SELECT * FROM foruns';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
app.get('/tribunais', (req, res) => {
  const sql = 'SELECT * FROM tribunais';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Listar fórum por ID
app.get('/foruns/:id', (req, res) => {
  const sql = `SELECT * FROM foruns WHERE id_forum = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/tribunais', (req, res) => {
  const { nome, cidade, estado, endereco, cep, avaliacao_media } = req.body;

  // Validação de campos obrigatórios
  if (!nome || !cidade || !estado || !cep || !avaliacao_media) {
    return res.status(400).send({ error: 'Todos os campos obrigatórios (nome, cidade, estado, cep, avaliação média) devem ser preenchidos' });
  }

  // Validação de formatos de dados
  if (isNaN(avaliacao_media) || avaliacao_media < 0 || avaliacao_media > 10) {
    return res.status(400).send({ error: 'Avaliação média deve ser um número entre 0 e 10' });
  }

  if (!/^\d{8}$/.test(cep)) {
    return res.status(400).send({ error: 'O CEP deve ter 8 dígitos numéricos' });
  }

  // Query de inserção
  const sql = `INSERT INTO foruns (nome, cidade, estado, endereco, cep, avaliacao_media) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [nome, cidade, estado, endereco, cep, avaliacao_media], (err, result) => {
    if (err) {
      console.error('Erro ao inserir fórum:', err);
      return res.status(500).send({ error: 'Erro ao inserir fórum' });
    }
    res.send(result);
  });
});

app.post('/foruns', (req, res) => {
  const { nome, cidade, estado, endereco, cep, avaliacao_media } = req.body;

  // Validação de campos obrigatórios
  if (!nome || !cidade || !estado || !cep || !avaliacao_media) {
    return res.status(400).send({ error: 'Todos os campos obrigatórios (nome, cidade, estado, cep, avaliação média) devem ser preenchidos' });
  }

  // Validação de formatos de dados
  if (isNaN(avaliacao_media) || avaliacao_media < 0 || avaliacao_media > 10) {
    return res.status(400).send({ error: 'Avaliação média deve ser um número entre 0 e 10' });
  }

  if (!/^\d{8}$/.test(cep)) {
    return res.status(400).send({ error: 'O CEP deve ter 8 dígitos numéricos' });
  }

  // Query de inserção
  const sql = `INSERT INTO foruns (nome, cidade, estado, endereco, cep, avaliacao_media) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [nome, cidade, estado, endereco, cep, avaliacao_media], (err, result) => {
    if (err) {
      console.error('Erro ao inserir fórum:', err);
      return res.status(500).send({ error: 'Erro ao inserir fórum' });
    }
    res.send(result);
  });
});

// Inserir um novo fórum
// app.post('/foruns', (req, res) => {
//   const { nome, cidade, estado, endereco, cep, avaliacao_media } = req.body;
//   const sql = `INSERT INTO foruns (nome, cidade, estado, endereco, cep, avaliacao_media) VALUES (?, ?, ?, ?, ?, ?)`;
//   db.query(sql, [nome, cidade, estado, endereco, cep, avaliacao_media], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// Editar um fórum existente
app.put('/foruns/:id', (req, res) => {
  const { nome, cidade, estado, endereco, cep, avaliacao_media } = req.body;
  const sql = `UPDATE foruns SET nome = ?, cidade = ?, estado = ?, endereco = ?, cep = ?, avaliacao_media = ? WHERE id_forum = ?`;
  db.query(sql, [nome, cidade, estado, endereco, cep, avaliacao_media, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Excluir um fórum
app.delete('/foruns/:id', (req, res) => {
  const sql = `DELETE FROM foruns WHERE id_forum = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


app.get('/notatribunal', (req, res) => {
  const sql = 'SELECT * FROM notatribunal';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Listar nota de tribunal por ID
app.get('/notatribunal/:id', (req, res) => {
  const sql = `SELECT * FROM notatribunal WHERE id_notatribunal = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Inserir uma nova nota de tribunal
app.post('/notatribunal', (req, res) => {
  const { id_usuario, id_tribunal, nota } = req.body;
  const sql = `INSERT INTO notatribunal (id_usuario, id_tribunal, nota) VALUES (?, ?, ?)`;
  db.query(sql, [id_usuario, id_tribunal, nota], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Editar uma nota de tribunal existente
app.put('/notatribunal/:id', (req, res) => {
  const { id_usuario, id_tribunal, nota } = req.body;
  const sql = `UPDATE notatribunal SET id_usuario = ?, id_tribunal = ?, nota = ? WHERE id_notatribunal = ?`;
  db.query(sql, [id_usuario, id_tribunal, nota, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Excluir uma nota de tribunal
app.delete('/notatribunal/:id', (req, res) => {
  const sql = `DELETE FROM notatribunal WHERE id_notatribunal = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// ====================== Rotas para 'notaforuns' ======================

// Listar todas as notas de fóruns
app.get('/notaforuns', (req, res) => {
  const sql = 'SELECT * FROM notaforuns';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Listar nota de fórum por ID
app.get('/notaforuns/:id', (req, res) => {
  const sql = `SELECT * FROM notaforuns WHERE id_notaforuns = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Inserir uma nova nota de fórum
app.post('/notaforuns', (req, res) => {
  const { id_usuario, id_tribunal, nota } = req.body;
  const sql = `INSERT INTO notaforuns (id_usuario, id_tribunal, nota) VALUES (?, ?, ?)`;
  db.query(sql, [id_usuario, id_tribunal, nota], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Editar uma nota de fórum existente
app.put('/notaforuns/:id', (req, res) => {
  const { id_usuario, id_tribunal, nota } = req.body;
  const sql = `UPDATE notaforuns SET id_usuario = ?, id_tribunal = ?, nota = ? WHERE id_notaforuns = ?`;
  db.query(sql, [id_usuario, id_tribunal, nota, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Excluir uma nota de fórum
app.delete('/notaforuns/:id', (req, res) => {
  const sql = `DELETE FROM notaforuns WHERE id_notaforuns = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/juiz', (req, res) => {
  const sql = 'SELECT * FROM juiz';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Listar juiz por ID
app.get('/juiz/:id', (req, res) => {
  const sql = `SELECT * FROM juiz WHERE id_juiz = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/juiz', (req, res) => {
  const { nome, tempo_servico, casos_julgados } = req.body;

  // Validação de campos obrigatórios
  if (!nome || tempo_servico == null || casos_julgados == null) {
    return res.status(400).send({ error: 'Os campos nome, tempo de serviço e casos julgados são obrigatórios' });
  }

  // Validação de formatos de dados
  if (typeof nome !== 'string' || nome.trim() === '') {
    return res.status(400).send({ error: 'Nome deve ser uma string não vazia' });
  }

  if (isNaN(tempo_servico) || tempo_servico < 0) {
    return res.status(400).send({ error: 'Tempo de serviço deve ser um número positivo' });
  }

  if (isNaN(casos_julgados) || casos_julgados < 0) {
    return res.status(400).send({ error: 'Casos julgados deve ser um número positivo' });
  }

  // Query de inserção
  const sql = `INSERT INTO juiz (nome, tempo_servico, casos_julgados) VALUES (?, ?, ?)`;
  db.query(sql, [nome, tempo_servico, casos_julgados], (err, result) => {
    if (err) {
      console.error('Erro ao inserir juiz:', err);
      return res.status(500).send({ error: 'Erro ao inserir juiz' });
    }
    res.send(result);
  });
});


// Inserir um novo juiz
// app.post('/juiz', (req, res) => {
//   const { nome, tempo_servico, casos_julgados } = req.body;
//   const sql = `INSERT INTO juiz (nome, tempo_servico, casos_julgados) VALUES (?, ?, ?)`;
//   db.query(sql, [nome, tempo_servico, casos_julgados], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// Editar um juiz existente
app.put('/juiz/:id', (req, res) => {
  const { nome, tempo_servico, casos_julgados } = req.body;
  const sql = `UPDATE juiz SET nome = ?, tempo_servico = ?, casos_julgados = ? WHERE id_juiz = ?`;
  db.query(sql, [nome, tempo_servico, casos_julgados, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Excluir um juiz
app.delete('/juiz/:id', (req, res) => {
  const sql = `DELETE FROM juiz WHERE id_juiz = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/notajuiz', (req, res) => {
  const sql = 'SELECT * FROM notajuiz';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Listar nota de juiz por ID
app.get('/notajuiz/:id', (req, res) => {
  const sql = `SELECT * FROM notajuiz WHERE id_notajuiz = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Inserir uma nova nota de juiz
app.post('/notajuiz', (req, res) => {
  const { id_usuario, id_juiz, nota } = req.body;
  const sql = `INSERT INTO notajuiz (id_usuario, id_juiz, nota) VALUES (?, ?, ?)`;
  db.query(sql, [id_usuario, id_juiz, nota], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Editar uma nota de juiz existente
app.put('/notajuiz/:id', (req, res) => {
  const { id_usuario, id_juiz, nota } = req.body;
  const sql = `UPDATE notajuiz SET id_usuario = ?, id_juiz = ?, nota = ? WHERE id_notajuiz = ?`;
  db.query(sql, [id_usuario, id_juiz, nota, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Excluir uma nota de juiz
app.delete('/notajuiz/:id', (req, res) => {
  const sql = `DELETE FROM notajuiz WHERE id_notajuiz = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});app.get('/notajuiz', (req, res) => {
  const sql = 'SELECT * FROM notajuiz';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Listar nota de juiz por ID
app.get('/notajuiz/:id', (req, res) => {
  const sql = `SELECT * FROM notajuiz WHERE id_notajuiz = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Inserir uma nova nota de juiz
app.post('/notajuiz', (req, res) => {
  const { id_usuario, id_juiz, nota } = req.body;
  const sql = `INSERT INTO notajuiz (id_usuario, id_juiz, nota) VALUES (?, ?, ?)`;
  db.query(sql, [id_usuario, id_juiz, nota], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Editar uma nota de juiz existente
app.put('/notajuiz/:id', (req, res) => {
  const { id_usuario, id_juiz, nota } = req.body;
  const sql = `UPDATE notajuiz SET id_usuario = ?, id_juiz = ?, nota = ? WHERE id_notajuiz = ?`;
  db.query(sql, [id_usuario, id_juiz, nota, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Excluir uma nota de juiz
app.delete('/notajuiz/:id', (req, res) => {
  const sql = `DELETE FROM notajuiz WHERE id_notajuiz = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/mediador', (req, res) => {
  const sql = 'SELECT * FROM mediador';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Listar mediador por ID
app.get('/mediador/:id', (req, res) => {
  const sql = `SELECT * FROM mediador WHERE id_mediador = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/mediador', (req, res) => {
  const { nome, estado } = req.body;

  // Validação de campos obrigatórios
  if (!nome || !estado) {
    return res.status(400).send({ error: 'Os campos nome e estado são obrigatórios' });
  }

  // Validação de formatos de dados
  if (typeof nome !== 'string' || nome.trim() === '') {
    return res.status(400).send({ error: 'Nome deve ser uma string não vazia' });
  }

  if (typeof estado !== 'string' || estado.trim() === '' || estado.length > 25) {
    return res.status(400).send({ error: 'Estado deve ser uma string não vazia e com no máximo 25 caracteres' });
  }

  // Query de inserção
  const sql = `INSERT INTO mediador (nome, estado) VALUES (?, ?)`;
  db.query(sql, [nome, estado], (err, result) => {
    if (err) {
      console.error('Erro ao inserir mediador:', err);
      return res.status(500).send({ error: 'Erro ao inserir mediador' });
    }
    res.send(result);
  });
});


// Inserir um novo mediador
// app.post('/mediador', (req, res) => {
//   const { nome, estado } = req.body;
//   const sql = `INSERT INTO mediador (nome, estado) VALUES (?, ?)`;
//   db.query(sql, [nome, estado], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// Editar um mediador existente
app.put('/mediador/:id', (req, res) => {
  const { nome, estado } = req.body;
  const sql = `UPDATE mediador SET nome = ?, estado = ? WHERE id_mediador = ?`;
  db.query(sql, [nome, estado, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Excluir um mediador
app.delete('/mediador/:id', (req, res) => {
  const sql = `DELETE FROM mediador WHERE id_mediador = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/notamediador', (req, res) => {
  const sql = 'SELECT * FROM notamediador';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Listar nota de mediador por ID
app.get('/notamediador/:id', (req, res) => {
  const sql = `SELECT * FROM notamediador WHERE id_notamediador = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Inserir uma nova nota de mediador
app.post('/notamediador', (req, res) => {
  const { id_usuario, id_mediador, nota } = req.body;
  const sql = `INSERT INTO notamediador (id_usuario, id_mediador, nota) VALUES (?, ?, ?)`;
  db.query(sql, [id_usuario, id_mediador, nota], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Editar uma nota de mediador existente
app.put('/notamediador/:id', (req, res) => {
  const { id_usuario, id_mediador, nota } = req.body;
  const sql = `UPDATE notamediador SET id_usuario = ?, id_mediador = ?, nota = ? WHERE id_notamediador = ?`;
  db.query(sql, [id_usuario, id_mediador, nota, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Excluir uma nota de mediador
app.delete('/notamediador/:id', (req, res) => {
  const sql = `DELETE FROM notamediador WHERE id_notamediador = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Mesma lógica para 'tribunais' e 'usuarios'

// Iniciar o servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
