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
  let rounds = 0;

  const round = () => {
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", () => {
      const divWithSquareClass = document.querySelectorAll(".square");
      if (divWithSquareClass.length == 0) {
        gameboard.display();
      }
    });
  };

  const checkWinner = (prevSymbol) => {
    rounds = rounds + 1;
    console.log(rounds)
    for (var i = 0; i < board.length; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][0] !== ""
      ) {
        play.gameover(prevSymbol, false);
      }
    }

    for (var j = 0; j < board[0].length; j++) {
      if (
        board[0][j] === board[1][j] &&
        board[1][j] === board[2][j] &&
        board[0][j] !== ""
      ) {
        play.gameover(prevSymbol, false);
      }
    }

    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== ""
    ) {
      play.gameover(prevSymbol, false);
    }

    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== ""
    ) {
      play.gameover(prevSymbol, false);
    }

    // TODO: need to check the game was not won on the last move
    if (rounds == 9) {
      play.gameover(prevSymbol, true);
    }

    return null;
  };

  const gameover = (prevSymbol, draw) => {
    // TODO: disable the event listners for the squares

    if (draw == false) {
      gameResultText = "Winner is " + prevSymbol;
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
    const squares = document.querySelectorAll(".square");
    for (const square of squares) {
      square.remove();
    }

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

  return { round, gameover, checkWinner };
})();

const player = (name, symbol) => {
  return { name, symbol };
};

// Global Code
const player1 = player("David", "X");
const player2 = player("Bot", "O");

play.round();
