
board_offset_x = 361;
board_offset_y = 267;
piece_size     = 56;

pieces = [];
draw_board();
on_the_mouse = null;
test_point = new Point(5,5);


function draw_board() {
  draw_grid(board_offset_x,board_offset_y,6,6);
  draw_prestige_side_board(board_offset_x,board_offset_y);
  insert_board_image();
  draw_piece_side_board();
}

function draw_piece_side_board() {
  var piece_side_board_name = new PointText(0,800);
  piece_side_board_name.fillColor = "white";
  piece_side_board_name.fontSize = 25;
  piece_side_board_name.content = "piece generator";
  piece_side_board_borders = { "left_x"  :  0,
                      "right_x" : piece_size * 7,
                      "top_y"   : 820,
                      "bottom_y": 820 + piece_size * 2
  };
  piece_side_board = new Path();
  piece_side_board.strokeColor = 'black';
  piece_side_board.fillColor = "white";
  var left_x   = piece_side_board_borders["left_x"];
  var right_x  = piece_side_board_borders["right_x"];
  var top_y    = piece_side_board_borders ["top_y"];
  var bottom_y = piece_side_board_borders["bottom_y"];
  piece_side_board.add(new Point(left_x,  top_y));
  piece_side_board.add(new Point(right_x, top_y));
  piece_side_board.add(new Point(right_x, bottom_y));
  piece_side_board.add(new Point(left_x,  bottom_y));
  piece_side_board.closed = true;

  var red_big_square = big_square_shape(10,800 + piece_size - piece_size / 2);
  pieces.push(red_big_square);
  var red_l = l_shape(10 + piece_size + 10,800 + piece_size - piece_size / 2);
  pieces.push(red_l);
  var red_rectangle = rectangle_shape(10 * 2 + piece_size * 2 + 10,800 + piece_size - piece_size / 2);
  pieces.push(red_rectangle);
  var red_little_square = little_square_shape(10 * 3 + piece_size * 3 + 10,800 + piece_size - piece_size / 2);
  pieces.push(red_little_square);

}

function inBounds(shape) {
  return shape.contains(mouse_location.point);
}

function insert_board_image() {
  board_raster = new Raster('board-graphic');
  board_raster.position = new Point(100 + board_raster["width"]  / 2,
                                    100 + board_raster["height"] / 2);
  board_raster.sendToBack();
  var rect = new Path.Rectangle({
    point: [0, 0],
    size: view.size ,
    strokeColor: 'blue',
    selected: true
  });
  rect.sendToBack();
  rect.fillColor = 'blue';
}

function make_token(position,type,value) {
  var token_size = 27;
  var circle = new Path.Circle(position, token_size / 2 - 4);
  circle.strokeColor = 'black';
  fill_color = type == 'wealth' ? "yellow" : "red";
  circle.fillColor = fill_color;
  var text = new PointText(new Point(position.x, position.y + 4));
  text.fillColor = 'black';
  text.justification = 'center';
  text.content = value;
  var token = new Group();
  token.addChild(circle);
  token.addChild(text);
  return token;
}

function draw_prestige_side_board(board_offset_x,board_offset_y) {
  var token_size = 27;
  var prestige_borders= { "left_x"  :  board_offset_x + 60,
                      "right_x" : board_offset_x + token_size * 9 + 60,
                      "top_y"   : board_offset_y + piece_size * 6 + 110,
                      "bottom_y": board_offset_y + piece_size * 6 + token_size + 110
  };
  prestige_markers = new Path();
  prestige_markers.strokeColor = 'black';
  var left_x   = prestige_borders["left_x"];
  var right_x  = prestige_borders["right_x"];
  var top_y    = prestige_borders["top_y"];
  var bottom_y = prestige_borders["bottom_y"];
  prestige_markers.add(new Point(left_x,  top_y));
  prestige_markers.add(new Point(left_x,  bottom_y));
  prestige_markers.add(new Point(right_x, bottom_y));
  prestige_markers.add(new Point(right_x, top_y));
  prestige_markers.closed=true;



  for(var i = 4; i <= 6 ; i++) {
    _x = left_x + (i - 4) * token_size + token_size / 2;
    _y = top_y + token_size / 2;
    var spot = new Point(_x, _y );
    var _token = make_token(spot,"influence",i);
    pieces.push(_token);
  }
  for(var i = 7; i <= 12 ; i++) {
    _x = left_x + (i - 4) * token_size + token_size / 2;
    _y = top_y + token_size / 2;
    var spot = new Point(_x, _y );
    var _token = make_token(spot,"wealth",i);
    pieces.push(_token);
  }
}

function draw_grid(start_x,start_y,height,width) {
  for(var i = 0; i < height;    i++) {
    draw_grid_row(start_x,start_y + piece_size * i,width);
  }
}
function draw_grid_row(start_x,start_y,grid_size) {
  for(var i = 0 ; i < grid_size; i++) {
    this_start_x = start_x + (piece_size * i);
    var grid = new Path();
    grid.strokeColor = 'black';
    grid.add(new Point(this_start_x, start_y));
    grid.add(new Point(this_start_x, start_y + piece_size));
    grid.add(new Point(this_start_x + piece_size, start_y + piece_size));
    grid.add(new Point(this_start_x + piece_size, start_y));
    grid.add(new Point(this_start_x, start_y));
    grid.closed=true;
  }
}
function onMouseDown(event) {
  mouse_location = event
  mouse_x = event.point["x"];
  mouse_y = event.point["y"];
  my_piece = pieces.find(inBounds);
  if(my_piece != null) {
    if(piece_side_board.contains(mouse_location.point)) {
      on_the_mouse = my_piece.clone();
      pieces.push(on_the_mouse);
    } else {
      on_the_mouse = my_piece;
    }
  }
}
function onMouseUp(event) {
  if(on_the_mouse == null) {
  } else {
    var x_modulus = (event.point["x"] - board_offset_x) % piece_size;
    var y_modulus = (event.point["y"] - board_offset_y) % piece_size;
    refined_x = event.point["x"] - x_modulus + piece_size / 2 - 5;
    refined_y = event.point["y"] - y_modulus + piece_size / 2 - 5;
    move_to = {x: refined_x , y: refined_y};
    on_the_mouse.position = move_to;
    on_the_mouse = null;
  }
}

function l_shape(x,y) {
  var path = new Path();
  path.strokeColor = 'black';
  path.add(new Point(x, y));
  path.add(new Point(x + piece_size - 10, y));
  path.add(new Point(x + piece_size - 10, y));
  path.add(new Point(x + piece_size - 10, y + piece_size / 2 - 5));
  path.add(new Point(x + piece_size / 2 - 5, y + piece_size / 2 - 5));
  path.add(new Point(x + piece_size / 2 - 5, y + piece_size - 10));
  path.add(new Point(x, y + piece_size - 10));
  path.closed=true;
  project.activeLayer.lastChild.fillColor = 'red';
  return path;
}

function big_square_shape(x,y) {
  var path = new Path();
  path.strokeColor = 'black';
  path.add(new Point(x, y));
  path.add(new Point(x + piece_size - 10, y));
  path.add(new Point(x + piece_size - 10, y + piece_size - 10));
  path.add(new Point(x, y + piece_size - 10));
  path.closed=true;
  project.activeLayer.lastChild.fillColor = 'red';
  return path;
}

function rectangle_shape(x,y) {
  var path = new Path();
  path.strokeColor = 'black';
  path.add(new Point(x, y));
  path.add(new Point(x + piece_size / 2 - 5, y));
  path.add(new Point(x + piece_size / 2 - 5, y + piece_size - 10));
  path.add(new Point(x, y + piece_size - 10));
  path.closed=true;
  project.activeLayer.lastChild.fillColor = 'red';
  return path;
}

function little_square_shape(x,y) {
  var path = new Path();
  path.strokeColor = 'black';
  path.add(new Point(x, y));
  path.add(new Point(x + piece_size / 2 - 5, y));
  path.add(new Point(x + piece_size / 2 - 5, y + piece_size / 2 - 5));
  path.add(new Point(x, y + piece_size / 2 - 5));
  path.closed=true;
  project.activeLayer.lastChild.fillColor = 'red';
  return path;
}


