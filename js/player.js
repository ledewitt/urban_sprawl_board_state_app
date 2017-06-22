function create_player_board() {
  players = "";
  game_state["player_state"]["players"].forEach(function(element)
    {

    /*
      TODO: Call function to build the player's table with all information.

      Name, Vocations, etc...

      Replace Strings with actual data structures.
    */

      players = players + "<table> <tr> Player: </tr> <tr> "+
        element+
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
