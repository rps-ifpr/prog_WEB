// =============== CONCEITOS BÁSICOS DO DOM ===============
// O DOM (Document Object Model) é uma interface de programação que representa documentos HTML e XML
// como uma estrutura de árvore, onde cada nó é um objeto representando uma parte do documento.
// Isso permite que o JavaScript acesse e modifique dinamicamente o conteúdo, estrutura e estilo da página.

// =============== CONTADOR DE VISITAS ===============
// Esta função utiliza o localStorage para manter um contador persistente de visitas
function updateVisitCount() {
    // localStorage é uma API do navegador que permite armazenar dados no formato chave-valor
    // Os dados persistem mesmo após fechar o navegador
    let count = localStorage.getItem('visitCount') || 0; // Obtém o valor atual ou 0 se não existir
    count = parseInt(count) + 1; // Converte para número e incrementa
    localStorage.setItem('visitCount', count); // Salva o novo valor

    // Atualiza o elemento HTML que mostra o contador
    // getElementById é um método do DOM para buscar elementos pelo atributo id
    const visitElement = document.getElementById('visitCount');
    if (visitElement) {
        visitElement.textContent = count;
    }
}

// =============== VALIDAÇÃO DE FORMULÁRIO ===============
// Esta função é chamada quando o formulário é enviado
// Demonstra validação de dados e manipulação de eventos
function validateForm(event) {
    // event.target se refere ao elemento que disparou o evento (o formulário)
    const form = event.target;
    
    // querySelector é um método moderno para selecionar elementos usando seletores CSS
    const nome = form.querySelector('#nome');
    const email = form.querySelector('#email');
    const mensagem = form.querySelector('#mensagem');
    let isValid = true;

    // Limpa mensagens de erro anteriores
    // querySelectorAll retorna uma NodeList com todos os elementos que correspondem ao seletor
    document.querySelectorAll('.error-message').forEach(el => el.remove());

    // Validação do campo nome
    if (nome.value.length < 3) {
        showError(nome, 'O nome deve ter pelo menos 3 caracteres');
        isValid = false;
    }

    // Validação do email usando expressão regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showError(email, 'Digite um email válido');
        isValid = false;
    }

    // Validação da mensagem
    if (mensagem.value.length < 10) {
        showError(mensagem, 'A mensagem deve ter pelo menos 10 caracteres');
        isValid = false;
    }

    // Previne o envio do formulário se houver erros
    if (!isValid) {
        event.preventDefault();
    } else {
        // Simulação de envio bem-sucedido
        event.preventDefault();
        showSuccess();
    }
}

// Função auxiliar para mostrar mensagens de erro
// Demonstra criação e manipulação de elementos DOM
function showError(element, message) {
    // createElement cria um novo elemento HTML
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Adiciona a mensagem de erro após o elemento
    element.parentNode.appendChild(errorDiv);
    // Adiciona classe de erro ao elemento
    element.classList.add('error');
}

// Função para mostrar mensagem de sucesso
function showSuccess() {
    const form = document.querySelector('.formulario');
    // innerHTML permite definir o conteúdo HTML de um elemento
    form.innerHTML = '<div class="success-message">Mensagem enviada com sucesso!</div>';
}

// =============== EFEITOS NOS CARDS ===============
// Esta função configura efeitos de hover nos cards
// Demonstra manipulação de eventos do mouse e estilos CSS via JavaScript
function setupCardEffects() {
    // Seleciona todos os cards da página
    const cards = document.querySelectorAll('.card');
    
    // Adiciona listeners de eventos para cada card
    cards.forEach(card => {
        // mouseenter: quando o mouse entra no elemento
        card.addEventListener('mouseenter', () => {
            // Modifica estilos CSS diretamente via JavaScript
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });

        // mouseleave: quando o mouse sai do elemento
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        });
    });
}

// =============== MODO ESCURO ===============
// Esta função implementa a funcionalidade de alternar entre modo claro e escuro
// Demonstra manipulação de classes CSS e persistência de dados
function setupDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        // Recupera a preferência salva do usuário
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        // Aplica o modo escuro se necessário
        document.body.classList.toggle('dark-mode', isDarkMode);
        darkModeToggle.checked = isDarkMode;

        // Escuta mudanças no checkbox
        darkModeToggle.addEventListener('change', () => {
            // Toggle da classe dark-mode
            document.body.classList.toggle('dark-mode');
            // Salva a preferência do usuário
            localStorage.setItem('darkMode', darkModeToggle.checked);
        });
    }
}

// =============== INICIALIZAÇÃO ===============
// Este evento é disparado quando o DOM está completamente carregado
// Garante que todos os elementos estão disponíveis para manipulação
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa todas as funcionalidades
    updateVisitCount();
    setupCardEffects();
    setupDarkMode();

    // Configura o formulário se ele existir na página
    const contactForm = document.querySelector('.formulario');
    if (contactForm) {
        contactForm.addEventListener('submit', validateForm);
    }
});