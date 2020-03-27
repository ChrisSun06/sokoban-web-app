import React from 'react';
// import Data from '../hardCodedData'
import GameInterface from './GameInterface'
import InGameChatBox from './InGameChatBox'
import WaitingText from './WaitingText'
import { IconButton } from '@material-ui/core';

import "./styles.css"

const watch_interval = 100;

const sample_chats = [
  {
      room_num: 0,
      msgs: [
          {
              time: new Date(),
              sender_number: 0,
              content: 'That looks easy!!!'
          }
      ]
  },


];


function game_end(game) {
  return game.boxes.reduce(function (prev, cur) {
      return prev && on_goal(game, cur.row, cur.col);
  }, true);
}

const sample_game = {
  num_rows: 5,
  num_cols: 5,
  // goals: [{[0, 2], [2, 0], [2, 4], [4, 2]}],
  goals: [
      {row: 0, col: 2},
      {row: 2, col: 0},
      {row: 2, col: 4},
      {row: 4, col: 2}
  ],
  boxes: [
      {row: 1, col: 2},
      {row: 2, col: 1},
      {row: 2, col: 3},
      {row: 3, col: 2},
  ],
  walls: [
      {row: 0, col: 1},
      {row: 0, col: 3},
      {row: 1, col: 1},
      {row: 1, col: 3},
      {row: 1, col: 0},
      {row: 1, col: 4},
      {row: 3, col: 0},
      {row: 3, col: 1},
      {row: 3, col: 3},
      {row: 3, col: 4},
      {row: 4, col: 1},
      {row: 4, col: 3}
  ],
  players: [
      {row: 2, col: 2, player_num: 0}
  ]
};

// action consists of:
//  {
//    player_num: the player that took the action
//    key: the key got pressed, has to be among W, A, S, D
//  }
// gonna do it asynchoronously for it to fit later with server, will use Proimse
// const EMPTY = 'empty';
// const WALL = 'wall';
// const PLAYER = 'player';
// const BOX = 'box';
const EMPTY = 'empty';
const WALL = 'wall';
const PLAYER = 'player';
const BOX = 'box';
const GOAL = 'goal';
const ERASE = 'delete';

const DIRECTIONS = {
  'w': [-1, 0],
  's': [1, 0],
  'a': [0, -1],
  'd': [0, 1],
  'W': [-1, 0],
  'S': [1, 0],
  'A': [0, -1],
  'D': [0, 1]
};

function coord_type(game, r, c) {
  if (r >= game.num_rows || c >= game.num_cols || r < 0 || c < 0) {
      return WALL;
  } else if (
      game.walls.reduce((prev, cur) => {
          if (r === cur.row && c === cur.col) {
              return true;
          } else {
              return prev;
          }
      }, false)
  ) {
      return WALL;
  } else if (
      game.boxes.reduce((prev, cur) => {
          if (r === cur.row && c === cur.col) {
              return true;
          } else {
              return prev;
          }
      }, false)
  ) {
      return BOX;
  } else if (
      game.players.reduce((prev, cur) => {
          if (r === cur.row && c === cur.col) {
              return true;
          } else {
              return prev;
          }
      }, false)
  ) {
      return PLAYER;
  } else {
      return EMPTY;
  }

}



function fetch_initial_game_config(...args) {
  // promise for asynchrousness
  return new Promise(function (resolve, reject) {
      resolve({
          game: sample_game,
          player_lst: []
      });
  });
}

function next_game(game, action) {
  // copy without ref
  return new Promise(function (resolve, reject) {
      const new_game = JSON.parse(JSON.stringify(game));

      const player_num = action.player_num;
      const key = action.key;
      // console.log(new_game)
      // console.log(action);
      // console.log(player_num);
      // console.log(key);
      const plyr = new_game.players.find((player_i) => player_i.player_num === player_num);
      if (!plyr) {
          reject();
      } else {
          const move_dir = DIRECTIONS[key];
          const dr = move_dir[0];
          const dc = move_dir[1];
          const r = plyr.row;
          const c = plyr.col;
          const rn = r + dr;
          const cn = c + dc;
          const type_n = coord_type(game, rn, cn);
          let can_move = true;
          // console.log(type_n);
          if ([PLAYER, WALL].includes(type_n)) {
              can_move = false;
          } else if ([BOX].includes(type_n)) {
              const rnn = rn + dr;
              const cnn = cn + dc;
              const type_nn = coord_type(game, rnn, cnn);
              if ([BOX, PLAYER, WALL].includes(type_nn)) {
                  can_move = false;
              }
          }
          // else{
          //   // empty
          //   can_move = true;
          // }
          if (!can_move) {
              // return new_game;
              reject();
          } else {
              // console.log('finally moving');
              // console.log(new_game)
              if (type_n === BOX) {
                  const boxn = new_game.boxes.find((bx) => bx.row === rn && bx.col === cn);
                  boxn.row = rn + dr;
                  boxn.col = cn + dc;
              }
              plyr.row = rn;
              plyr.col = cn;
              // console.log(new_game)
              // resolve(game_end(new_game), JSON.stringify(new_game));
              resolve({game_end: game_end(new_game), new_game: new_game});
          }
      }

  });

}

function get_room_messages(room_id) {
  return new Promise(function (resolve, reject) {
      const rm_chat = sample_chats.filter(function (cts) {
          return cts.room_num === room_id
      })[0];
      if (!rm_chat) {
          reject();
      } else {
          resolve({chat: rm_chat});
      }

  });
}

function push_new_message(room_id, usr_id, content) {
  return new Promise(function (resolve, reject) {
      const rm_chat = sample_chats.filter(function (cts) {
          return cts.room_num === room_id
      })[0];
      if (!!rm_chat) {
          rm_chat.msgs.push(
              {
                  time: new Date(),
                  sender_number: usr_id,
                  content: content
              }
          );
          resolve();
      } else {
          reject();
      }

  });
}

class GamePlayPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      url_info: this.parseUrl(),
      players: undefined,
      game: undefined,
      game_ended: false,
      // part of hardcode, should instead fetch the player number
      player_num: 0,
      allow_action: true,
      cnt_down : 5,
      chat: {
        all_msgs: [],
        input_msg: ''
      }
    }
  }

  parseUrl(){
    const query_str = window.location.search;
    return {
      room_number: parseInt(query_str.replace('?', ''))
    }
  }

  onAction(e){
    if(this.state.allow_action){
      const key = e.key;
      if('wasdWASD'.includes(key)){
        this.setState({allow_action: false});
        next_game(this.state.game, {player_num: this.state.player_num, key: key})
          .then((function(result){
            // console.log('next game!')
            // console.log(game_end, new_game);
            const new_game = result.new_game;
            const game_end = result.game_end;
            // if(!game_end){
            //   this.setState({game: new_game, allow_action: true});
            // }else{
              // this.setState({allow_action: false, game: new_game},
              //   (function(){
              //     // alert('End of Game!')
              //     // this.state.setState
              //   }).bind(this));
            // }
            this.setState({game: new_game, allow_action: !game_end, game_ended: game_end})
            if(game_end){
              this.return_to_lobby_count_down();
            }
          }).bind(this))
          .catch((function(){
            this.setState({allow_action: true})
          }).bind(this));
      }
    }

  }

  return_to_lobby_count_down(){
    setInterval((function(){
      if(this.state.cnt_down > 0){
        this.setState(
          {...this.state, cnt_down: this.state.cnt_down - 1},
          (function(){
            if(this.state.cnt_down <= 0){
              window.location.href = '/lobby';
            }
          }).bind(this)
        )
      }
    }).bind(this), 1000)
  }

  focus_on_canvas(){
    document.querySelector('canvas').focus();
  }

  componentDidMount(){
    fetch_initial_game_config()
      .then((function(result){
        // alert(JSON.stringify(result))
        this.setState({
          game: result.game,
          players: result.player_lst
        }, this.focus_on_canvas.bind(this));
      }).bind(this));
    // const {room_number} = useParams();
    const room_number = this.state.url_info.room_number;
    this.start_watching_msgs(room_number);
  }

  start_watching_msgs(rm_num){
    setInterval(this.update_msgs(rm_num), watch_interval)
  }
  update_msgs(room_number){
    return (function(){
      get_room_messages(room_number)
        .then((function(result){
          this.setState({
            ...this.state,
            chat: {...this.state.chat,
                    all_msgs: result.chat.msgs
                  }
          })
        }).bind(this))
        .catch(function(){

        });
        // console.log(this.state.chat);
        // console.log(room_number)

    }).bind(this);

  }

  update_input_msg(content){
    this.setState(
      {
        ...this.state,
        chat: {...this.state.chat,
                input_msg: content
              }
      }
    )
  }

  onSendMessage(){
    // const {room_number} = useParams();
    const room_number = this.state.url_info.room_number;
    push_new_message(room_number, this.state.player_num, this.state.chat.input_msg)
      .then((function(result){
        this.setState({
          ...this.state,
          chat: {
            ...this.state.chat,
            input_msg: ''
          }
        })
      }).bind(this))
  }

  on_quit(e){
    window.location.href='/lobby'
  }

  render(){

    return(
      <div id="background">
        <h1 id="a">The Game</h1>
        <div id="b">
          <IconButton onClick={this.on_quit.bind(this)} color='secondary'>
            Quit
          </IconButton>
        </div>
        {/* {this.state.game_ended &&
          <h4 style={{...centered_style, color: 'grey'}}>
            {`Game ended, returning to game lobby in ${this.state.cnt_down} seconds`}
          </h4>} */}
        {this.state.game_ended &&
          <div id="e">
            <WaitingText msg={`Game ended, returning to game lobby in ${this.state.cnt_down} seconds`}/>
          </div>}
        <br/>
        <div id="c">
          <GameInterface game={this.state.game}
                        usr_lst={this.state.players}
                        on_action={this.onAction.bind(this)}
                        game_ended={this.state.game_ended}/>
        </div>
        <div id="d">
          <InGameChatBox messages={this.state.chat.all_msgs}
                        on_send_msg={this.onSendMessage.bind(this)}
                        input_msg={this.state.chat.input_msg}
                        on_input_msg_change={this.update_input_msg.bind(this)}/>
        </div>
      </div>)
  }

}

export default GamePlayPage;
