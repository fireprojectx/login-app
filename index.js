const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');

const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

// Servindo arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Usando as rotas de autenticação
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

