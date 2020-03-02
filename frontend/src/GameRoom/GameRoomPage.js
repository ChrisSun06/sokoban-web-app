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


function PreviewCard(props) {
    // alert(IMAGES[props.preview.preview_image])
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
            </Card>
        </div>)
}

function LayoutList(props) {
    return (
        <Grid container spacing={24}>
            {props.player_preview.map(function (preview) {
                return (
                    <Grid md={3}>
                        <PreviewCard preview={preview}/>
                    </Grid>)
            })}
        </Grid>)
}

class GameRoomPage extends React.Component {
    constructor(props) {
        super(props);
        
        const user_id = window.location.search.replace('?', '');

        this.state = {
            my_name: user_id.length > 0 ? `User ${user_id}`: 'User 2',
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

    render() {
        const centered_style = {display: 'flex',  
                                justifyContent:'center', 
                                alignItems:'center'};
        return (
            <div>
                <div style={{...centered_style, marginTop: '20vh'}}>
                    <Typography color='secondary' variant='h3'>{this.state.my_name}</Typography>
                </div>
                <div style={{...centered_style, height: '40vh', overflow: 'auto', marginTop: '5vh', marginLeft: '20vw'}}>
                    <LayoutList player_preview={this.state.players} />
                    
                </div>
                <div style={{...centered_style}}>
                    <IconButton aria-label="Start" disabled={!this.is_owner_of_room()} onClick={this.start_game.bind(this)}>
                        <GamesIcon/> Start
                    </IconButton>
                </div>
            </div>
        )
    }

}
export default GameRoomPage