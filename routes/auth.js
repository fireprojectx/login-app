const express = require('express');
const sql = require('../db/db');
const bcrypt = require('bcrypt');
const router = express.Router();

// Rota para cadastro
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await sql`
      INSERT INTO users (name, email, password) 
      VALUES (${name}, ${email}, ${hashedPassword}) 
      RETURNING *`;

    res.status(201).json(result[0]);
  } catch (err) {
    console.error('Erro ao cadastrar:', err);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
});

// Rota para login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = users[0];

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200).json({ message: 'Login bem-sucedido', user });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

module.exports = router;



