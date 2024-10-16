const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let database = [];

// GET - Obter todos os itens
app.get('/items', (req, res) => {
    console.log('Requisição GET recebida');
    res.status(200).json(database);
});

// POST - Adicionar um novo item
app.post('/items', (req, res) => {
    const newItem = req.body;
    newItem.id = database.length + 1;
    database.push(newItem);
    console.log(`Item adicionado: ${JSON.stringify(newItem)}`);
    res.status(201).json(newItem);
});

// GET - Obter um item específico por ID
app.get('/items/:id', (req, res) => {
    const { id } = req.params;
    const item = database.find(item => item.id == id);

    if (item) {
        console.log(`Requisição GET para o item com id ${id}`);
        return res.status(200).json(item);
    }

    console.log(`Item com id ${id} não encontrado`);
    res.status(404).json({ error: 'Item não encontrado' });
});

// PUT - Atualizar um item inteiro por ID
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const itemIndex = database.findIndex(item => item.id == id);

    if (itemIndex > -1) {
        updatedItem.id = parseInt(id);
        database[itemIndex] = updatedItem;
        console.log(`Item com id ${id} atualizado: ${JSON.stringify(updatedItem)}`);
        return res.status(200).json(updatedItem);
    }

    console.log(`Item com id ${id} não encontrado para atualização`);
    res.status(404).json({ error: 'Item não encontrado' });
});

// PATCH - Atualizar parcialmente um item por ID
app.patch('/items/:id', (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    const item = database.find(item => item.id == id);

    if (item) {
        Object.assign(item, updatedFields);
        console.log(`Item com id ${id} parcialmente atualizado: ${JSON.stringify(item)}`);
        return res.status(200).json(item);
    }

    console.log(`Item com id ${id} não encontrado para atualização parcial`);
    res.status(404).json({ error: 'Item não encontrado' });
});

// DELETE - Remover item por ID
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    const itemIndex = database.findIndex(item => item.id == id);

    if (itemIndex > -1) {
        database.splice(itemIndex, 1);
        console.log(`Item com id ${id} deletado`);
        return res.status(200).json({ message: 'Item deletado' });
    }

    console.log(`Item com id ${id} não encontrado`);
    res.status(404).json({ error: 'Item não encontrado' });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
