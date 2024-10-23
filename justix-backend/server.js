// // server.js
// const express = require('express');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Configuração da conexão MySQL
// const db = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'root', // ajuste sua senha
//   database: 'justix'
// });

// db.connect(err => {
//   if (err) {
//     console.log('Erro ao conectar ao banco de dados:', err);
//   } else {
//     console.log('Conectado ao MySQL');
//   }
// });

// // Rotas para 'foruns'

// // Listar todos os fóruns
// app.get('/foruns', (req, res) => {
//   const sql = 'SELECT * FROM foruns';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });
// app.get('/tribunais', (req, res) => {
//   const sql = 'SELECT * FROM tribunais';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Listar fórum por ID
// app.get('/foruns/:id', (req, res) => {
//   const sql = `SELECT * FROM foruns WHERE id_forum = ${req.params.id}`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// app.post('/tribunais', (req, res) => {
//   const { nome, cidade, estado, endereco, cep, avaliacao_media } = req.body;

//   // Validação de campos obrigatórios
//   if (!nome || !cidade || !estado || !cep || !avaliacao_media) {
//     return res.status(400).send({ error: 'Todos os campos obrigatórios (nome, cidade, estado, cep, avaliação média) devem ser preenchidos' });
//   }

//   // Validação de formatos de dados
//   if (isNaN(avaliacao_media) || avaliacao_media < 0 || avaliacao_media > 10) {
//     return res.status(400).send({ error: 'Avaliação média deve ser um número entre 0 e 10' });
//   }

//   if (!/^\d{8}$/.test(cep)) {
//     return res.status(400).send({ error: 'O CEP deve ter 8 dígitos numéricos' });
//   }

//   // Query de inserção
//   const sql = `INSERT INTO tribunais (nome, cidade, estado, endereco, cep, avaliacao_media) VALUES (?, ?, ?, ?, ?, ?)`;
//   db.query(sql, [nome, cidade, estado, endereco, cep, avaliacao_media], (err, result) => {
//     if (err) {
//       console.error('Erro ao inserir tribunal:', err);
//       return res.status(500).send({ error: 'Erro ao inserir tribnal' });
//     }
//     res.send(result);
//   });
// });

// app.post('/foruns', (req, res) => {
//   const { nome, cidade, estado, endereco, cep, avaliacao_media } = req.body;

//   // Validação de campos obrigatórios
//   if (!nome || !cidade || !estado || !cep || !avaliacao_media) {
//     return res.status(400).send({ error: 'Todos os campos obrigatórios (nome, cidade, estado, cep, avaliação média) devem ser preenchidos' });
//   }

//   // Validação de formatos de dados
//   if (isNaN(avaliacao_media) || avaliacao_media < 0 || avaliacao_media > 10) {
//     return res.status(400).send({ error: 'Avaliação média deve ser um número entre 0 e 10' });
//   }

//   if (!/^\d{8}$/.test(cep)) {
//     return res.status(400).send({ error: 'O CEP deve ter 8 dígitos numéricos' });
//   }

//   // Query de inserção
//   const sql = `INSERT INTO foruns (nome, cidade, estado, endereco, cep, avaliacao_media) VALUES (?, ?, ?, ?, ?, ?)`;
//   db.query(sql, [nome, cidade, estado, endereco, cep, avaliacao_media], (err, result) => {
//     if (err) {
//       console.error('Erro ao inserir fórum:', err);
//       return res.status(500).send({ error: 'Erro ao inserir fórum' });
//     }
//     res.send(result);
//   });
// });

// Inserir um novo fórum
// app.post('/foruns', (req, res) => {
//   const { nome, cidade, estado, endereco, cep, avaliacao_media, imagem } = req.body;
//   const sql = `INSERT INTO foruns (nome, cidade, estado, endereco, cep, avaliacao_media, imagem) VALUES (?, ?, ?, ?, ?, ?,?)`;
//   db.query(sql, [nome, cidade, estado, endereco, cep, avaliacao_media, imagem], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // // Editar um fórum existente
// app.put('/foruns/:id', (req, res) => {
//   const { nome, cidade, estado, endereco, cep, avaliacao_media, imagem } = req.body;
//   const sql = `UPDATE foruns SET nome = ?, cidade = ?, estado = ?, endereco = ?, cep = ?, avaliacao_media = ?, imagem = ? WHERE id_forum = ?`;
//   db.query(sql, [nome, cidade, estado, endereco, cep, avaliacao_media, imagem, req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Excluir um fórum
// app.delete('/foruns/:id', (req, res) => {
//   const sql = `DELETE FROM foruns WHERE id_forum = ${req.params.id}`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });
// // Editar um tribunal existente
// app.put('/tribunais/:id', (req, res) => {
//   const { nome, cidade, estado, endereco, cep, avaliacao_media } = req.body;
//   const sql = `UPDATE tribunais SET nome = ?, cidade = ?, estado = ?, endereco = ?, cep = ?, avaliacao_media = ? WHERE id_tribunal = ?`;
//   db.query(sql, [nome, cidade, estado, endereco, cep, avaliacao_media, req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Excluir um tribunal
// app.delete('/tribunais/:id', (req, res) => {
//   const sql = `DELETE FROM tribunais WHERE id_tribunal = ${req.params.id}`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });


// app.get('/notatribunal', (req, res) => {
//   const sql = 'SELECT * FROM notatribunal';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Listar nota de tribunal por ID
// app.get('/notatribunal/:id', (req, res) => {
//   const sql = `SELECT * FROM notatribunal WHERE id_notatribunal = ${req.params.id}`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Inserir uma nova nota de tribunal
// app.post('/notatribunal', (req, res) => {
//   const { id_usuario, id_tribunal, nota } = req.body;
//   const sql = `INSERT INTO notatribunal (id_usuario, id_tribunal, nota) VALUES (?, ?, ?)`;
//   db.query(sql, [id_usuario, id_tribunal, nota], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Editar uma nota de tribunal existente
// app.put('/notatribunal/:id', (req, res) => {
//   const { id_usuario, id_tribunal, nota } = req.body;
//   const sql = `UPDATE notatribunal SET id_usuario = ?, id_tribunal = ?, nota = ? WHERE id_notatribunal = ?`;
//   db.query(sql, [id_usuario, id_tribunal, nota, req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Excluir uma nota de tribunal
// app.delete('/notatribunal/:id', (req, res) => {
//   const sql = `DELETE FROM notatribunal WHERE id_notatribunal = ${req.params.id}`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // ====================== Rotas para 'notaforuns' ======================

// // Listar todas as notas de fóruns
// app.get('/notaforuns', (req, res) => {
//   const sql = 'SELECT * FROM notaforuns';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Listar nota de fórum por ID
// app.get('/notaforuns/:id', (req, res) => {
//   const sql = `SELECT * FROM notaforuns WHERE id_notaforuns = ${req.params.id}`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Inserir uma nova nota de fórum
// app.post('/notaforuns', (req, res) => {
//   const { id_usuario, id_tribunal, nota } = req.body;
//   const sql = `INSERT INTO notaforuns (id_usuario, id_tribunal, nota) VALUES (?, ?, ?)`;
//   db.query(sql, [id_usuario, id_tribunal, nota], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Editar uma nota de fórum existente
// app.put('/notaforuns/:id', (req, res) => {
//   const { id_usuario, id_tribunal, nota } = req.body;
//   const sql = `UPDATE notaforuns SET id_usuario = ?, id_tribunal = ?, nota = ? WHERE id_notaforuns = ?`;
//   db.query(sql, [id_usuario, id_tribunal, nota, req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Excluir uma nota de fórum
// app.delete('/notaforuns/:id', (req, res) => {
//   const sql = `DELETE FROM notaforuns WHERE id_notaforuns = ${req.params.id}`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// app.get('/juiz', (req, res) => {
//   const sql = 'SELECT * FROM juiz';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Listar juiz por ID
// app.get('/juiz/:id', (req, res) => {
//   const sql = `SELECT * FROM juiz WHERE id_juiz = ${req.params.id}`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// app.post('/juiz', (req, res) => {
//   const { nome, tempo_servico, casos_julgados, avaliacao_media } = req.body;

//   // Validação de campos obrigatórios
//   if (!nome || tempo_servico == null || casos_julgados == null || !avaliacao_media) {
//     return res.status(400).send({ error: 'Os campos nome, tempo de serviço e casos julgados são obrigatórios' });
//   }

//   // Validação de formatos de dados
//   if (typeof nome !== 'string' || nome.trim() === '') {
//     return res.status(400).send({ error: 'Nome deve ser uma string não vazia' });
//   }

//   if (isNaN(avaliacao_media) || avaliacao_media < 0 || avaliacao_media > 10) {
//     return res.status(400).send({ error: 'Avaliação média deve ser um número entre 0 e 10' });
//   }

//   if (isNaN(tempo_servico) || tempo_servico < 0) {
//     return res.status(400).send({ error: 'Tempo de serviço deve ser um número positivo' });
//   }

//   if (isNaN(casos_julgados) || casos_julgados < 0) {
//     return res.status(400).send({ error: 'Casos julgados deve ser um número positivo' });
//   }

//   // Query de inserção
//   const sql = `INSERT INTO juiz (nome, tempo_servico, casos_julgados, avaliacao_media) VALUES (?, ?, ?, ?)`;
//   db.query(sql, [nome, tempo_servico, casos_julgados, avaliacao_media], (err, result) => {
//     if (err) {
//       console.error('Erro ao inserir juiz:', err);
//       return res.status(500).send({ error: 'Erro ao inserir juiz' });
//     }
//     res.send(result);
//   });
// });


// // Inserir um novo juiz
// // app.post('/juiz', (req, res) => {
// //   const { nome, tempo_servico, casos_julgados } = req.body;
// //   const sql = `INSERT INTO juiz (nome, tempo_servico, casos_julgados) VALUES (?, ?, ?)`;
// //   db.query(sql, [nome, tempo_servico, casos_julgados], (err, result) => {
// //     if (err) throw err;
// //     res.send(result);
// //   });
// // });

// // Editar um juiz existente
// app.put('/juiz/:id', (req, res) => {
//   const { nome, tempo_servico, casos_julgados, avaliacao_media } = req.body;
//   const sql = `UPDATE juiz SET nome = ?, tempo_servico = ?, casos_julgados = ?, avaliacao_media = ? WHERE id_juiz = ?`;
//   db.query(sql, [nome, tempo_servico, casos_julgados, avaliacao_media, req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Excluir um juiz
// app.delete('/juiz/:id', (req, res) => {
//   const sql = `DELETE FROM juiz WHERE id_juiz = ${req.params.id}`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// app.get('/notajuiz', (req, res) => {
//   const sql = 'SELECT * FROM notajuiz';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Listar nota de juiz por ID
// app.get('/notajuiz/:id', (req, res) => {
//   const sql = `SELECT * FROM notajuiz WHERE id_notajuiz = ${req.params.id}`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Inserir uma nova nota de juiz
// app.post('/notajuiz', (req, res) => {
//   const { id_usuario, id_juiz, nota, avaliacao_media } = req.body;
//   const sql = `INSERT INTO notajuiz (id_usuario, id_juiz, nota) VALUES (?, ?, ?)`;
//   db.query(sql, [id_usuario, id_juiz, nota, avaliacao_media], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Editar uma nota de juiz existente
// app.put('/notajuiz/:id', (req, res) => {
//   const { id_usuario, id_juiz, nota, avaliacao_media } = req.body;
//   const sql = `UPDATE notajuiz SET id_usuario = ?, id_juiz = ?, nota = ?, avaliacao_media = ? WHERE id_notajuiz = ?`;
//   db.query(sql, [id_usuario, id_juiz, nota, avaliacao_media, req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Excluir uma nota de juiz
// app.delete('/notajuiz/:id', (req, res) => {
//   const sql = `DELETE FROM notajuiz WHERE id_notajuiz = ${req.params.id}`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });app.get('/notajuiz', (req, res) => {
//   const sql = 'SELECT * FROM notajuiz';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Listar nota de juiz por ID
// app.get('/notajuiz/:id', (req, res) => {
//   const sql = `SELECT * FROM notajuiz WHERE id_notajuiz = ${req.params.id}`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Inserir uma nova nota de juiz
// app.post('/notajuiz', (req, res) => {
//   const { id_usuario, id_juiz, nota, avaliacao_media } = req.body;
//   const sql = `INSERT INTO notajuiz (id_usuario, id_juiz, nota, avaliacao_media) VALUES (?, ?, ?)`;
//   db.query(sql, [id_usuario, id_juiz, nota, avaliacao_media], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Editar uma nota de juiz existente
// app.put('/notajuiz/:id', (req, res) => {
//   const { id_usuario, id_juiz, nota, avaliacao_media } = req.body;
//   const sql = `UPDATE notajuiz SET id_usuario = ?, id_juiz = ?, nota = ?, avaliacao_media = ? WHERE id_notajuiz = ?`;
//   db.query(sql, [id_usuario, id_juiz, nota, avaliacao_media, req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Excluir uma nota de juiz
// app.delete('/notajuiz/:id', (req, res) => {
//   const sql = `DELETE FROM notajuiz WHERE id_notajuiz = ${req.params.id}`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// app.get('/mediador', (req, res) => {
//   const sql = 'SELECT * FROM mediador';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Listar mediador por ID
// app.get('/mediador/:id', (req, res) => {
//   const sql = `SELECT * FROM mediador WHERE id_mediador = ${req.params.id}`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// app.post('/mediador', (req, res) => {
//   const { nome, estado, avaliacao_media } = req.body;

//   // Validação de campos obrigatórios
//   if (!nome || !estado || avaliacao_media) {
//     return res.status(400).send({ error: 'Os campos nome e estado são obrigatórios' });
//   }

//   // Validação de formatos de dados
//   if (typeof nome !== 'string' || nome.trim() === '') {
//     return res.status(400).send({ error: 'Nome deve ser uma string não vazia' });
//   }

//   if (typeof estado !== 'string' || estado.trim() === '' || estado.length > 25) {
//     return res.status(400).send({ error: 'Estado deve ser uma string não vazia e com no máximo 25 caracteres' });
//   }

//   if (isNaN(avaliacao_media) || avaliacao_media < 0 || avaliacao_media > 10) {
//     return res.status(400).send({ error: 'Avaliação média deve ser um número entre 0 e 10' });
//   }

//   // Query de inserção
//   const sql = `INSERT INTO mediador (nome, estado) VALUES (?, ?)`;
//   db.query(sql, [nome, estado, avaliacao_media], (err, result) => {
//     if (err) {
//       console.error('Erro ao inserir mediador:', err);
//       return res.status(500).send({ error: 'Erro ao inserir mediador' });
//     }
//     res.send(result);
//   });
// });


// // Inserir um novo mediador
// // app.post('/mediador', (req, res) => {
// //   const { nome, estado } = req.body;
// //   const sql = `INSERT INTO mediador (nome, estado) VALUES (?, ?)`;
// //   db.query(sql, [nome, estado], (err, result) => {
// //     if (err) throw err;
// //     res.send(result);
// //   });
// // });

// // Editar um mediador existente
// app.put('/mediador/:id', (req, res) => {
//   const { nome, estado, avaliacao_media } = req.body;
//   const sql = `UPDATE mediador SET nome = ?, estado = ?, avaliacao_media = ? WHERE id_mediador = ?`;
//   db.query(sql, [nome, estado, avaliacao_media, req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Excluir um mediador
// app.delete('/mediador/:id', (req, res) => {
//   const sql = `DELETE FROM mediador WHERE id_mediador = ${req.params.id}`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// app.get('/notamediador', (req, res) => {
//   const sql = 'SELECT * FROM notamediador';
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Listar nota de mediador por ID
// app.get('/notamediador/:id', (req, res) => {
//   const sql = `SELECT * FROM notamediador WHERE id_notamediador = ${req.params.id}`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Inserir uma nova nota de mediador
// app.post('/notamediador', (req, res) => {
//   const { id_usuario, id_mediador, nota, avaliacao_media } = req.body;
//   const sql = `INSERT INTO notamediador (id_usuario, id_mediador, nota, avaliacao_media) VALUES (?, ?, ?, ?)`;
//   db.query(sql, [id_usuario, id_mediador, nota, avaliacao_media], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Editar uma nota de mediador existente
// app.put('/notamediador/:id', (req, res) => {
//   const { id_usuario, id_mediador, nota, avaliacao_media } = req.body;
//   const sql = `UPDATE notamediador SET id_usuario = ?, id_mediador = ?, nota = ?, avaliacao_media = ? WHERE id_notamediador = ?`;
//   db.query(sql, [id_usuario, id_mediador, nota, avaliacao_media, req.params.id], (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Excluir uma nota de mediador
// app.delete('/notamediador/:id', (req, res) => {
//   const sql = `DELETE FROM notamediador WHERE id_notamediador = ${req.params.id}`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

// // Mesma lógica para 'tribunais' e 'usuarios'

// // Iniciar o servidor
// app.listen(3001, () => {
//   console.log('Servidor rodando na porta 3001');
// });
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = 'seu_segredo_jwt';


// Configuração do MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'justix'
});

db.connect(err => {
  if (err) {
    console.log('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao MySQL');
  }
});

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.originalUrl.split('/')[1]; // Pega 'foruns', 'tribunais', etc.
    const uploadPath = path.join(__dirname, 'uploads', type);
    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage, 
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Erro: Arquivo deve ser uma imagem (jpeg, jpg, png, gif)!');
    }
  }
});

// Rota para upload de imagens genérica
app.post('/upload/:type', upload.single('image'), (req, res) => {
  if (req.file) {
    res.send({ message: 'Arquivo enviado com sucesso!', file: req.file });
  } else {
    res.status(400).send({ message: 'Erro ao enviar o arquivo.' });
  }
});

// Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Função auxiliar para deletar arquivo de imagem
const deleteImage = (imagePath) => {
  if (!imagePath) return;
  
  const fullPath = path.join(__dirname, imagePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

// ROTAS PARA FÓRUNS
app.get('/foruns', (req, res) => {
  const sql = 'SELECT * FROM foruns';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/foruns', upload.single('imagem'), (req, res) => {
  const { nome, cidade, estado, endereco, cep, avaliacao_media } = req.body;
  const imagem = req.file ? `/uploads/foruns/${req.file.filename}` : null;

  if (!nome || !cidade || !estado || !cep || !avaliacao_media) {
    return res.status(400).send({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
  }

  const sql = 'INSERT INTO foruns (nome, cidade, estado, endereco, cep, avaliacao_media, imagem) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [nome, cidade, estado, endereco, cep, avaliacao_media, imagem], (err, result) => {
    if (err) {
      console.error('Erro ao inserir fórum:', err);
      return res.status(500).send({ error: 'Erro ao inserir fórum' });
    }
    res.send({ ...result, imagem });
  });
});

app.put('/foruns/:id', upload.single('imagem'), (req, res) => {
  const id = req.params.id;
  const { nome, cidade, estado, endereco, cep, avaliacao_media } = req.body;
  
  db.query('SELECT imagem FROM foruns WHERE id_forum = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).send({ error: 'Erro ao buscar fórum' });
    }

    const antigaImagem = result[0]?.imagem;
    const novaImagem = req.file ? `/uploads/foruns/${req.file.filename}` : antigaImagem;

    const sql = `
      UPDATE foruns 
      SET nome = ?, cidade = ?, estado = ?, endereco = ?, 
          cep = ?, avaliacao_media = ?, imagem = ?
      WHERE id_forum = ?
    `;

    db.query(
      sql, 
      [nome, cidade, estado, endereco, cep, avaliacao_media, novaImagem, id],
      (err, result) => {
        if (err) {
          return res.status(500).send({ error: 'Erro ao atualizar fórum' });
        }

        if (req.file && antigaImagem) {
          deleteImage(antigaImagem);
        }

        res.send({ message: 'Fórum atualizado com sucesso' });
      }
    );
  });
});

app.delete('/foruns/:id', (req, res) => {
  const id = req.params.id;

  db.query('SELECT imagem FROM foruns WHERE id_forum = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).send({ error: 'Erro ao buscar fórum' });
    }

    const imagem = result[0]?.imagem;

    db.query('DELETE FROM foruns WHERE id_forum = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).send({ error: 'Erro ao deletar fórum' });
      }

      if (imagem) {
        deleteImage(imagem);
      }

      res.send({ message: 'Fórum deletado com sucesso' });
    });
  });
});

// ROTAS PARA TRIBUNAIS
app.get('/tribunais', (req, res) => {
  const sql = 'SELECT * FROM tribunais';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/tribunais', upload.single('imagem'), (req, res) => {
  const { nome, cidade, estado, endereco, cep, avaliacao_media } = req.body;
  const imagem = req.file ? `/uploads/tribunais/${req.file.filename}` : null;

  if (!nome || !cidade || !estado || !cep || !avaliacao_media) {
    return res.status(400).send({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
  }

  const sql = 'INSERT INTO tribunais (nome, cidade, estado, endereco, cep, avaliacao_media, imagem) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [nome, cidade, estado, endereco, cep, avaliacao_media, imagem], (err, result) => {
    if (err) {
      console.error('Erro ao inserir tribunal:', err);
      return res.status(500).send({ error: 'Erro ao inserir tribunal' });
    }
    res.send({ ...result, imagem });
  });
});

app.put('/tribunais/:id', upload.single('imagem'), (req, res) => {
  const id = req.params.id;
  const { nome, cidade, estado, endereco, cep, avaliacao_media } = req.body;
  
  db.query('SELECT imagem FROM tribunais WHERE id_tribunal = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).send({ error: 'Erro ao buscar tribunal' });
    }

    const antigaImagem = result[0]?.imagem;
    const novaImagem = req.file ? `/uploads/tribunais/${req.file.filename}` : antigaImagem;

    const sql = `
      UPDATE tribunais 
      SET nome = ?, cidade = ?, estado = ?, endereco = ?, 
          cep = ?, avaliacao_media = ?, imagem = ?
      WHERE id_tribunal = ?
    `;

    db.query(
      sql, 
      [nome, cidade, estado, endereco, cep, avaliacao_media, novaImagem, id],
      (err, result) => {
        if (err) {
          return res.status(500).send({ error: 'Erro ao atualizar tribunal' });
        }

        if (req.file && antigaImagem) {
          deleteImage(antigaImagem);
        }

        res.send({ message: 'Tribunal atualizado com sucesso' });
      }
    );
  });
});

app.delete('/tribunais/:id', (req, res) => {
  const id = req.params.id;

  db.query('SELECT imagem FROM tribunais WHERE id_tribunal = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).send({ error: 'Erro ao buscar tribunal' });
    }

    const imagem = result[0]?.imagem;

    db.query('DELETE FROM tribunais WHERE id_tribunal = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).send({ error: 'Erro ao deletar tribunal' });
      }

      if (imagem) {
        deleteImage(imagem);
      }

      res.send({ message: 'Tribunal deletado com sucesso' });
    });
  });
});

// ROTAS PARA JUIZ
app.get('/juiz', (req, res) => {
  const sql = 'SELECT * FROM juiz';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/juiz', upload.single('imagem'), (req, res) => {
  const { nome, tempo_servico, casos_julgados, avaliacao_media } = req.body;
  const imagem = req.file ? `/uploads/juiz/${req.file.filename}` : null;

  if (!nome || !tempo_servico || !casos_julgados || !avaliacao_media) {
    return res.status(400).send({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
  }

  const sql = 'INSERT INTO juiz (nome, tempo_servico, casos_julgados, avaliacao_media, imagem) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nome, tempo_servico, casos_julgados, avaliacao_media, imagem], (err, result) => {
    if (err) {
      console.error('Erro ao inserir juiz:', err);
      return res.status(500).send({ error: 'Erro ao inserir juiz' });
    }
    res.send({ ...result, imagem });
  });
});

app.put('/juiz/:id', upload.single('imagem'), (req, res) => {
  const id = req.params.id;
  const { nome, tempo_servico, casos_julgados, avaliacao_media } = req.body;
  
  db.query('SELECT imagem FROM juiz WHERE id_juiz = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).send({ error: 'Erro ao buscar juiz' });
    }

    const antigaImagem = result[0]?.imagem;
    const novaImagem = req.file ? `/uploads/juiz/${req.file.filename}` : antigaImagem;

    const sql = `
      UPDATE juiz 
      SET nome = ?, tempo_servico = ?, casos_julgados = ?, 
          avaliacao_media = ?, imagem = ?
      WHERE id_juiz = ?
    `;

    db.query(
      sql, 
      [nome, tempo_servico, casos_julgados, avaliacao_media, novaImagem, id],
      (err, result) => {
        if (err) {
          return res.status(500).send({ error: 'Erro ao atualizar juiz' });
        }

        if (req.file && antigaImagem) {
          deleteImage(antigaImagem);
        }

        res.send({ message: 'Juiz atualizado com sucesso' });
      }
    );
  });
});

app.delete('/juiz/:id', (req, res) => {
  const id = req.params.id;

  db.query('SELECT imagem FROM juiz WHERE id_juiz = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).send({ error: 'Erro ao buscar juiz' });
    }

    const imagem = result[0]?.imagem;

    db.query('DELETE FROM juiz WHERE id_juiz = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).send({ error: 'Erro ao deletar juiz' });
      }

      if (imagem) {
        deleteImage(imagem);
      }

      res.send({ message: 'Juiz deletado com sucesso' });
    });
  });
});

// ROTAS PARA MEDIADOR
app.get('/mediador', (req, res) => {
  const sql = 'SELECT * FROM mediador';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/mediador', upload.single('imagem'), (req, res) => {
  const { nome, estado, avaliacao_media } = req.body;
  const imagem = req.file ? `/uploads/mediador/${req.file.filename}` : null;

  if (!nome || !estado || !avaliacao_media) {
    return res.status(400).send({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
  }

  const sql = 'INSERT INTO mediador (nome, estado, avaliacao_media, imagem) VALUES (?, ?, ?, ?)';
  db.query(sql, [nome, estado, avaliacao_media, imagem], (err, result) => {
    if (err) {
      console.error('Erro ao inserir mediador:', err);
      return res.status(500).send({ error: 'Erro ao inserir mediador' });
    }
    res.send({ ...result, imagem });
  });
});

app.put('/mediador/:id', upload.single('imagem'), (req, res) => {
  const id = req.params.id;
  const { nome, estado, avaliacao_media } = req.body;
  
  db.query('SELECT imagem FROM mediador WHERE id_mediador = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).send({ error: 'Erro ao buscar mediador' });
    }

    const antigaImagem = result[0]?.imagem;
    const novaImagem = req.file ? `/uploads/mediador/${req.file.filename}` : antigaImagem;

    const sql = `
      UPDATE mediador 
      SET nome = ?, estado = ?, avaliacao_media = ?, imagem = ?
      WHERE id_mediador = ?
    `;

    db.query(
      sql, 
      [nome, estado, avaliacao_media, novaImagem, id],
      (err, result) => {
        if (err) {
          return res.status(500).send({ error: 'Erro ao atualizar mediador' });
        }

        if (req.file && antigaImagem) {
          deleteImage(antigaImagem);
        }

        res.send({ message: 'Mediador atualizado com sucesso' });
      }
    );
  });
});

app.delete('/mediador/:id', (req, res) => {
  const id = req.params.id;

  db.query('SELECT imagem FROM mediador WHERE id_mediador = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).send({ error: 'Erro ao buscar mediador' });
    }

    const imagem = result[0]?.imagem;

    db.query('DELETE FROM mediador WHERE id_mediador = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).send({ error: 'Erro ao deletar mediador' });
      }

      if (imagem) {
        deleteImage(imagem);
      }

      res.send({ message: 'Mediador deletado com sucesso' });
    });
  });
});

app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/usuarios', async (req, res) => {
  console.log('Recebendo requisição de cadastro:', req.body); // Log dos dados recebidos

  const { cpf, nome, email, senha, telefone } = req.body;

  if (!cpf || !nome || !email || !senha) {
    console.log('Campos obrigatórios faltando'); // Log de validação
    return res.status(400).send({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
  }

  // Verificar se o usuário já existe
  const sqlCheck = 'SELECT * FROM usuarios WHERE cpf = ? OR email = ?';
  db.query(sqlCheck, [cpf, email], async (err, result) => {
    if (err) {
      console.error('Erro na verificação de usuário existente:', err); // Log de erro
      return res.status(500).send({ error: 'Erro no servidor' });
    }
    if (result.length > 0) {
      console.log('Usuário já existe'); // Log de usuário duplicado
      return res.status(400).send({ error: 'Usuário já cadastrado com esse CPF ou email' });
    }

    try {
      // Criptografar a senha
      const hashedSenha = await bcrypt.hash(senha, 10);

      // Inserir usuário
      const sql = 'INSERT INTO usuarios (cpf, nome, email, senha, telefone) VALUES (?, ?, ?, ?, ?)';
      db.query(sql, [cpf, nome, email, hashedSenha, telefone], (err, result) => {
        if (err) {
          console.error('Erro ao inserir usuário:', err); // Log de erro na inserção
          return res.status(500).send({ error: 'Erro ao cadastrar usuário' });
        }
        console.log('Usuário cadastrado com sucesso'); // Log de sucesso
        res.status(201).send({ message: 'Usuário cadastrado com sucesso' });
      });
    } catch (error) {
      console.error('Erro ao criptografar senha:', error); // Log de erro na criptografia
      return res.status(500).send({ error: 'Erro ao processar cadastro' });
    }
  });
});

// Login de usuário
// server.js - Rota de login modificada
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).send({ error: 'Erro no servidor' });
    if (result.length === 0) return res.status(400).send({ error: 'Usuário não encontrado' });

    const usuario = result[0];
    const isMatch = await bcrypt.compare(senha, usuario.senha);
    if (!isMatch) return res.status(400).send({ error: 'Senha incorreta' });

    // Incluir role no token
    const token = jwt.sign(
      { 
        id: usuario.id_usuario,
        role: usuario.role,
        nome: usuario.nome 
      }, 
      JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.send({ 
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: usuario.id_usuario,
        nome: usuario.nome,
        role: usuario.role
      }
    });
  });
});

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send({ error: 'Token não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send({ error: 'Token inválido' });
    req.user = user;
    next();
  });
};

// Middleware de autorização por role
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({ 
        error: 'Acesso não autorizado'
      });
    }
    next();
  };
};

// Manipulação de erros do Multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).send({ error: 'Arquivo muito grande. Máximo de 5MB permitido.' });
    }
    return res.status(400).send({ error: err.message });
  }
  next(err);
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});