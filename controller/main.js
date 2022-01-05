const Letters = ["O", "T"];
let WinningCells = [];
let GameOver = false;

//represent T by 1 and O by 0
let PlayingSet = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0];

let Player1 = {
  name: "Player1",
  playingSet: [...PlayingSet],
  color: "red",
  seq: [1, 0, 0, 1],
  count: 0,
};
let Player2 = {
  name: "Player2",
  playingSet: [...PlayingSet],
  color: "yellow",
  seq: [0, 1, 1, 0],
  count: 0,
};
// initialization to start
let ActiveLetter = 0;
let ActivePlayer = Player1;
let ActiveCol = 0;

// regestration
let initPlayers = InitPlayers();

var Cells = [...document.getElementsByTagName("tr")].slice(1).map((c) => {
  return [...c.children];
});

var HeaderRow = [...document.getElementsByTagName("tr")].slice(0, 1)[0];
var HeaderCells = [...HeaderRow.children];
HeaderCells.map((h, index) => {
  h.addEventListener("mouseenter", () => {
    h.style.backgroundColor = ActivePlayer.color;
    h.classList.add("active-header");
    h.innerText = Letters[ActiveLetter];
  });
  h.addEventListener("mouseout", () => {
    h.classList.remove("active-header");
    h.style.backgroundColor = "initial";
    h.innerText = "";
  });
  h.addEventListener("wheel", () => {
    ActiveLetter = Letters.length - 1 - ActiveLetter;
    h.innerText = Letters[ActiveLetter];
  });
  h.addEventListener("click", () => {
    ActiveCol = index;
    if (GameOver) {
      alert("Reset to start new game");
    } else {
      if (Cells[0][ActiveCol].innerText == "") {
        if (ActivePlayer.playingSet.includes(ActiveLetter)) {
          Playing(ActiveCol, ActiveLetter, ActivePlayer, initPlayers.Computer);
          if (initPlayers.Computer) {
            computerPlaying(ActivePlayer);
          }
        } else {
          alert("You've used all your " + Letters[ActiveLetter]);
        }
      } else {
        alert("The Column is fulfilled");
      }
    }
  });
});

document.getElementById("reset").addEventListener("click", () => {
  WinnerDeclaration();
  GameOver = false;
  let div = document.getElementsByClassName("winner")[0];
  div.style.backgroundColor = "white";
  ActiveLetter = 0;
  ActivePlayer = initPlayers.starter;
  ActiveCol = 0;
  Player1.playingSet = [...PlayingSet];
  Player2.playingSet = [...PlayingSet];
  WinningCells = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 6; j++) {
      Cells[i][j].innerText = "";
      Cells[i][j].style.backgroundColor = "white";
      Cells[i][j].style.color = "black";
    }
  }
  for (let i = 0; i < 4; i++) {
    document.getElementsByTagName("span")[i].innerText = 6;
  }
  // console.log(TOOTName + " " + OTTOName);
  // console.log(ActivePlayer);
});
