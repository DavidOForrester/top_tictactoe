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
      gameboard.display();
    });
  };

  const checkWinner = (prevSymbol) => {
    for (var i = 0; i < board.length; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][0] !== ""
      ) {
        play.winner(prevSymbol);
      }
    }

    for (var j = 0; j < board[0].length; j++) {
      if (
        board[0][j] === board[1][j] &&
        board[1][j] === board[2][j] &&
        board[0][j] !== ""
      ) {
        play.winner(prevSymbol);
      }
    }

    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== ""
    ) {
      play.winner(prevSymbol);
    }

    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== ""
    ) {
      play.winner(prevSymbol);
    }

    return null;
  };

  const winner = (prevSymbol) => {
    winnerText = "Winner is " + prevSymbol;

    const div = document.createElement("div");
    div.innerText = winnerText;

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
    
  };

  const resetGame = () => {
    location.reload();
  };

  return { round, winner, checkWinner };
})();

const player = (name, symbol) => {
  return { name, symbol };
};

// Global Code
const player1 = player("David", "X");
const player2 = player("Bot", "O");

play.round();
