const apiUrl = 'http://127.0.0.1:5000/items';

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
            itemList.innerHTML = '';
            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.id}: ${item.name} `;
                
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
        loadItems();
    })
    .catch(error => {
        console.error('Erro ao adicionar item:', error);
    });
}

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
        loadItems(); 
    })
    .catch(error => {
        console.error('Erro ao deletar item:', error);
    });
}

window.onload = loadItems;
