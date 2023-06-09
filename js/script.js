const gameboard = (() => {
  board = [];
  for (let i = 0; i < 3; i++) {
    this.board.push([]);
    for (let j = 0; j < 3; j++) {
      this.board[i].push("");
    }
  }

  const display = () => {
    const divs = [];
    let prevSymbol = "X";

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const div = document.createElement("div");
        div.innerText = board[i][j];
        div.className = "square";
        div.addEventListener("click", () => {
          if (board[i][j].length == 0) {
            if (prevSymbol == "X") {
              prevSymbol = "O";
            } else if (prevSymbol == "O") {
              prevSymbol = "X";
            }
            board[i][j] = prevSymbol;
            div.innerText = prevSymbol;
            play.checkWinner(prevSymbol);
          }
        });
        divs.push(div);
      }
    }

    const container = document.querySelector(".gameboard");

    for (let div of divs) {
      container.appendChild(div);
    }
  };

  return { board, display };
})();

const play = (() => {
  const round = () => {
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", () => {
      const divWithSquareClass = document.querySelectorAll(".square");
      if (divWithSquareClass.length == 0) {
        const player1Input = document.getElementById("player-one");
        const nameOne = player1Input.value;

        const player2Input = document.getElementById("player-two");
        const nameTwo = player2Input.value;

        player1 = player(nameOne, "O");
        player2 = player(nameTwo, "X");

        gameboard.display();
      }
    });
  };

  const checkWinner = (prevSymbol) => {
    turns = turns + 1;
    winnerFound = "No";
    for (var i = 0; i < board.length; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][0] !== ""
      ) {
        winnerFound = "Yes";
      }
    }

    for (var j = 0; j < board[0].length; j++) {
      if (
        board[0][j] === board[1][j] &&
        board[1][j] === board[2][j] &&
        board[0][j] !== ""
      ) {
        winnerFound = "Yes";
      }
    }

    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== ""
    ) {
      winnerFound = "Yes";
    }

    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== ""
    ) {
      winnerFound = "Yes";
    }

    if ((turns == 9) & (winnerFound == "No")) {
      play.gameover(prevSymbol, true);
    } else if (winnerFound == "Yes") {
      play.gameover(prevSymbol, false);
    }

    return null;
  };

  const gameover = (prevSymbol, draw) => {
    const squares = document.querySelectorAll(".square");
    for (const square of squares) {
      square.remove();
    }

    if (draw == false) {
      if (prevSymbol == player1.symbol) {
        gameResultText = "Winner is " + player1.name;
      } else {
        gameResultText = "Winner is " + player2.name;
      }
    } else {
      gameResultText = "It's a Draw ";
    }

    const div = document.createElement("div");
    div.innerText = gameResultText;

    const newGameButton = document.createElement("button");
    newGameButton.id = "new-game-button";
    newGameButton.innerText = "New Game";
    newGameButton.addEventListener("click", () => {
      newGame();
    });

    const resetGameButton = document.createElement("button");
    resetGameButton.id = "reset-game-button";
    resetGameButton.innerText = "Reset Game";
    resetGameButton.addEventListener("click", () => {
      resetGame();
    });

    const container = document.querySelector(".information");
    container.appendChild(div);
    container.appendChild(newGameButton);
    container.appendChild(resetGameButton);
  };

  const newGame = () => {
    turns = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j] = "";
      }
    }

    gameboard.display();

    const informationDiv = document.querySelector(".information");
    while (informationDiv.firstChild) {
      informationDiv.removeChild(informationDiv.firstChild);
    }
  };

  const resetGame = () => {
    location.reload();
  };

  return { round, gameover, checkWinner, gameover, newGame, resetGame };
})();

const player = (name, symbol) => {
  return { name, symbol };
};

// Global Code
let turns = 0;
play.round();
