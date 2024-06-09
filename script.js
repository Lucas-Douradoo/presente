const questions = [
    "Qual cor preferida do seu namorado?",
    "Faz quantos meses que a gente namora?",
    "Qual o mês do nosso aniversário de namoro?"
];

const correctAnswers = [
    "verde",
    "60",
    "maio"
];

let currentQuestionIndex = 0;

function checkAnswer() {
    const userAnswer = document.getElementById('answer').value.trim().toLowerCase();
    if (userAnswer === correctAnswers[currentQuestionIndex]) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            document.getElementById('question').textContent = questions[currentQuestionIndex];
            document.getElementById('answer').value = '';
        } else {
            window.location.href = 'final.html';
        }
    } else {
        alert("Resposta incorreta! Tente novamente.");
    }
}

const socket = io();

socket.on('currentQuestion', (data) => {
  document.getElementById('question').textContent = data.question;
});

socket.on('answerReceived', (data) => {
  document.getElementById('result').textContent = 'Resposta recebida: ' + data.answer;
  document.getElementById('result-container').style.display = 'block';
});

function submitAnswer() {
  const answer = document.getElementById('answer').value;
  socket.emit('submitAnswer', answer);
  document.getElementById('answer').value = '';
}

