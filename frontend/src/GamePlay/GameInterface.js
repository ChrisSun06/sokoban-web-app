import React from 'react';
import {pi} from 'mathjs';
import {on_goal} from '../hardCodedData';
// the game layout is as sepcified
// the list of users does not matter for now but will matter if we
//  want to render user with custom player icon.

const WHITE = '#FFFFFF';
const BLACK = '#000000';
const DARK_BLUE = '#144DDE'
const RED = '#F5190A'
const GREEN = '#22FF00'

// note that coord system of canvas is x from left to right, y from up to down, thus it is transposed
//  of our representation

const game_width = 300;
const game_height = 200;
const r_small = 5;

class GameInterface extends React.Component {
  // constructor(props){
  //   super(props);
  // }

  componentDidUpdate(){
    if(!this.props.game){
      return;
    }
    const canvas = this.refs.canvas;
    if(!canvas){
      return;
    }
    const ctx = canvas.getContext("2d");
    const user_lst = this.props.usr_lst;
    // const on_action = this.state.on_action;
    const game = this.props.game;
    // const rws = game.layout.length;
    // const cls = game.layout[0].length;
    // for(let cx = 0; cx < rws; cx++){
    //   for(let cy=0; cy<cls; cy++){
    //     CellDisplay(cx, cy, user_lst, ctx, game);
    //   }
    // }
    draw_game_board(ctx, game, user_lst);
  }
  render() {
    return(
      <div>
        <canvas ref="canvas" height={game_height} 
                width={game_width} tabIndex='0'
                onKeyPress={this.props.on_action}/>
      </div>
    )
  }
}


function draw_game_board(ctx, game, user_lst){
  const w_rec = game_width / game.num_cols;
  const h_rec = game_height / game.num_rows;
  // ctx.fillStyle = WHITE;
  // ctx.fillRect(0, 0, width, height);
  for(let ri = 0; ri < game.num_rows; ri++){
    for(let ci = 0; ci < game.num_cols; ci++){
      draw_null(game, user_lst, w_rec, h_rec, ctx, ri, ci);
    }
  }

  game.walls.forEach(function(coord){
    draw_wall(game, user_lst, w_rec, h_rec, ctx, coord.row, coord.col);
  });
  game.boxes.forEach(function(coord){
    draw_box(game, user_lst, w_rec, h_rec, ctx, coord.row, coord.col);
  });
  game.players.forEach(function(p){
    draw_player(game, user_lst, w_rec, h_rec, ctx, p.row, p.col, p.player_num);
  });

}

function draw_wall(game, user_lst, w_rec, h_rec, ctx, r, c){
  // const on_goal = on_goal(game, r, c);
  const x = c * w_rec;
  const y = r * h_rec;
  const xn = x + w_rec;
  const yn = y + h_rec;
  ctx.fillStyle = BLACK;
  ctx.fillRect(x, y, w_rec, h_rec);
  // ctx.fillStyle=undefined;
  // console.log(r, c, x, y, xn, yn)
  // assume wall never on goal

}

function draw_null(game, user_lst, w_rec, h_rec, ctx, r, c){
  const is_on_goal = on_goal(game, r, c);
  const x = c * w_rec;
  const y = r * h_rec;
  const xn = x + w_rec;
  const yn = y + h_rec;
  ctx.fillStyle = WHITE;
  ctx.fillRect(x, y, w_rec, h_rec);
  if(is_on_goal){
    const xc = (x + xn) / 2;
    const yc = (y + yn) / 2;
    ctx.fillStyle = GREEN;
    ctx.beginPath();
    ctx.arc(xc, yc, r_small, 0, 2 * pi);
    ctx.fill();
  }
}
function draw_box(game, user_lst, w_rec, h_rec, ctx, r, c){
  const is_on_goal = on_goal(game, r, c);
  const x = c * w_rec;
  const y = r * h_rec;
  const xn = x + w_rec;
  const yn = y + h_rec;
  ctx.fillStyle = DARK_BLUE;
  ctx.fillRect(x, y, w_rec, h_rec);
  if(is_on_goal){
    const xc = (x + xn) / 2;
    const yc = (y + yn) / 2;
    ctx.fillStyle = GREEN;
    ctx.beginPath();
    ctx.arc(xc, yc, r_small, 0, 2 * pi);
    ctx.fill();
  }
}
function draw_player(game, user_lst, w_rec, h_rec, ctx, r, c, player_num){
  // should render based on player number but ignore it for now
  const is_on_goal = on_goal(game, r, c);
  const x = c * w_rec;
  const y = r * h_rec;
  const xn = x + w_rec;
  const yn = y + h_rec;
  const xc = (x + xn) / 2;
  const yc = (y + yn) / 2;
  // take min
  const r_player = [xc - x, yc - y].reduce(function(prev, cur){
    if(!prev || cur < prev){
      return cur;
    }else{
      return prev;
    }
  }, undefined);

  ctx.fillStyle = RED;
  ctx.beginPath();
  ctx.arc(xc, yc, r_player, 0, 2 * pi);
  ctx.fill();

  if(is_on_goal){
    ctx.fillStyle = GREEN;
    ctx.beginPath();
    ctx.arc(xc, yc, r_small, 0, 2 * pi);
    ctx.fill();
  }
}


// // right now only use simple geometry for debug purpose
// function CellDisplay(cellx, celly, user_lst, ctx, game){
//   console.log(`start filling ${cellx}, ${celly}`)
//   const rws = game.layout.length;
//   const cls = game.layout[0].length;
//   const cell_width = game_width / rws;
//   const cell_height = game_height / cls;
//   const cell = game.layout[cellx][celly];
//   // alert(JSON.stringify(game))
//   const is_on_goal = game.goals.reduce(function(prev, cur){
//     if(cur[0] === cellx && cur[1] === celly){
//       return true;
//     }
//     return prev;
//   }, false)

//   const sx = cell_width * cellx;
//   const sy = cell_height * celly;
//   const ex = sx + cell_width;
//   const ey = sy + cell_height;

//   let r = cell_width / 2;
//   if(cell_height < cell_width){
//     r = cell_height / 2;
//   }
  

//   switch(cell.type) {
//     case EMPTY_CELL:
//       ctx.fillStyle = WHITE;
//       ctx.fillRect(sx, sy, ex, ey);
//       if(is_on_goal){
//         ctx.fillStyle = GREEN;
//         ctx.beginPath();
//         ctx.arc((sx + ex) / 2, (sy + ey) / 2, r_small, 0, 2*pi);
//         ctx.fill();
//         // ctx.fillRect((0.75 * sx + 0.25 * ex), (0.75* sy + 0.25 * ey), 
//         //             (0.25 * sx + 0.75 * ex), (0.25* sy + 0.75 * ey))
//       }
//       break;
//     case WALL_CELL:
//       ctx.fillStyle = BLACK;
//       ctx.fillRect(sx, sy, ex, ey);
//       break;
//     case BOX_CELL:
//       ctx.fillStyle = DARK_BLUE;
//       ctx.fillRect(sx, sy, ex, ey);
//       break;
//     case PLAYER_CELL:
//       ctx.fillStyle = RED;
//       ctx.beginPath();
//       ctx.arc((sx + ex) / 2, (sy + ey) / 2, r, 0, 2 * pi);
//       ctx.fill();
//       break;
//     default:
//       break;
//   }
//   console.log(`end filling ${cellx}, ${celly}`)
// }

export default GameInterface;