
function create_player_board() {
  players = "";
  Object.keys(game_state["player_state"]).forEach(function(element)
    {
      players = players + "<table> <tr> Player: </tr> <tr> "+
        game_state["player_state"][element]+
        " </tr> </table>";
    });
  document.getElementById("player-boards").innerHTML = players;
}

// TODO rename this

function player_name(name) {

  var e = document.getElementById("Player_Section_Menu")
  var strUser = e.options[e.selectedIndex].value;

  game_state["player_state"]["players"].push(document.getElementById("name").value);

  create_player_board();
}
