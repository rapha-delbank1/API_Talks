const express = require('express');
const app = express();

const statusCodes = [
    { code: 200, message: 'OK' },
    { code: 201, message: 'Created' },
    { code: 204, message: 'No Content' },
    { code: 400, message: 'Bad Request' },
    { code: 401, message: 'Unauthorized' },
    { code: 403, message: 'Forbidden' },
    { code: 404, message: 'Not Found' },
    { code: 405, message: 'Method Not Allowed' },
    { code: 500, message: 'Internal Server Error' },
    { code: 504, message: 'Gateway Timeout' },
];

// Rota para pegar todos os status
app.get('/status-codes', (req, res) => {
    res.json(statusCodes);
});

// Rota para pegar o código de status da URL
app.get('/:statusCode', (req, res) => {
    const statusCode = parseInt(req.params.statusCode);

    // Verifica se o código de status é um número válido
    if (!isNaN(statusCode)) {
        res.status(statusCode).json({ status: statusCode });
    } else {
        res.status(400).json({ error: 'Invalid status code' });
    }
});

// Define a porta para o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
