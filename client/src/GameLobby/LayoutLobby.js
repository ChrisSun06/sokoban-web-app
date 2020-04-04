import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import preview1 from './sokobanpreview1.png'
import preview2 from './sokobanpreview2.jpeg'
import preview3 from './sokobanpreview3.jpeg'
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add'
import ReactSearchBox from 'react-search-box'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import GamesIcon from '@material-ui/icons/Games';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import openSocket from 'socket.io-client';
import "./styles.css"

let socket = openSocket();

const IMAGES = {
    preview1, preview2, preview3
};

const sample_created_games = [
    {
        game_name: 'Easy Game',
        creater: {name: 'user1'},
        preview_image: 'preview1',
        game_id: 0
    },
    {
        game_name: 'Strange Game',
        creater: {name: 'user2'},
        preview_image: 'preview2',
        game_id: 1
    },
    {
        game_name: 'Whatever Game',
        creater: {name: 'user2'},
        preview_image: 'preview3',
        game_id: 2
    }
];

function get_all_created_games(usr_num) {
    return new Promise(function (resolve, reject) {
        resolve({games: JSON.parse(JSON.stringify(sample_created_games))});
    })
}

function PreviewCard(props) {
    return (<Card>
        <CardHeader
            title={`${props.preview.game_name}`}
            subheader={`By ${props.preview.creater}`}
        />
        <CardContent
        >
            <img src={props.preview.preview_image} height='100vh' width='100vh'></img>
        </CardContent>

        <CardActions disableSpacing>
            <IconButton aria-label="Create Room" onClick={function(){props.on_create_room(props.preview)}}>
                <Add/> Create Room
            </IconButton>
        </CardActions>
        { props.isAdmin 
                    ? <DeleteRoom on_delete_room={props.on_delete_room} gid={props.preview._id}/>
                    : null
        }

    </Card>)
}

const DeleteRoom = (props) => {
    return (
        <div >
        <CardActions disableSpacing>
            <IconButton aria-label="Delete Room" onClick={function(){props.on_delete_room(props.gid)}}>
                <Add/> Delete Room
            </IconButton>
        </CardActions>
        </div>
    )
}

function LayoutList(props) {
    return (
        <Grid container spacing={24}>
            {props.game_previews.map(function (preview) {
                return (
                    <Grid md={3}>
                        <PreviewCard preview={preview} on_create_room={props.on_create_room} isAdmin={props.isAdmin} on_delete_room={props.on_delete_room}/>
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
            usr_nm: "anc",
            current_on: ALL_GAMES,
            game_list: [],
            display_game: [],
            entering_room_code: '',
            isAdmin: false,
        };
        this.fetch_all_games();
    }

    onInfoo(){
        fetch("/getInfo", {
            method: 'GET',
            redirect: 'follow',
            credentials: 'include',
            headers: {
                'Accept': 'application/json , text/plain',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": '*'
            }
        }).then(res => res.json())
        .then(res => {this.setState({usr_nm: res.nickname, isAdmin: res.isAdmin})
    });
    }

    onDeleteRoom(game_id){
        const url = '/users/deleteGame';

        // The data we are going to send in our request
        let data = {
            gid: game_id
        }
        // Create our request constructor with all the parameters we need
        const request = new Request(url, {
            method: 'DELETE', 
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
        });

        // Send the request with fetch()
        fetch(request)
        .then(function(res) {
            // Handle response we get from the API.
            if (res.status == 500 || res.status == 404) {
                // If student was added successfully, tell the user.
                alert(res.status)
            } else {
                alert('Deletion Succeeed')
                window.location.reload(false);
            }  // log the result in the console for development purposes,
                            //  users are not expected to see this.
        }).catch((error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.onInfoo();
        console.log(this.state.game_list)
    }

    fetch_all_games() {
        fetch("/allGames", {
            method: 'GET',
            redirect: 'follow',
            credentials: 'include',
            headers: {
                'Accept': 'application/json , text/plain',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": '*'
            }
        }).then(res => res.json())
        .then(res => this.setState({...this.state, game_list: res, display_game: res}));
    }

    on_create_room(game_preview){
        socket.emit('createGame', {name: this.state.usr_nm})
        socket.on('newGame', (data) => {
            window.location.href = `/gameroom?id=3&code=${data.room}`
        });
    }

    on_enter_room(){
        socket.emit('joinGame', {name: this.state.usr_nm, room: this.state.entering_room_code})
        window.location.href = `/gameroom?id=3&code=${this.state.entering_room_code}`
    }

    on_input_room_code(e){
        let v = e.target.value;
        if(v.length > 4){
            v = v.substring(0, 4);
        }
        this.setState({...this.state, entering_room_code: v});
    }

    on_quit(e){
        window.location.href = '/profile?username=user'
    }
    render() {
        return (
            <div id="background">
                <IconButton onClick={this.on_quit.bind(this)}> <ExitToAppIcon/></IconButton>
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
                                                            on_create_room={this.on_create_room.bind(this)}
                                                            isAdmin={this.state.isAdmin}
                                                            on_delete_room={this.onDeleteRoom.bind(this)}/>}

                <div id="a">
                    <InputLabel style={{marginRight: '10px'}}><strong>Enter a room code to enter an existing room: </strong></InputLabel>
                    <Input placeholder='enter 4-digit code...' value={this.state.entering_room_code} onChange={this.on_input_room_code.bind(this)}/>
                </div>
                <br/>
                <div id="b">
                    <IconButton onClick={this.on_enter_room.bind(this)}
                                disabled={this.state.entering_room_code.length < 1}><GamesIcon/> <strong>Play</strong></IconButton>
                </div>
            </div>
        )
    }

}
