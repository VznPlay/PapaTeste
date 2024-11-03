// Carrega números e contadores salvos do localStorage ao iniciar
let savedNumbers = JSON.parse(localStorage.getItem('savedNumbers')) || [];
let searchCounts = JSON.parse(localStorage.getItem('searchCounts')) || {}; // Contador de pesquisas
let addCounts = JSON.parse(localStorage.getItem('addCounts')) || {}; // Contador de adições
let hasSearched = false; // Controla se o usuário já apertou o botão de busca
let hasAdded = false; // Controla se o usuário já apertou o botão de adição de PAPA

// Verifica a entrada e impede caracteres inválidos
document.getElementById('phone-input').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Permite apenas números
});

// Evento de busca
document.getElementById('search-button').addEventListener('click', () => {
    if (hasSearched) {
        alert('Você já procurou um número. A página será reiniciada.');
        location.reload(); // Atualiza a página
        return;
    }

    const phoneInput = document.getElementById('phone-input').value.trim();
    const resultMessage = document.getElementById('result-message');
    const addSection = document.getElementById('add-section');

    // Verifica se o número é válido (11 dígitos)
    if (phoneInput.length !== 11) {
        resultMessage.textContent = 'Número inválido! Deve ter exatamente 11 dígitos.';
        resultMessage.style.color = 'red';
        addSection.style.display = 'none';
        return;
    }

    // Incrementa o contador de buscas
    if (searchCounts[phoneInput]) {
        searchCounts[phoneInput]++;
    } else {
        searchCounts[phoneInput] = 1;
    }
    localStorage.setItem('searchCounts', JSON.stringify(searchCounts)); // Salva no localStorage

    // Marca que a busca foi feita
    hasSearched = true;

    // Verifica se o número já está salvo
    if (savedNumbers.includes(phoneInput)) {
        resultMessage.innerHTML = `
            PAPA TESTE ENCONTRADO 😡🤬<br>
            Número procurado ${searchCounts[phoneInput]} vezes<br>
            ${addCounts[phoneInput] || 0} pessoa(s) adicionou este número como PAPA
        `;
        resultMessage.style.color = 'white' ; 
        addSection.style.display = 'block';
        addSection.innerHTML = `
            <p>Deseja adicionar como "PAPA" novamente?</p>
            <button id="add-count-button">Adicionar como PAPA</button>
        `;
        document.getElementById('add-count-button').addEventListener('click', () => {
            if (hasAdded) {
                alert('Você já adicionou este número como PAPA. A página será reiniciada.');
                location.reload(); // Atualiza a página
                return;
            }

            // Incrementa o contador de adições
            if (addCounts[phoneInput]) {
                addCounts[phoneInput]++;
            } else {
                addCounts[phoneInput] = 1;
            }
            localStorage.setItem('addCounts', JSON.stringify(addCounts)); // Salva no localStorage

            hasAdded = true;
            alert('Número adicionado como PAPA com sucesso!');
            addSection.style.display = 'none';
        });
    
    } else {
        resultMessage.textContent = 'Não é papa teste 🤑';
        resultMessage.style.color = 'yellow';
        addSection.style.display = 'block';
        addSection.innerHTML = `
            <p>Adicionar o número acima como "papa teste"?</p>
            <button id="add-new-button">Adicionar Número</button>
        `;
        document.getElementById('add-new-button').addEventListener('click', () => {
            savedNumbers.push(phoneInput);
            localStorage.setItem('savedNumbers', JSON.stringify(savedNumbers)); // Salva no localStorage
            alert('Número adicionado como papa teste!');
            resultMessage.textContent = '';
            addSection.style.display = 'none';
        });
    }
});

// Atualiza o resultado para seguir as novas configurações de estilo
document.getElementById('result-message').style.color = 'black';
document.getElementById('result-message').style.fontSize = '18px';
document.getElementById('result-message').style.lineHeight = '1.5'; // Espaçamento entre as linhas
