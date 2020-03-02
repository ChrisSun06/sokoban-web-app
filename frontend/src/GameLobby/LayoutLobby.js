import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {get_all_created_games} from '../hardCodedData'
import preview1 from './sokobanpreview1.png'
import preview2 from './sokobanpreview2.jpeg'
import preview3 from './sokobanpreview3.jpeg'
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add'
import ReactSearchBox from 'react-search-box'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import GamesIcon from '@material-ui/icons/Games';



const IMAGES = {
    preview1, preview2, preview3
};


function PreviewCard(props) {
    // alert(IMAGES[props.preview.preview_image])
    return (<Card>
        <CardHeader
            title={`${props.preview.game_name}`}
            subheader={`By ${props.preview.creater.name}`}
        />
        <CardContent
        >
            <img src={IMAGES[props.preview.preview_image]} height='100vh' width='100vh'></img>
        </CardContent>

        <CardActions disableSpacing>
            <IconButton aria-label="Create Room" onClick={function(){props.on_create_room(props.preview)}}>
                <Add/> Create Room
            </IconButton>
        </CardActions>

    </Card>)
}

function LayoutList(props) {
    return (
        <Grid container spacing={24}>
            {props.game_previews.map(function (preview) {
                return (
                    <Grid md={3}>
                        <PreviewCard preview={preview} on_create_room={props.on_create_room}/>
                    </Grid>)
            })}
        </Grid>)
}

const ALL_GAMES = 0;

export default class LayoutLobby extends React.Component {
    // assume props have the list of the games
    constructor(props) {
        super(props);
        this.state = {
            current_on: ALL_GAMES,
            game_list: [],
            display_game: [],
            entering_room_code: ''
        };
        this.fetch_all_games();
    }

    fetch_all_games() {
        get_all_created_games(null)
            .then((function (result) {
                this.setState({...this.state, game_list: result.games, display_game: result.games})
            }).bind(this))
    }

    on_create_room(game_preview){
        window.location.href = '/gameroom'
    }

    on_enter_room(){
        window.location.href = '/gameroom'
    }

    on_input_room_code(e){
        let v = e.target.value;
        if(v.length > 4){
            v = v.substring(0, 4);
        }
        this.setState({...this.state, entering_room_code: v});
    }

    render() {
        const centered_style = {display: 'flex',  
                                justifyContent:'center', 
                                alignItems:'center'};
        return (
            <div>
                <ReactSearchBox
                    placeholder="Search"
                    // value="Search..."
                    data={this.state.display_game}
                    onChange={value => (function (value) {
                        var game_list = this.state.game_list;
                        var display_game = [];
                        for (var i = 0; i < game_list.length; i++) {
                            if (game_list[i].game_name.includes(value)) {
                                // console.log(game_list[i].game_name);
                                display_game.push(game_list[i]);
                            }
                        }
                        this.setState({...this.state, game_list: game_list, display_game: display_game});
                    }).bind(this)(value)}
                    fuseConfigs={{
                        threshold: 0.05,
                    }}
                />
                <br/>
                
                {this.state.current_on === ALL_GAMES && <LayoutList 
                                                            game_previews={this.state.display_game}
                                                            on_create_room={this.on_create_room.bind(this)}/>}

                <div style={{...centered_style,marginTop: '50px'}}>
                    <InputLabel style={{marginRight: '10px'}}>Enter a room code to enter an existing code: </InputLabel>
                    <Input placeholder='enter 4-digit code...' value={this.state.entering_room_code} onChange={this.on_input_room_code.bind(this)}/>
                </div>
                <br/>
                <div style={{...centered_style}}>
                    <IconButton onClick={this.on_enter_room.bind(this)}><GamesIcon/> Play</IconButton>
                </div>
            </div>
        )
    }

}