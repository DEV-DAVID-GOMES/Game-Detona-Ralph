const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 500,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
  },
  actions: {
    timerId: setInterval(randomSquare, 500),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

 
  if (state.values.curretTime % 10 === 0) { 
    if (state.values.gameVelocity > 200) { 
      state.values.gameVelocity -= 50; // aumenta a velocidade
      clearInterval(state.actions.timerId); 
      state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    }
  }

  
  if (state.values.curretTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Game Over! O seu resultado foi: " + state.values.result);
  }
}


function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.1;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      }
    });
  });
}

function initialize() {
  addListenerHitBox();
}

initialize();