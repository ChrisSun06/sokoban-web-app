import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Add from "@material-ui/icons/Add";
import Typography from '@material-ui/core/Typography';
import GamesIcon from '@material-ui/icons/Games';
import parser from 'query-string'
import WaitingText from './WaitingText'
import { CardActionArea } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RemoveIcon from '@material-ui/icons/Remove';

import "./styles.css"


function PreviewCard(props) {
    // alert(IMAGES[props.preview.preview_image])
    const self_id = props.self_id;
    const as_owner = props.as_owner;
    const is_self =  self_id === props.preview.name;
    const on_del_button = function(){
        props.on_del(props.preview);
    }

    return (
        <div>
            <Card>
                <CardHeader
                    title={`${props.preview.name}${props.preview.is_owner?`: Room Owner`: ''}`}
                    subheader={`${props.preview.scores}`}
                />
                <CardContent
                >
                    <img src={`${props.preview.pic}`} height='100vh' width='100vh'></img>
                </CardContent>
                <CardActions>
                    {
                        is_self && (
                            <IconButton onClick={on_del_button} color='primary'>
                                <ExitToAppIcon/>
                                Quit
                            </IconButton>
                        )
                    }
                    {
                        !is_self && (
                            <IconButton disabled={!as_owner} onClick={on_del_button} color='primary'>
                                <RemoveIcon/>
                                Kick
                            </IconButton>
                        )
                    }
                </CardActions>
            </Card>
        </div>)
}

function LayoutList(props) {
    return (
        <Grid container spacing={24}>
            {props.player_preview.map(function (preview) {
                return (
                    <Grid md={3}>
                        <PreviewCard preview={preview} self_id={props.self_id}
                                    as_owner={props.as_owner}
                                    on_del={props.on_del_usr}/>
                    </Grid>)
            })}
        </Grid>)
}

class GameRoomPage extends React.Component {
    constructor(props) {
        super(props);

        // const user_id = window.location.search.replace('?', '');
        const args = parser.parse(window.location.search);
        const user_id = !!args.id?args.id: 2;
        const game_code = !!args.code?args.code: 'MNST';
        this.state = {
            my_name: `User ${user_id}`,
            game_code: game_code,
            players: [
                {
                    pic: "https://cdn6.f-cdn.com/contestentries/1524490/28503850/5d1169893fa8e_thumb900.jpg",
                    name: "User 1",
                    scores: "1000 scores",
                    is_owner: false
                },
                {
                    pic: "https://cdn6.f-cdn.com/contestentries/1524490/28503850/5d1169893fa8e_thumb900.jpg",
                    name: "User 2",
                    scores: "1000 scores",
                    is_owner: true
                },
                {
                    pic: "https://cdn6.f-cdn.com/contestentries/1524490/28503850/5d1169893fa8e_thumb900.jpg",
                    name: "User 3",
                    scores: "1000 scores",
                    is_owner: false
                },
                // {
                //     pic: "https://cdn6.f-cdn.com/contestentries/1524490/28503850/5d1169893fa8e_thumb900.jpg",
                //     name: "User 4",
                //     scores: "1000 scores"
                // },
                // {
                //     pic: "https://cdn6.f-cdn.com/contestentries/1524490/28503850/5d1169893fa8e_thumb900.jpg",
                //     name: "User 5",
                //     scores: "1000 scores"
                // },
                // {
                //     pic: "https://cdn6.f-cdn.com/contestentries/1524490/28503850/5d1169893fa8e_thumb900.jpg",
                //     name: "User 6",
                //     scores: "1000 scores"
                // }
            ]
        };
    }

    start_game(){
        window.location.href='/gameplay?0'
    }

    is_owner_of_room(){
        return this.state.players.filter(function(itm){return itm.is_owner})
                                 .map(function(itm){return itm.name})
                                 .includes(this.state.my_name);
    }

    on_del_user(usr_del){
        const usr_del_nm = usr_del.name;
        const is_self = usr_del_nm === this.state.my_name;
        if(is_self || this.is_owner_of_room()){
            this.setState({...this.state,
                         players: this.state.players.filter(function(plyr){
                            return plyr.name !== usr_del_nm;
                         })},
                         (function(){
                            if(is_self){
                                window.location.href = '/lobby'
                            }
                         }));
        }

    }

    render() {
        const centered_style = {display: 'flex',
                                justifyContent:'center',
                                alignItems:'center'};

        const as_owner = this.is_owner_of_room()
        return (
            <div style={{backgroundImage: 'url(' + require('./b.jpg') + ')', backgroundSize: 'cover' , height: 1900, width: "100%", overflow: "auto"}}>
                <div class="a">
                    <Typography color='textSecondary' variant='caption' class="subtitle">
                        {`Invite your friend to join with this code: ${this.state.game_code.toUpperCase()} !`}
                    </Typography>
                </div>
                <div class="b">
                    <Typography color='secondary' variant='h3'>{this.state.my_name}</Typography>
                </div>
                <div  class="c">
                    <LayoutList player_preview={this.state.players}
                                self_id={this.state.my_name}
                                as_owner={as_owner}
                                on_del_usr={this.on_del_user.bind(this)}/>

                </div>
                {
                    as_owner &&
                    (
                        <div class="d">
                            <IconButton aria-label="Start" onClick={this.start_game.bind(this)}>
                                <GamesIcon/> Start
                            </IconButton>
                        </div>
                    )
                }

                {
                    !as_owner &&
                    (
                        <div class="d">
                            <WaitingText color='red' msg='Waiting the owner to start game'></WaitingText>
                        </div>
                    )
                }

            </div>
        )
    }

}
export default GameRoomPage
