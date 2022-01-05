let TOOTName = "";
let OTTOName = "";

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
  if (isComputer && Starter) {
    TOOTName = prompt("Please Enter the TOOT player name");
    OTTOName = "Computer";
  } else if (isComputer && !Starter) {
    TOOTName = "Computer";
    OTTOName = prompt("Please Enter the OTTO player name");
  } else {
    TOOTName = prompt("Please Enter the TOOT player name");
    OTTOName = prompt("Please Enter the OTTO playerr name");
  }
  console.log("Starter is " + ActivePlayer.name);
  console.log("TOOTName is " + TOOTName);
  console.log("OTTOName is " + OTTOName);
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

// update database
var updateDatabase = (winner) => {
  let postWinner = {};
  let postLoser = {};
  if (winner.name == "Player1") {
    postWinner = { name: TOOTName, wins: 1, matches: 1 };
    postLoser = { name: OTTOName, wins: 0, matches: 1 };
  } else {
    postWinner = { name: OTTOName, wins: 1, matches: 1 };
    postLoser = { name: TOOTName, wins: 0, matches: 1 };
  }
  axios.get("http://localhost:3000/palyers").then((res) => {
    console.log(res.data);
    let players = res.data;

    if (postWinner.name != "Computer") {
      let winners = players.filter((p) => p.name == postWinner.name);
      if (winners.length == 0) {
        axios.post("http://localhost:3000/palyers", postWinner).then((res) => {
          console.log("post winner: " + res);
        });
      } else {
        let putWinner = {
          name: winners[0].name,
          wins: winners[0].wins + 1,
          matches: winners[0].matches + 1,
        };
        console.log(putWinner);
        axios
          .put(`http://localhost:3000/palyers/${winners[0].id}`, putWinner)
          .then((res) => {
            console.log("put winner: " + res);
          });
      }
    }

    if (postLoser.name != "Computer") {
      let losers = players.filter((p) => p.name == postLoser.name);
      if (losers.length == 0) {
        axios.post("http://localhost:3000/palyers", postLoser).then((res) => {
          console.log("post loser: " + res);
        });
      } else {
        let putLoser = {
          name: losers[0].name,
          wins: losers[0].wins,
          matches: losers[0].matches + 1,
        };
        console.log(putLoser);
        axios
          .put(`http://localhost:3000/palyers/${losers[0].id}`, putLoser)
          .then((res) => {
            console.log("put loser: " + res);
          });
      }
    }
  });
};

var WinnerDeclaration = (winner) => {
  let div = document.getElementsByClassName("winner")[0];
  if (winner) {
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
