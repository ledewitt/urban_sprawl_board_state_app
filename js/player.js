
function create_player_board() {
  players = "";
  Object.keys(game_state["player_state"]).forEach(function(element)
    {console.log(element);
      players = players + "<table> <tr> Player: </tr> <tr> "+
        game_state["player_state"][element]+
        " </tr> </table>";
    });
  document.getElementById("player-boards").innerHTML = players;
}

function player_name(element) {
  players = players + element;
  console.log(element);
}

function player_name(name) {

  var e = document.getElementById("Player_Section_Menu")
  var strUser = e.options[e.selectedIndex].value;

  game_state["player_state"][strUser] = document.getElementById("name").value;

  create_player_board();
}
