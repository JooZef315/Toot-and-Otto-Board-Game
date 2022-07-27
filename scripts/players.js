// regestration
var InitPlayers = () => {
  let Starter = confirm("the Starter player want to play with TOOT?");
  let isComputer = confirm(
    "Want to play against computer?\n (cancel to play against other player)"
  );
  if (Starter) {
    ActivePlayer = Player1;
  } else {
    ActivePlayer = Player2;
  }
  console.log("Starter is " + ActivePlayer.name);

  return { starter: ActivePlayer, Computer: isComputer };
};

var Playerboard = () => {
  let players = document.getElementsByClassName("player");
  players[0].style.backgroundColor = "red";
  players[1].style.backgroundColor = "yellow";
};
Playerboard();

var UpdatePlayerboard = (player) => {
  let Spans = document.getElementsByTagName("span");
  let Ts = player.playingSet.filter((p) => p == 1).length;
  let Os = player.playingSet.filter((p) => p == 0).length;
  if (player.name == "Player1") {
    Spans[0].innerText = Os;
    Spans[1].innerText = Ts;
  } else {
    Spans[2].innerText = Os;
    Spans[3].innerText = Ts;
  }
};

var WinnerDeclaration = (winner) => {
  let div = document.getElementsByClassName("winner")[0];
  if (winner) {
    div.style.display = "block";
    div.innerText = `the winner is: ${ActivePlayer.name}!!!!!`;
    div.style.color = ActivePlayer.color;
    div.style.backgroundColor = "steelblue";
    for (let cell of WinningCells) {
      cell.style.backgroundColor = "black";
      cell.style.color = ActivePlayer.color;
    }
    updateDatabase(winner);
  } else {
    div.innerText = "";
  }
};
