import React from 'react';
// import Data from '../hardCodedData'
import GameInterface from './GameInterface'
import {next_game, 
        get_room_messages, push_new_message} from '../hardCodedData'
import InGameChatBox from './InGameChatBox'
import WaitingText from './WaitingText'
import { IconButton } from '@material-ui/core';

import "./styles.css"

const watch_interval = 100;

function fetch_initial_game_config(...args) {
  // promise for asynchrousness
  return new Promise(function (resolve, reject) {
      resolve({
          game: sample_game,
          player_lst: []
      });
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
