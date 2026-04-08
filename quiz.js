const questions = [
    { q: "Quem é considerado o 'pai' da World Wide Web?", options: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs", "Mark Zuckerberg"], correct: 1 },
    { q: "Em que década a ARPANET (precursora da Internet) foi criada?", options: ["1950", "1960", "1980", "1990"], correct: 1 },
    { q: "Qual tag HTML é usada para criar um link?", options: ["<link>", "<a>", "<href>", "<url>"], correct: 1 },
    { q: "Qual tag define o título principal de um documento?", options: ["<head>", "<h1>", "<title>", "<header>"], correct: 1 },
    { q: "Para que serve a tag <ul>?", options: ["Lista ordenada", "Lista não ordenada", "Um item de lista", "Sublinhado"], correct: 1 },
    { q: "Qual o protocolo básico de transferência da web?", options: ["FTP", "SMTP", "HTTP", "TCP/IP"], correct: 2 },
    { q: "Qual tag é usada para inserir uma imagem?", options: ["<picture>", "<src>", "<img>", "<figure>"], correct: 2 },
    { q: "Onde fica o metadado do HTML?", options: ["<body>", "<meta>", "<footer>", "<head>"], correct: 3 },
    { q: "Qual tag cria uma quebra de linha?", options: ["<lb>", "<break>", "<br>", "<hr>"], correct: 2 },
    { q: "A tag <p> define o quê?", options: ["Página", "Parágrafo", "Painel", "Ponto"], correct: 1 },
    { q: "Qual atributo define o endereço de uma imagem?", options: ["alt", "href", "src", "link"], correct: 2 },
    { q: "Qual tag define a estrutura de rodapé?", options: ["<bottom>", "<end>", "<footer>", "<section>"], correct: 2 },
    { q: "O que significa HTML?", options: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language", "Hyper Text Making Line"], correct: 1 },
    { q: "Qual tag HTML5 é usada para vídeos?", options: ["<media>", "<movie>", "<video>", "<source>"], correct: 2 },
    { q: "Em qual ano a Internet se tornou comercial no Brasil?", options: ["1985", "1995", "2000", "1990"], correct: 1 },
    { q: "Qual tag é usada para tabelas?", options: ["<tab>", "<table>", "<grid>", "<list>"], correct: 1 },
    { q: "Qual tag define um campo de entrada de dados?", options: ["<form>", "<input>", "<select>", "<text>"], correct: 1 },
    { q: "O que faz a tag <strong >?", options: ["Texto em itálico", "Texto em negrito/importância", "Texto maior", "Texto colorido"], correct: 1 },
    { q: "Qual a versão atual estável do HTML?", options: ["HTML 4", "HTML 6", "HTML 5", "XHTML"], correct: 2 },
    { q: "O que significa DNS?", options: ["Digital Network System", "Data Name Server", "Domain Name System", "Distributed Node System"], correct: 2 }
];

let currentQuestion = 0;
let score = 0;
let userData = { name: "", date: "" };

function startQuiz() {
    const nameInput = document.getElementById('userName').value;
    if (!nameInput) return alert("Por favor, digite seu nome.");

    userData.name = nameInput;
    userData.date = new Date().toLocaleString('pt-BR');
    
    document.getElementById('setup-container').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question-text').innerText = `${currentQuestion + 1}. ${question.q}`;
    const optionsDiv = document.getElementById('options-container');
    optionsDiv.innerHTML = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('next-btn').classList.add('hidden');

    question.options.forEach((opt, index) => {
        const btn = document.createElement('div');
        btn.className = 'option';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index, btn);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected, element) {
    const question = questions[currentQuestion];
    const options = document.querySelectorAll('.option');
    
    // Desabilitar cliques após a resposta
    options.forEach(opt => opt.style.pointerEvents = 'none');

    if (selected === question.correct) {
        element.classList.add('correct');
        score++;
        document.getElementById('feedback').innerText = "Correto! Parabéns.";
    } else {
        element.classList.add('wrong');
        options[question.correct].classList.add('correct');
        document.getElementById('feedback').innerText = `Errado. A resposta correta era: ${question.options[question.correct]}`;
    }

    document.getElementById('next-btn').classList.remove('hidden');
}

function loadNextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-container').classList.add('hidden');
    const resultDiv = document.getElementById('result-container');
    resultDiv.classList.remove('hidden');
    
    document.getElementById('final-stats').innerHTML = `
        <strong>Usuário:</strong> ${userData.name}<br>
        <strong>Data/Hora:</strong> ${userData.date}<br>
        <strong>Acertos:</strong> ${score} de ${questions.length}
    `;
    
    console.log("Registro Final:", userData, "Score:", score);
}