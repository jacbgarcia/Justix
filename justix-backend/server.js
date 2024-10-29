const mysql = require('mysql2');
require ('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const JWT_SECRET = 'root';


// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
// Conectar ao banco de dados
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados.');
});



// // Configuração do MySQL
// const db = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'root',
//   database: 'justix'
// });

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
app.get('/tokens', (req, res) => {
  const sql = 'SELECT * FROM user_tokens';
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


// GET all advogados
app.get('/advocacia', (req, res) => {
  const sql = 'SELECT * FROM advocacia';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// POST new advogado
app.post('/advocacia', upload.single('imagem'), (req, res) => {
  const { nome, profissao, experiencia, escritorio, endereco, avaliacao_media } = req.body;
  const imagem = req.file ? `/uploads/advocacia/${req.file.filename}` : null;

  // Validação condicional com base na profissão
  if (!nome || !profissao) {
    return res.status(400).send({ error: 'Nome e profissão são obrigatórios' });
  }

  // Validação condicional de acordo com a profissão
  if (profissao === 'Advogado' && (!experiencia || !escritorio)) {
    return res.status(400).send({ error: 'Experiência e escritório são obrigatórios para Advogados' });
  }

  if (profissao === 'Escritório' && !endereco) {
    return res.status(400).send({ error: 'Endereço é obrigatório para Escritórios' });
  }

  // Validação da avaliação média
  const avaliacaoNumero = Number(avaliacao_media);
  if (isNaN(avaliacaoNumero) || avaliacaoNumero < 0 || avaliacaoNumero > 10) {
    return res.status(400).send({ error: 'Avaliação média deve ser um número entre 0 e 10' });
  }

  const sql = `
    INSERT INTO advocacia 
    (nome, profissao, experiencia, escritorio, endereco, imagem, avaliacao_media) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql, 
    [
      nome, 
      profissao, 
      experiencia || null, 
      escritorio || null, 
      endereco || null, 
      imagem,
      avaliacaoNumero
    ], 
    (err, result) => {
      if (err) {
        console.error('Erro ao inserir advogado:', err);
        return res.status(500).send({ error: 'Erro ao inserir advogado' });
      }
      res.send({ ...result, imagem, avaliacao_media: avaliacaoNumero });
    }
  );
});

// PUT update advogado
app.put('/advocacia/:id', upload.single('imagem'), (req, res) => {
  const id = req.params.id;
  const { nome, profissao, experiencia, escritorio, endereco, avaliacao_media } = req.body;
  
  // Log de todos os dados recebidos para depuração
  console.log('Dados recebidos:', req.body);
  console.log('Arquivo de imagem:', req.file);

  // Validação da avaliação média
  const avaliacaoNumero = Number(avaliacao_media);
  if (isNaN(avaliacaoNumero) || avaliacaoNumero < 0 || avaliacaoNumero > 10) {
    return res.status(400).send({ error: 'Avaliação média deve ser um número entre 0 e 10' });
  }

  db.query('SELECT imagem FROM advocacia WHERE id_advocacia = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).send({ error: 'Erro ao buscar advogado' });
    }

    const antigaImagem = result[0]?.imagem;
    const novaImagem = req.file ? `/uploads/advocacia/${req.file.filename}` : antigaImagem;

    const sql = `
      UPDATE advocacia 
      SET nome = ?, 
          profissao = ?, 
          experiencia = ?, 
          escritorio = ?, 
          endereco = ?, 
          imagem = ?,
          avaliacao_media = ?
      WHERE id_advocacia = ?
    `;

    db.query(
      sql, 
      [
        nome, 
        profissao, 
        experiencia || null, 
        escritorio || null, 
        endereco || null, 
        novaImagem,
        avaliacaoNumero,
        id
      ],
      (err, result) => {
        if (err) {
          console.error('Erro ao atualizar advogado:', err);
          return res.status(500).send({ error: 'Erro ao atualizar advogado' });
        }

        if (req.file && antigaImagem) {
          deleteImage(antigaImagem);
        }

        res.send({ 
          message: 'Advogado atualizado com sucesso',
          avaliacao_media: avaliacaoNumero
        });
      }
    );
  });
});

// Rota para buscar por profissão específica
app.get('/advocacia/profissao/:profissao', (req, res) => {
  const profissao = req.params.profissao;
  const sql = 'SELECT * FROM advocacia WHERE profissao = ?';
  
  db.query(sql, [profissao], (err, result) => {
    if (err) {
      console.error('Erro ao buscar por profissão:', err);
      return res.status(500).send({ error: 'Erro ao buscar por profissão' });
    }
    res.send(result);
  });
});

// DELETE advogado
app.delete('/advocacia/:id', (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM advocacia WHERE id_advocacia = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir advogado:', err);
      return res.status(500).send({ error: 'Erro ao excluir advogado' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Advogado não encontrado' });
    }

    res.send({ message: 'Advogado excluído com sucesso' });
  });
});


app.get('/portais', (req, res) => {
  const sql = 'SELECT id_portal, nome, url, imagem, avaliacao_media FROM portal';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erro ao buscar portais:', err);
      return res.status(500).send({ error: 'Erro ao buscar portais', details: err.message });
    }
    // Log para debug
    console.log('Portais encontrados:', result);
    res.send(result);
  });
});

// Rota POST - Criar portal com validação de URL
app.post('/portais', upload.single('imagem'), (req, res) => {
  console.log('Dados recebidos:', req.body); // Log para debug

  const { nome, url, avaliacao_media } = req.body;
  const imagem = req.file ? `/uploads/portais/${req.file.filename}` : null;

  // Validação mais rigorosa dos campos
  if (!nome || !url) {
    if (req.file) {
      deleteImage(`/uploads/portais/${req.file.filename}`);
    }
    return res.status(400).send({ 
      error: 'Nome e URL são obrigatórios',
      receivedData: { nome, url } // Mostra os dados recebidos para debug
    });
  }

  // Validação básica de URL
  try {
    new URL(url);
  } catch (e) {
    if (req.file) {
      deleteImage(`/uploads/portais/${req.file.filename}`);
    }
    return res.status(400).send({ error: 'URL inválida' });
  }

  const sql = 'INSERT INTO portal (nome, url, imagem, avaliacao_media) VALUES (?, ?, ?, ?)';
  const values = [
    nome,
    url,
    imagem,
    avaliacao_media || '2.00'
  ];

  // Log para debug
  console.log('SQL:', sql);
  console.log('Valores:', values);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir portal:', err);
      if (req.file) {
        deleteImage(`/uploads/portais/${req.file.filename}`);
      }
      return res.status(500).send({ 
        error: 'Erro ao inserir portal', 
        details: err.message,
        sql: sql,
        values: values
      });
    }

    // Buscar o registro recém-inserido para confirmar
    db.query('SELECT * FROM portal WHERE id_portal = ?', [result.insertId], (err, selectResult) => {
      if (err) {
        console.error('Erro ao buscar portal inserido:', err);
        return res.status(500).send({ 
          error: 'Portal inserido mas erro ao recuperar dados', 
          id: result.insertId 
        });
      }
      console.log('Portal inserido:', selectResult[0]); // Log para debug
      res.status(201).send(selectResult[0]);
    });
  });
});

// Rota PUT - Atualizar portal com validação de URL
app.put('/portais/:id', upload.single('imagem'), (req, res) => {
  console.log('Dados de atualização recebidos:', req.body); // Log para debug
  
  const id = req.params.id;
  const { nome, url, avaliacao_media } = req.body;

  // Se uma URL foi fornecida, validá-la
  if (url) {
    try {
      new URL(url);
    } catch (e) {
      if (req.file) {
        deleteImage(`/uploads/portais/${req.file.filename}`);
      }
      return res.status(400).send({ error: 'URL inválida' });
    }
  }
  
  // Primeiro, verificar se o portal existe
  db.query('SELECT * FROM portal WHERE id_portal = ?', [id], (err, result) => {
    if (err) {
      console.error('Erro ao buscar portal:', err);
      return res.status(500).send({ 
        error: 'Erro ao buscar portal', 
        details: err.message 
      });
    }

    if (result.length === 0) {
      if (req.file) {
        deleteImage(`/uploads/portais/${req.file.filename}`);
      }
      return res.status(404).send({ error: 'Portal não encontrado' });
    }

    const antigaImagem = result[0].imagem;
    const novaImagem = req.file ? `/uploads/portais/${req.file.filename}` : antigaImagem;

    // Preparar dados para atualização
    const updateData = {
      nome: nome || result[0].nome,
      url: url || result[0].url,
      imagem: novaImagem,
      avaliacao_media: avaliacao_media || result[0].avaliacao_media
    };

    const sql = `
      UPDATE portal 
      SET nome = ?, 
          url = ?, 
          imagem = ?, 
          avaliacao_media = ?
      WHERE id_portal = ?
    `;

    const updateValues = [
      updateData.nome,
      updateData.url,
      updateData.imagem,
      updateData.avaliacao_media,
      id
    ];

    // Log para debug
    console.log('SQL de atualização:', sql);
    console.log('Valores de atualização:', updateValues);

    db.query(sql, updateValues, (updateErr, updateResult) => {
      if (updateErr) {
        console.error('Erro ao atualizar portal:', updateErr);
        if (req.file) {
          deleteImage(`/uploads/portais/${req.file.filename}`);
        }
        return res.status(500).send({ 
          error: 'Erro ao atualizar portal', 
          details: updateErr.message 
        });
      }

      if (updateResult.affectedRows === 0) {
        if (req.file) {
          deleteImage(`/uploads/portais/${req.file.filename}`);
        }
        return res.status(404).send({ error: 'Nenhum registro foi atualizado' });
      }

      // Se há uma nova imagem e existia uma antiga, deletar a antiga
      if (req.file && antigaImagem) {
        deleteImage(antigaImagem);
      }

      // Buscar o registro atualizado para confirmar
      db.query('SELECT * FROM portal WHERE id_portal = ?', [id], (err, finalResult) => {
        if (err) {
          console.error('Erro ao buscar portal atualizado:', err);
          return res.status(500).send({ 
            error: 'Portal atualizado mas erro ao recuperar dados', 
            id: id 
          });
        }
        console.log('Portal atualizado:', finalResult[0]); // Log para debug
        res.send(finalResult[0]);
      });
    });
  });
});

app.delete('/portais/:id', (req, res) => {
  const id = req.params.id;

  db.query('SELECT imagem FROM portal WHERE id_portal = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).send({ error: 'Erro ao buscar portal' });
    }

    const imagem = result[0]?.imagem;

    db.query('DELETE FROM portal WHERE id_portal = ?', [id], (err, result) => {
      if (err) {
        console.error('Erro ao deletar portal:', err);
        return res.status(500).send({ error: 'Erro ao deletar portal' });
      }

      if (imagem) {
        deleteImage(imagem);
      }

      res.send({ message: 'Portal deletado com sucesso' });
    });
  });
});

// Rota GET - Buscar portais com base em um termo de pesquisa
app.get('/portais/search', (req, res) => {
  const searchTerm = req.query.term;

  // Consulta SQL para filtrar os registros que contenham o termo
  const sql = `
    SELECT id_portal, nome, url, imagem, avaliacao_media
    FROM portal
    WHERE nome LIKE ? OR url LIKE ?
  `;

  const values = [`%${searchTerm}%`, `%${searchTerm}%`];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao buscar portais:', err);
      return res.status(500).send({ error: 'Erro ao buscar portais' });
    }
    res.send(result);
  });
});





//usuarios


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

// Adicione esta rota no seu server.js
app.get('/api/usuario/:id', (req, res) => {
  const userId = req.params.id;

  const sql = 'SELECT id_usuario, nome, email, role FROM usuarios WHERE id_usuario = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Erro ao buscar dados do usuário:', err);
      return res.status(500).send({ error: 'Erro interno do servidor' });
    }
    
    if (result.length === 0) {
      return res.status(404).send({ error: 'Usuário não encontrado' });
    }

    res.json(result[0]);
  });
});

// Login de usuário
// server.js - Rota de login modificada
app.post('/login', async (req, res) => {
  try {
      const { email, senha } = req.body;

      // Validação básica
      if (!email || !senha) {
          return res.status(400).json({ error: 'Email e senha são obrigatórios' });
      }

      const sql = 'SELECT * FROM usuarios WHERE email = ?';
      
      db.query(sql, [email], async (err, result) => {
          if (err) {
              console.error('Erro na consulta:', err);
              return res.status(500).json({ error: 'Erro no servidor' });
          }
          
          if (result.length === 0) {
              return res.status(400).json({ error: 'Usuário não encontrado' });
          }

          const usuario = result[0];
          
          try {
              const isMatch = await bcrypt.compare(senha, usuario.senha);
              
              if (!isMatch) {
                  return res.status(400).json({ error: 'Senha incorreta' });
              }

              const token = jwt.sign(
                  {
                      id: usuario.id_usuario,
                      role: usuario.role,
                      nome: usuario.nome
                  },
                  process.env.JWT_SECRET,
                  { expiresIn: '1h' }
              );

              res.json({
                  message: 'Login realizado com sucesso',
                  token,
                  user: {
                      id: usuario.id_usuario,
                      nome: usuario.nome,
                      role: usuario.role,
                      cpf: usuario.cpf,         // Adicionado
                      email: usuario.email,      // Adicionado
                      telefone: usuario.telefone // Adicionado
                  }
              });
          } catch (bcryptError) {
              console.error('Erro ao comparar senhas:', bcryptError);
              return res.status(500).json({ error: 'Erro ao verificar senha' });
          }
      });
  } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

const authenticateToken = (req, res, next) => {
  try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
          return res.status(401).json({ error: 'Token não fornecido' });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
          if (err) {
              return res.status(403).json({ error: 'Token inválido' });
          }
          req.user = user;
          next();
      });
  } catch (error) {
      console.error('Erro na autenticação:', error);
      res.status(500).json({ error: 'Erro na autenticação' });
  }
};

// Exemplo de rota protegida
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Rota protegida', user: req.user });
});

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





app.post('/av_foruns', async (req, res) => {
  const { id_usuario, id_forum, numero_protocolo, comentario, avaliacao, horario_chegada, horario_saida } = req.body;

  if (!avaliacao || avaliacao < 1 || avaliacao > 5) {
    return res.status(400).json({ error: "Avaliação deve estar entre 1 e 5." });
  }
  if (!numero_protocolo || numero_protocolo.length < 5 || numero_protocolo.length > 20) {
    return res.status(400).json({ error: "Número de protocolo deve ter entre 5 e 20 dígitos." });
  }

  try {
    await db.promise().query(
      'INSERT INTO av_foruns (id_usuario, id_forum, numero_protocolo, comentario, avaliacao, horario_chegada, horario_saida) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id_usuario, id_forum, numero_protocolo, comentario || null, avaliacao, horario_chegada || null, horario_saida || null]
    );
    // console.log(
    //   'INSERT INTO av_foruns (id_usuario, id_forum, numero_protocolo, comentario, avaliacao, horario_chegada, horario_saida) VALUES (?, ?, ?, ?, ?, ?, ?)',
    //   [id_usuario, id_forum, numero_protocolo, comentario || null, avaliacao, horario_chegada || null, horario_saida || null]
    // );
    res.status(201).json({ message: 'Comentário e avaliação adicionados com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar o comentário e a avaliação.' });
  }
});

// // Rota para obter os comentários de um fórum específico
// app.get('/av_foruns/:id_forum', async (req, res) => {
//   const { id_forum } = req.params;

//   try {
//     const [comentarios] = await db.query(
//       `SELECT u.nome, af.comentario, af.avaliacao, af.data_criacao, af.numero_protocolo, af.horario_chegada, af.horario_saida
//        FROM av_foruns af
//        JOIN usuarios u ON af.id_usuario = u.id_usuario
//        WHERE af.id_forum = ?
//        ORDER BY af.data_criacao DESC`,
//       [id_forum]
//     );
//     res.json({ comments: comentarios });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Erro ao buscar comentários.' });
//   }
// });

// // Rota para calcular a média de avaliações de um fórum específico
app.get('/foruns_avaliacao/:id_forum', async (req, res) => {
  try {
    const [resultado] = await db.promise().query(
      'SELECT ROUND(AVG(avaliacao),2) AS media_avaliacao FROM av_foruns WHERE id_forum = ?',
      [req.params.id_forum]
    );
    res.json({ media_avaliacao: resultado[0].media_avaliacao || 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao calcular a média de avaliações.' });
  }
});
app.get('/av_foruns', (req, res) => {
  const sql = 'SELECT * FROM av_foruns';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Rota com parâmetro: /av_foruns/1 (onde 1 é o id_forum)
app.get('/av_foruns/:id_forum', (req, res) => {
  const sql = 'SELECT * FROM av_foruns WHERE id_forum = ?';
  db.query(sql, [req.params.id_forum], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(result);
  });
});





// Rota para adicionar um comentário
// app.post('/av_foruns', (req, res) => {
//     const { id_usuario, id_forum, numero_protocolo, comentario, avaliacao, horario_chegada, horario_saida } = req.body;

//     // Validações
//     if (!id_usuario) {
//         return res.status(400).json({ error: 'ID do usuário não fornecido.' });
//     }

//     if (!id_forum) {
//         return res.status(400).json({ error: 'ID do fórum não fornecido.' });
//     }

//     // Verifica se o usuário existe
//     connection.query('SELECT id_usuario FROM usuarios WHERE id_usuario = ?', [id_usuario], (err, userRows) => {
//         if (err) {
//             console.error('Erro ao verificar usuário:', err);
//             return res.status(500).json({ error: 'Erro interno do servidor' });
//         }
//         if (userRows.length === 0) {
//             return res.status(404).json({ error: 'Usuário não encontrado' });
//         }
        

//         // Verifica se o fórum existe
//         connection.query('SELECT id_forum FROM foruns WHERE id_forum = ?', [id_forum], (err, forumRows) => {
//             if (err) {
//                 console.error('Erro ao verificar fórum:', err);
//                 return res.status(500).json({ error: 'Erro interno do servidor' });
//             }
//             if (forumRows.length === 0) {
//                 return res.status(404).json({ error: 'Fórum não encontrado' });
//             }

//             // Insere o comentário
//             const insertQuery = `INSERT INTO av_foruns (id_usuario, id_forum, numero_protocolo, comentario, avaliacao, horario_chegada, horario_saida) VALUES (?, ?, ?, ?, ?, ?, ?)`;
//             const insertValues = [id_usuario, id_forum, numero_protocolo, comentario || null, avaliacao, horario_chegada || null, horario_saida || null];

//             connection.query(insertQuery, insertValues, (err, result) => {
//                 if (err) {
//                     console.error('Erro ao inserir comentário:', err);
//                     return res.status(500).json({ error: 'Erro interno do servidor' });
//                 }

//                 // Busca o comentário recém-inserido
//                 connection.query('SELECT af.*, u.nome as nome_usuario FROM av_foruns af JOIN usuarios u ON af.id_usuario = u.id_usuario WHERE af.id_comentario = ?', [result.insertId], (err, comentarioInserido) => {
//                     if (err) {
//                         console.error('Erro ao buscar comentário inserido:', err);
//                         return res.status(500).json({ error: 'Erro interno do servidor' });
//                     }

//                     res.status(201).json({
//                         success: true,
//                         message: 'Comentário inserido com sucesso',
//                         data: comentarioInserido[0]
//                     });
//                 });
//             });
//         });
//     });
// });





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

const PORT = process.env.PORT || 3001; // Aqui, o backend escuta na porta 3001
app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
});


// app.listen(3001, () => {
//   console.log('Servidor rodando na porta 3001');
// });