const questions = [
    {
      question: "Quanto é 7 + 8?",
      options: ["13", "15", "16", "14"],
      answer: [1]
    },
    {
      question: "“YOU SHALL NOT PASS!” — Com essa frase, Gandalf enfrentou qual criatura?",
      options: ["Balrog", "Nazgûl", "Dragão", "Uruk-hai"],
      answer: [0]
    },
    {
      question: "Qual o nome do hobbit que encontra o Um Anel em 'O Hobbit'?",
      options: ["Frodo", "Bilbo", "Merry", "Pippin"],
      answer: [1]
    },
    {
      question: "Como se chama a região onde fica a vila dos hobbits?",
      options: ["Mordor", "Rohan", "Valfenda", "Condado"],
      answer: [3]
    },
    {
      question: "Qual desses personagens não é um hobbit?",
      options: ["Frodo", "Gimli", "Sam", "Merry"],
      answer: [1]
    },
    {
      question: "Qual desses hobbits é jardineiro e melhor amigo de Frodo?",
      options: ["Pippin", "Bilbo", "Sam", "Gollum"],
      answer: [2]
    },
    {
      question: "Qual o nome da princesa no universo de Zelda?",
      options: ["Zelda", "Peach", "Samus", "Midna"],
      answer: [0]
    },
    {
      question: "Qual desses é um dos chefões mais temidos de Elden Ring?",
      options: ["Malenia, Lâmina de Miquella", "Margit, o Impiedoso", "Radagon, o Bibliotecário", "Blaidd, o Caçador"],
      answer: [0]
    },
    {
      question: "Se você fosse um herói de videogame, e sua missão fosse cuidar de um bebê, qual superpoder você escolheria?",
      options: [
        "Trocar fraldas em 5 segundos",
        "Mamadeiras teleguiadas",
        "Fazer o bebê dormir com um olhar",
        "Multitarefa com estilo"
      ],
      answer: [0, 1, 2, 3]
    },
    {
      question: "Está pronto para ver a sua recompensa?",
      options: [
        "Sim!",
        "Aceito antes mesmo de saber a recompensa.",
        "Já estou emocionado",
        "Talvez"
      ],
      answer: [0, 1, 2, 3]
    }
  ];
  
  let currentQuestion = 0;
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  let isMusicPlaying = false;
  let lives = 3;
  let playerName = '';
  
  // Inicialização quando a página carregar
  document.addEventListener('DOMContentLoaded', () => {
    // Garante que apenas a tela inicial esteja visível
    document.getElementById("welcome-screen").classList.remove("hidden");
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("final-screen").classList.add("hidden");
    document.getElementById("options-screen").classList.add("hidden");
    document.getElementById("game-over-screen").classList.add("hidden");
    document.getElementById("accepted-screen").classList.add("hidden");
    document.getElementById("refused-screen").classList.add("hidden");

    // Adiciona os event listeners aos botões
    document.getElementById('btn-play').addEventListener('click', startMission);
    document.getElementById('btn-options').addEventListener('click', showOptions);
    document.getElementById('btn-back').addEventListener('click', hideOptions);
    document.getElementById('btn-exit').addEventListener('click', () => showGameOver('recusou'));
    
    // Adiciona o event listener para o botão de música
    musicToggle.addEventListener('click', toggleMusic);

    // Configura o controle de volume
    const volumeSlider = document.getElementById('volume-slider');
    const volumeValue = document.querySelector('.volume-value');
    
    // Define o volume inicial
    bgMusic.volume = 0.5;
    volumeSlider.value = 50;
    volumeValue.textContent = "50%";
    
    volumeSlider.addEventListener('input', (e) => {
      const volume = e.target.value;
      bgMusic.volume = volume / 100;
      volumeValue.textContent = `${volume}%`;
    });

    const btnAccept = document.getElementById('btn-accept');
    const btnRefuse = document.getElementById('btn-refuse');
    if (btnAccept && btnRefuse) {
      btnAccept.addEventListener('click', () => {
        document.getElementById('final-screen').classList.add('hidden');
        document.getElementById('accepted-screen').classList.remove('hidden');
      });
      btnRefuse.addEventListener('click', () => {
        document.getElementById('final-screen').classList.add('hidden');
        document.getElementById('refused-screen').classList.remove('hidden');
      });
    }

    // Add event listeners for the refused screen buttons
    const refusedAcceptBtn = document.querySelector('#refused-screen #btn-accept');
    const refusedRefuseBtn = document.querySelector('#refused-screen #btn-refuse');
    
    if (refusedAcceptBtn && refusedRefuseBtn) {
      refusedAcceptBtn.addEventListener('click', () => {
        document.getElementById('refused-screen').classList.add('hidden');
        document.getElementById('final-screen').classList.remove('hidden');
      });
      refusedRefuseBtn.addEventListener('click', () => {
        document.getElementById('refused-screen').classList.add('hidden');
        document.getElementById('game-over-screen').classList.remove('hidden');
      });
    }

    const nameInput = document.getElementById('player-name');
    const startJourneyBtn = document.getElementById('btn-start-journey');

    // Focus the input when the page loads
    nameInput.focus();

    // Handle Enter key press
    nameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && nameInput.value.trim()) {
        startJourney();
      }
    });

    // Handle button click
    startJourneyBtn.addEventListener('click', () => {
      if (nameInput.value.trim()) {
        startJourney();
      }
    });

    function startJourney() {
      playerName = nameInput.value.trim();
      document.getElementById('welcome-screen').classList.add('hidden');
      document.getElementById('start-screen').classList.remove('hidden');
      
      // Show avatar and update name
      const avatarTop = document.querySelector('.avatar-lives-top');
      const hobbitNome = document.querySelector('.hobbit-nome');
      avatarTop.classList.remove('hidden');
      hobbitNome.textContent = `${playerName} Bolseiro`;
      
      // Update the title with the player's name
      const title = document.querySelector('#start-screen h1');
      title.textContent = `🧙‍♂️ Uma Jornada para ${playerName}, o Hobbit 🧙‍♂️`;
    }
  });
  
  function toggleMusic() {
    if (isMusicPlaying) {
      bgMusic.pause();
      musicToggle.textContent = '🎵 Tocar Música';
      musicToggle.classList.remove('playing');
      isMusicPlaying = false;
    } else {
      // Tenta tocar a música e lida com possíveis erros
      const playPromise = bgMusic.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Música começou a tocar com sucesso
            musicToggle.textContent = '🎵 Pausar Música';
            musicToggle.classList.add('playing');
            isMusicPlaying = true;
          })
          .catch(error => {
            console.error("Erro ao tocar música:", error);
            alert("Não foi possível tocar a música. Verifique se o arquivo de áudio existe e se seu navegador permite reprodução de áudio.");
            isMusicPlaying = false;
          });
      }
    }
  }
  
  function startMission() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    showQuestion();
  }
  
  function showMessage(message, type = 'error') {
    const messageContainer = document.getElementById('message-container');
    messageContainer.innerHTML = `<p>${message}</p>`;
    messageContainer.className = `message-container ${type} shake`;
    messageContainer.classList.remove('hidden');
    
    setTimeout(() => {
      messageContainer.classList.add('hidden');
    }, 1000);
  }

  function updateLives() {
    const livesElement = document.querySelector('.lives');
    livesElement.innerHTML = '🧝‍♂️'.repeat(lives);
  }

  function loseLife() {
    lives--;
    updateLives();
    if (lives <= 0) {
      showGameOver('falhou');
    }
  }
  
  function showQuestion() {
    const q = questions[currentQuestion];
    const container = document.getElementById("question-container");
    container.innerHTML = `<h2>${q.question}</h2>`;
    const colorClasses = ["green", "yellow", "pink", "purple", "orange", "blue"];
    q.options.forEach((opt, index) => {
      const btn = document.createElement("button");
      btn.innerText = opt;
      btn.className = `pixel-btn ${colorClasses[index % colorClasses.length]}`;
      btn.onclick = () => {
        if (q.answer.includes(index)) {
          showMessage("Resposta correta! 🎉", "success");
          setTimeout(() => {
            nextQuestion();
          }, 1000);
        } else {
          loseLife();
          showMessage("Ops! Resposta errada! ❌");
          setTimeout(() => {
            if (lives > 0) {
              nextQuestion();
            }
          }, 1000);
        }
      };
      container.appendChild(btn);
    });
  }
  
  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      document.getElementById("quiz-screen").classList.add("hidden");
      document.getElementById("final-screen").classList.remove("hidden");
    }
  }
  
  function showOptions() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("options-screen").classList.remove("hidden");
  }

  function hideOptions() {
    document.getElementById("options-screen").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
  }

  function showGameOver(reason = 'recusou') {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("game-over-screen").classList.remove("hidden");
    const mainMsg = document.querySelector('.gameover-main');
    const subMsg = document.querySelector('.gameover-sub');
    if (reason === 'falhou') {
      mainMsg.textContent = `💔 ${playerName} falhou em uma missão super importante!`;
      subMsg.textContent = 'O Condado sentirá sua falta... 🍃';
    } else {
      mainMsg.textContent = `💔 ${playerName} recusou a missão e a Sociedade perdeu um membro!`;
      subMsg.textContent = 'O Condado sentirá sua falta... 🍃';
    }
  }
  
  function resetQuiz() {
    // Resetar variáveis
    currentQuestion = 0;
    lives = 3;
    updateLives();

    // Voltar para tela inicial
    document.getElementById("start-screen").classList.remove("hidden");
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("final-screen").classList.add("hidden");
    document.getElementById("options-screen").classList.add("hidden");
    document.getElementById("game-over-screen").classList.add("hidden");
    document.getElementById("accepted-screen").classList.add("hidden");
    document.getElementById("refused-screen").classList.add("hidden");

    // Limpar perguntas e mensagens
    const container = document.getElementById("question-container");
    if (container) container.innerHTML = "";
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) messageContainer.classList.add('hidden');
  }
  window.resetQuiz = resetQuiz;
  