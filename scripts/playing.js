var genratePlays = () => {
  // console.log(ActiveCol);
  // console.log(Letters[ActiveLetter]);
  let randomCol = Math.floor(Math.random() * 6);
  let randomLetter = Math.floor(Math.random() * 2);

  if (Cells[1][ActiveCol].innerText != "") {
    randomCol = ActiveCol;
    randomLetter = ActiveLetter;
  } else if (Cells[2][ActiveCol].innerText != "") {
    randomCol = ActiveCol;
    randomLetter = 1 - ActiveLetter;
  } else if (ActiveCol == 0) {
    randomCol = ActiveCol + 1;
    randomLetter = ActiveLetter;
  } else if (ActiveCol == 5) {
    randomCol = ActiveCol - 1;
    randomLetter = ActiveLetter;
  } else if (ActiveCol == 2) {
    randomCol = ActiveCol + 2;
    randomLetter = ActiveLetter;
  } else if (ActiveCol == 3) {
    randomCol = ActiveCol - 2;
    randomLetter = ActiveLetter;
  }

  return { randomCol: randomCol, randomLetter: randomLetter };
};

var computerPlaying = (Player) => {
  if (!GameOver) {
    console.log("Computer");
    let plays = genratePlays();
    let randomCol = plays.randomCol;
    let randomLetter = plays.randomLetter;
    for (let i = 4; i > 0; i--) {
      let cell = Cells[i - 1][randomCol];
      if (cell.innerText == "") {
        console.log(
          "col " +
            randomCol +
            " ,player:" +
            Player.name +
            " played: " +
            randomLetter
        );

        if (!Player.playingSet.includes(randomLetter)) {
          randomLetter = 1 - randomLetter;
        }

        cell.innerText = Letters[randomLetter];
        cell.style.backgroundColor = Player.color;
        randomLetter == 0 ? Player.playingSet.pop() : Player.playingSet.shift();
        UpdatePlayerboard(Player);

        if (onWinning()) {
          WinnerDeclaration(ActivePlayer);
        } else {
          Player == Player1 ? (Player = Player2) : (Player = Player1);
          ActivePlayer = Player;
        }
        break;
      }

      if (i == 1 && cell.innerText != "") {
        i = 5;
        randomCol == 5 ? (randomCol = 0) : randomCol++;
      }
      //console.log("loop: " + i);
    }
  }
};

var Playing = (Col, Letter, Player, computer) => {
  for (let i = 4; i > 0; i--) {
    let cell = Cells[i - 1][Col];
    if (cell.innerText == "") {
      console.log(
        "col: " + Col + " ,player:" + Player.name + " played: " + Letter
      );
      cell.innerText = Letters[Letter];
      cell.style.backgroundColor = Player.color;
      Letter == 0 ? Player.playingSet.pop() : Player.playingSet.shift();
      UpdatePlayerboard(Player);

      if (onWinning()) {
        WinnerDeclaration(ActivePlayer);
      } else {
        ActivePlayer == Player1
          ? (ActivePlayer = Player2)
          : (ActivePlayer = Player1);
        if (!computer) {
          HeaderCells[Col].style.backgroundColor = ActivePlayer.color;
        }
      }
      break;
    }
  }
};

var onWinning = () => {
  //checking the rows
  for (let i = 3; i >= 0; i--) {
    if (Cells[i].filter((c) => c.innerText != "").length == 0) {
      break;
    }
    Player1.count = 0;
    Player2.count = 0;
    for (let j = 0; j < 6; j++) {
      if (Cells[i][j].innerText == "O") {
        Player1.count == 1 || Player1.count == 2
          ? Player1.count++
          : (Player1.count = 0);
        Player2.count == 1
          ? (Player2.count = 1)
          : Player2.count == 0 || Player2.count == 3
          ? Player2.count++
          : (Player2.count = 0);
      } else if (Cells[i][j].innerText == "T") {
        Player1.count == 1
          ? (Player1.count = 1)
          : Player1.count == 0 || Player1.count == 3
          ? Player1.count++
          : (Player1.count = 0);
        Player2.count == 1 || Player2.count == 2
          ? Player2.count++
          : (Player2.count = 0);
      } else {
        Player1.count = 0;
        Player2.count = 0;
      }
      if (Player1.count == 4 || Player2.count == 4) {
        WinningCells.push(
          Cells[i][j],
          Cells[i][j - 1],
          Cells[i][j - 2],
          Cells[i][j - 3]
        );
        Player1.count == 4
          ? (ActivePlayer = Player1)
          : (ActivePlayer = Player2);
        GameOver = true;
        return true;
      }
    }
  }
  //checking the columns
  let topRow = Cells[0].filter((c) => c.innerText != "");
  if (topRow.length != 0) {
    Player1.count = 0;
    Player2.count = 0;
    for (let cell of topRow) {
      let col = Cells[0].indexOf(cell);
      let checkingDia1 = false;
      let checkingDia2 = false;
      let checkingCol1 =
        Cells[0][col].innerText == Letters[Player1.seq[0]] &&
        Cells[1][col].innerText == Letters[Player1.seq[1]] &&
        Cells[2][col].innerText == Letters[Player1.seq[2]] &&
        Cells[3][col].innerText == Letters[Player1.seq[3]];
      let checkingCol2 =
        Cells[0][col].innerText == Letters[Player2.seq[0]] &&
        Cells[1][col].innerText == Letters[Player2.seq[1]] &&
        Cells[2][col].innerText == Letters[Player2.seq[2]] &&
        Cells[3][col].innerText == Letters[Player2.seq[3]];

      if (col < 3) {
        checkingDia1 =
          Cells[0][col].innerText == Letters[Player1.seq[0]] &&
          Cells[1][col + 1].innerText == Letters[Player1.seq[1]] &&
          Cells[2][col + 2].innerText == Letters[Player1.seq[2]] &&
          Cells[3][col + 3].innerText == Letters[Player1.seq[3]];
        checkingDia2 =
          Cells[0][col].innerText == Letters[Player2.seq[0]] &&
          Cells[1][col + 1].innerText == Letters[Player2.seq[1]] &&
          Cells[2][col + 2].innerText == Letters[Player2.seq[2]] &&
          Cells[3][col + 3].innerText == Letters[Player2.seq[3]];
      } else {
        checkingDia1 =
          Cells[0][col].innerText == Letters[Player1.seq[0]] &&
          Cells[1][col - 1].innerText == Letters[Player1.seq[1]] &&
          Cells[2][col - 2].innerText == Letters[Player1.seq[2]] &&
          Cells[3][col - 3].innerText == Letters[Player1.seq[3]];
        checkingDia2 =
          Cells[0][col].innerText == Letters[Player2.seq[0]] &&
          Cells[1][col - 1].innerText == Letters[Player2.seq[1]] &&
          Cells[2][col - 2].innerText == Letters[Player2.seq[2]] &&
          Cells[3][col - 3].innerText == Letters[Player2.seq[3]];
      }
      if (checkingCol1 || checkingCol2) {
        WinningCells.push(
          Cells[0][col],
          Cells[1][col],
          Cells[2][col],
          Cells[3][col]
        );
        checkingCol1 ? (ActivePlayer = Player1) : (ActivePlayer = Player2);
        GameOver = true;
        return true;
      } else if (checkingDia1 || checkingDia2) {
        col < 3
          ? WinningCells.push(
              Cells[0][col],
              Cells[1][col + 1],
              Cells[2][col + 2],
              Cells[3][col + 3]
            )
          : WinningCells.push(
              Cells[0][col],
              Cells[1][col - 1],
              Cells[2][col - 2],
              Cells[3][col - 3]
            );

        checkingDia1 ? (ActivePlayer = Player1) : (ActivePlayer = Player2);
        GameOver = true;
        return true;
      }
    }
  }
};
