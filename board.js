path = rectangle(30,30);
path2 = rectangle(100,30);
pieces = [path,  path2];
board_offset_x = 100;
board_offset_y = 100;
piece_size     = 60;
draw_board();
on_the_mouse = null;
function inBounds(shape) {
  return (shape.bounds["_width"] + shape.bounds["_x"] >= mouse_x &&
        shape.bounds["_x"] <= mouse_x &&
        shape.bounds["_height"] + shape.bounds["_y"] >= mouse_y &&
        shape.bounds["_y"] <= mouse_y);
}

function draw_board() {
  draw_grid(board_offset_x,board_offset_y,6,6);
  draw_prestige_side_board(board_offset_x,board_offset_y);

}

function draw_prestige_side_board(board_offset_x,board_offset_y) {
  prestige_markers = new Path();
  prestige_markers.strokeColor = 'black';
  prestige_left_x   = board_offset_x
  prestige_right_x  = board_offset_x + piece_size * 6;
  prestige_top_y    = board_offset_y + piece_size * 6 + 20;
  prestige_bottom_y = board_offset_y + piece_size * 6 + piece_size + 20;
  prestige_markers.add(new Point(prestige_left_x,  prestige_top_y));
  prestige_markers.add(new Point(prestige_left_x,  prestige_bottom_y));
  prestige_markers.add(new Point(prestige_right_x, prestige_bottom_y));
  prestige_markers.add(new Point(prestige_right_x, prestige_top_y));
  prestige_markers.closed=true;
}

function draw_grid(start_x,start_y,height,width) {
  for(var i = 0; i < height;    i++) {
    draw_grid_row(start_x,start_y + piece_size * i,width);
  }
}

function draw_grid_row(start_x,start_y,grid_size) {
  for(var i = 0 ; i < grid_size; i++) {
    var grid = new Path();
    grid.strokeColor = 'black';
    grid.add(new Point(start_x + piece_size * i, start_y));
    grid.add(new Point(start_x + piece_size * i, start_y + piece_size));
    grid.add(new Point(start_x + piece_size + piece_size * i, start_y + piece_size));
    grid.add(new Point(start_x + piece_size + piece_size * i, start_y));
    grid.add(new Point(start_x + piece_size * i, start_y));
    grid.closed=true;
  }
}

function onMouseDown(event) {
  mouse_x = event.point["x"];
  mouse_y = event.point["y"];
  my_piece = pieces.find(inBounds);
  if(my_piece != null) {
    on_the_mouse = my_piece;
  }

}

function onMouseUp(event) {
  if(on_the_mouse == null) {
  } else {
    var x_modulus = (event.point["x"] - 100) % piece_size;
    var y_modulus = (event.point["y"] - 100) % piece_size;
    refined_x = event.point["x"] - x_modulus + 30;
    refined_y = event.point["y"] - y_modulus + 30;
    move_to = {x: refined_x , y: refined_y};
    on_the_mouse.position = move_to;
    on_the_mouse = null;
  }
}

function rectangle(x,y) {
  var path = new Path();
  path.strokeColor = 'black';
  path.add(new Point(x, y));
  path.add(new Point(x + 60, y));
  path.add(new Point(x + 60, y));
  path.add(new Point(x + 60, y + 30));
  path.add(new Point(x + 30, y + 30));
  path.add(new Point(x + 30, y + 60));
  path.add(new Point(x, y + 60));
  path.closed=true;
  project.activeLayer.lastChild.fillColor = 'red';
  return path;
}
