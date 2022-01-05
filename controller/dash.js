axios.get("http://localhost:3000/palyers").then((res) => {
  console.log(res.data);
  let players = res.data;
  players.sort((a, b) => b.wins - a.wins);
  let table = document.getElementById("table");
  players.map((player, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <th>${index + 1}</th>
      <td>${player.name}</td>
      <td>${player.wins}</td>
      <td>${player.matches}</td>`;
    table.appendChild(tr);
  });
});
