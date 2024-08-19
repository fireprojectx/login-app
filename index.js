const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());

// Servindo o arquivo HTML para a rota raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Usando as rotas de autenticação
app.use('/auth', authRoutes);

// Configurando a porta e iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
