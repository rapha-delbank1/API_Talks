const apiUrl = 'http://127.0.0.1:5000/items';

// Função para carregar itens via GET
function loadItems() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar itens: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const itemList = document.getElementById('item-list');
            itemList.innerHTML = ''; // Limpa a lista
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.id}: ${item.name} `;
                
                // Botão de deletar
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Deletar';
                deleteButton.onclick = () => deleteItem(item.id);

                li.appendChild(deleteButton); // Adiciona o botão ao lado do item
                itemList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar itens:', error);
        });
}

// Função para adicionar item via POST
function addItem() {
    const itemName = document.getElementById('new-item-name').value;

    if (!itemName) {
        alert('O nome do item não pode estar vazio');
        return;
    }

    const newItem = { name: itemName };

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
        console.log('Item adicionado:', data);
        loadItems(); // Recarregar os itens após adicionar
    })
    .catch(error => {
        console.error('Erro ao adicionar item:', error);
    });
}

// Função para deletar item via DELETE
function deleteItem(itemId) {
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
        console.log('Item deletado:', data);
        loadItems(); // Recarregar os itens após deletar
    })
    .catch(error => {
        console.error('Erro ao deletar item:', error);
    });
}

// Carregar os itens ao carregar a página
window.onload = loadItems;
