import React from 'react';
import {pi} from 'mathjs';
import player_icon from '../gameResources/player.png'
import box_icon from '../gameResources/box.jpeg'
import obstacle_icon from '../gameResources/obstacle.png'

// the game layout is as sepcified
// the list of users does not matter for now but will matter if we
//  want to render user with custom player icon.

const WHITE = '#FFFFFF';
const BLACK = '#000000';
const DARK_BLUE = '#144DDE'
const RED = '#F5190A'
const GREEN = '#22FF00'

const SOL_CHAR_SIZE = 30;
const SOL_MSG = 'Solved!';

// note that coord system of canvas is x from left to right, y from up to down, thus it is transposed
//  of our representation

const game_width = 300;
const game_height = 200;
const r_small = 5;

function on_goal(game, x, y) {
  return game.goals.reduce(function (prev, cur) {
      if (cur.row === x && cur.col === y) {
          return true;
      } else {
          return prev;
      }
  }, false);
}

class GameInterface extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      icons: {
        player: undefined,
        box: undefined,
        wall: undefined
      }
    }
    this.load_icons();

  }

  load_icons(){
    const img_plyr = new Image();
    const img_bx = new Image();
    const img_wll = new Image();

    [{key: 'player', img: img_plyr, source: player_icon}, 
      {key: 'box', img: img_bx, source: box_icon}, 
      {key: 'wall', img: img_wll, source: obstacle_icon}]
        .forEach((function(itm){
          const {key, img, source} = itm;
          img.onload = (function(){
            this.setState({...this.state, icons: {...this.state.icons, [key]: img}})
          }).bind(this);
          img.src = source;
      }).bind(this));

  }

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
    draw_game_board.bind(this)(ctx, game, user_lst, this.props.game_ended);
  }
  render() {
    return(
      <div>
        <canvas ref="canvas" height={game_height} 
                width={game_width} tabIndex='1'
                onKeyPress={this.props.on_action}/>
      </div>
    )
  }
}


function draw_game_board(ctx, game, user_lst, game_is_end){
  const w_rec = game_width / game.num_cols;
  const h_rec = game_height / game.num_rows;
  // ctx.fillStyle = WHITE;
  // ctx.fillRect(0, 0, width, height);
  for(let ri = 0; ri < game.num_rows; ri++){
    for(let ci = 0; ci < game.num_cols; ci++){
      draw_null.bind(this)(game, user_lst, w_rec, h_rec, ctx, ri, ci);
    }
  }

  game.walls.forEach((function(coord){
    draw_wall.bind(this)(game, user_lst, w_rec, h_rec, ctx, coord.row, coord.col);
  }).bind(this));
  game.boxes.forEach((function(coord){
    draw_box.bind(this)(game, user_lst, w_rec, h_rec, ctx, coord.row, coord.col);
  }).bind(this));
  game.players.forEach((function(p){
    draw_player.bind(this)(game, user_lst, w_rec, h_rec, ctx, p.row, p.col, p.player_num);
  }).bind(this));

  if(game_is_end){
    draw_game_end_message(game, user_lst, w_rec, h_rec, ctx)
  }


}

function draw_game_end_message(game, user_lst, w_rec, h_rec, ctx){
  const x_end = w_rec * game.num_cols;
  const y_end = h_rec * game.num_rows;
  ctx.font = `${SOL_CHAR_SIZE}px Arial`;
  ctx.fillStyle = RED;
  ctx.fillText(SOL_MSG, x_end / 2 - SOL_MSG.length * SOL_CHAR_SIZE / 4, y_end / 2 + SOL_CHAR_SIZE / 4);

}

function draw_wall(game, user_lst, w_rec, h_rec, ctx, r, c){
  // const on_goal = on_goal(game, r, c);
  const x = c * w_rec;
  const y = r * h_rec;
  const xn = x + w_rec;
  const yn = y + h_rec;
  if(!this.state.icons.wall){
    ctx.fillStyle = BLACK;
    ctx.fillRect(x, y, w_rec, h_rec);
  }else{
    ctx.drawImage(this.state.icons.wall, x, y, w_rec, h_rec);
  }
  
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
  if(!this.state.icons.box){
    ctx.fillStyle = DARK_BLUE;
    ctx.fillRect(x, y, w_rec, h_rec);
  }else{
    ctx.drawImage(this.state.icons.box, x, y, w_rec, h_rec);
  }
  
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

  if(!this.state.icons.player){
    ctx.fillStyle = RED;
    ctx.beginPath();
    ctx.arc(xc, yc, r_player, 0, 2 * pi);
    ctx.fill();
  }else{
    ctx.drawImage(this.state.icons.player, x, y, w_rec, h_rec);
  }
  

  if(is_on_goal){
    ctx.fillStyle = GREEN;
    ctx.beginPath();
    ctx.arc(xc, yc, r_small, 0, 2 * pi);
    ctx.fill();
  }
}


export default GameInterface;