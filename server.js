const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let currentQuestion = {
  question: 'Qual é a cor do céu?',
  answer: ''
};

io.on('connection', (socket) => {
  console.log('New user connected');
  
  // Send the current question to the new user
  socket.emit('currentQuestion', currentQuestion);

  // Listen for answer submissions
  socket.on('submitAnswer', (answer) => {
    currentQuestion.answer = answer;
    io.emit('answerReceived', currentQuestion);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
