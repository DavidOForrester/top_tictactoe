// module
const Gameboard = (() => {
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

// factory
const Player = (name, symbol) => {
  return { name, symbol };
};

// module
const PlayRound = (() => {
  board = Gameboard.board;
  Gameboard.display();
})();

// Global Code
const player1 = Player("David", "X");
const player2 = Player("Bot", "O");

PlayRound();
