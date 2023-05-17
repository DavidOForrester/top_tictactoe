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

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const div = document.createElement("div");
        div.innerText = board[i][j];
        div.className = "square";
        div.addEventListener("click", () => {
          if ((board[i][j].length == 0)) {
            board[i][j] = "Z";
          }

          console.log(board);
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
  return {name, symbol}
}

// module
const PlayRound = (() => {
  board = Gameboard.board;

  board[0][0] = "X";
  board[1][2] = "O";
  board[2][1] = "X";

  console.log(board);
  Gameboard.display();
})();

// Global Code
const player1 = Player("David", "X")
const player2 = Player("Bot", "O")

console.log(player1.name)

PlayRound();
