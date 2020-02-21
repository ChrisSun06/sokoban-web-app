// This file is for hard coded data for phase one






// ------------------ below is data for games -------------------
const EMPTY_CELL = 0;
const WALL_CELL = 1;
const BOX_CELL = 2;
const PLAYER_CELL = 3;
// each game consists of a layout and a list of storage points
//  the list of storage points is a list of (row, col) pairs
//  each game layout L is a 2d array where L[r][c] is on row r and col c
//    each entry L[i][j] = lij, is a JS object specified among the
//    following:
//      (1) nothing: {type = EMPTY_CELL}
//      (2) wall: {type = WALL_CELL};
//      (3) box: {type: BOX_CELL}
//      (4) player: {type: PLAYER_CELL, player_num: player index}
//                  (as for player index, each index is an assigned
//                  player number just in this game, it maps to
//                  a user in the database but it is different)
function NullCell(){
  return {
    type: EMPTY_CELL
  };
}
function WallCell(){
  return {
    type: WALL_CELL
  };
}
// this is not a typo, it is just that four letters align
function BoxxCell(){
  return {
    type: BOX_CELL
  };
}
function UsrCell(n){
  return {
    type: PLAYER_CELL,
    player_num: n
  }
}
const sample_game = {
  goals: [[0, 2], [2, 0], [2, 4], [4, 2]],
  layout:[
    [NullCell(), WallCell(), NullCell(), WallCell(), NullCell()],
    [WallCell(), WallCell(), BoxxCell(), WallCell(), WallCell()],
    [NullCell(), BoxxCell(), UsrCell(0), BoxxCell(), NullCell()],
    [WallCell(), WallCell(), BoxxCell(), WallCell(), WallCell()],
    [NullCell(), WallCell(), NullCell(), WallCell(), NullCell()]
  ],
}



module.exports={
  sample_game: sample_game
}

