const apiUrl = 'http://127.0.0.1:5000/items';

// Função para logar os detalhes da requisição e resposta
function logDetails(action, method, url, requestBody = null, response = null) {
    console.log('--- Detalhes da Ação ---');
    console.log(`Ação: ${action}`);
    console.log(`Método HTTP: ${method}`);
    console.log(`URL: ${url}`);
    if (requestBody) {
        console.log(`Corpo da Requisição: ${JSON.stringify(requestBody)}`);
    }
    if (response) {
        console.log(`Resposta: ${JSON.stringify(response)}`);
    }
    console.log('-------------------------');
}

function loadItems() {
    console.log('--- Carregando Itens ---');
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar itens: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            logDetails('Carregar Itens', 'GET', apiUrl, null, data); // Log para carregamento de itens

            const itemList = document.getElementById('item-list');
            itemList.innerHTML = '';
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.id}: ${item.name}`;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Deletar';
                deleteButton.onclick = () => deleteItem(item.id);

                li.appendChild(deleteButton);
                itemList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar itens:', error);
        });
}

function updateStatusMessage(message, isError = false) {
    const statusMessage = document.getElementById('status-message');
    statusMessage.textContent = message;
    statusMessage.style.color = isError ? 'red' : 'green';
}


function addItem() {
    const itemName = document.getElementById('new-item-name').value;

    if (!itemName) {
        alert('O nome do item não pode estar vazio');
        return;
    }

    const newItem = { name: itemName };
    console.log('--- Adicionando Item ---');

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao adicionar item: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        logDetails('Adicionar Item', 'POST', apiUrl, newItem, data); // Log para adicionar item

        updateStatusMessage('Item adicionado com sucesso!');
        loadItems(); // Atualiza a lista de itens após adicionar
    })
    .catch(error => {
        console.error('Erro ao adicionar item:', error);
        updateStatusMessage('Erro ao adicionar item!', true); // Exibe o erro para o usuário
    });
}

function deleteItem(itemId) {
    console.log(`--- Deletando Item ID: ${itemId} ---`);

    fetch(`${apiUrl}/${itemId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao deletar item: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        logDetails('Deletar Item', 'DELETE', `${apiUrl}/${itemId}`, null, data); // Log para deletar item

        updateStatusMessage('Item deletado com sucesso!');
        loadItems(); // Atualiza a lista de itens após deletar
    })
    .catch(error => {
        console.error('Erro ao deletar item:', error);
        updateStatusMessage('Erro ao deletar item!', true); // Exibe o erro para o usuário
    });
}


// Carregar os itens assim que a página for carregada
window.onload = loadItems;
