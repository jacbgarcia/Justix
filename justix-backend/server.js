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