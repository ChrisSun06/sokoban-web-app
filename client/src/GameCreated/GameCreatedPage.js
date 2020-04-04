import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import preview1 from "../GameLobby/sokobanpreview1.png";
import preview2 from "../GameLobby/sokobanpreview2.jpeg";
import preview3 from "../GameLobby/sokobanpreview3.jpeg";
import { CardActionArea } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';

import "./styles.css"

const IMAGES = {
    preview1, preview2, preview3
};

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

function PreviewCard(props) {
    // alert(IMAGES[props.preview.preview_image])
    const on_edit_this_card = function(){
        props.on_edit(props.preview._id);
    }
    const on_del_this_card = function(){
        props.on_del(props.preview._id);
    }
    return (<Card>
        <CardHeader
            title={`${props.preview.game_name}`}
            subheader={`By ${props.preview.nickname}`}
        />
        <CardContent
        >
            <img src={props.preview.preview_image} height='100vh' width='100vh'></img>
        </CardContent>
        <CardActionArea>
                <IconButton aria-label="Edit" onClick={on_edit_this_card}>
                    <EditIcon/> Edit Game
                </IconButton>
                <IconButton aria-label="Edit" onClick={on_del_this_card}>
                    <DeleteIcon/> Edit Game
                </IconButton>
        </CardActionArea>
    </Card>)
}

function LayoutList(props) {
    return (
        <Grid container spacing={24}>
            {props.player_preview.map(function (preview) {
                return (
                    <Grid md={3}>
                        <PreviewCard preview={preview}
                                     on_del={props.on_del}
                                     on_edit={props.on_edit}/>
                    </Grid>)
            })}
        </Grid>)
}

class GameCreatedPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            games: [
                {
                    game_name: 'Easy Game',
                    nickname: {name: 'user1'},
                    preview_image: 'preview1',
                    game_id: 0
                },
                {
                    game_name: 'Strange Game',
                    nickname: {name: 'user2'},
                    preview_image: 'preview2',
                    game_id: 1
                },
                {
                    game_name: 'Whatever Game',
                    nickname: {name: 'user2'},
                    preview_image: 'preview3',
                    game_id: 2
                }
            ],
            anchorEl: false
        };
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.fetch_all_games();
    }

    fetch_all_games() {
        fetch("games", {
            method: 'GET',
            redirect: 'follow',
            credentials: 'include',
            headers: {
                'Accept': 'application/json , text/plain',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": '*'
            }
        }).then(res => res.json())
        .then(res => this.setState({...this.state, games: res}));
    }

    on_del_game(id){
        const url = '/users/deleteGame';

        // The data we are going to send in our request
        let data = {
            gid: id
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
                alert('Deletion Succeed')
                window.location.reload(false);
            }  // log the result in the console for development purposes,
                            //  users are not expected to see this.
        }).catch((error) => {
            console.log(error)
        })
    }

    on_edit_game(id){
        let data = {
            game_id: id
        }
        fetch('/users/postGame', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
            'Accept': 'application/json , text/plain',
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": '*'
            }
          })
          .then(res => {
            if (res.status === 200) {
                window.location.href = '/gameedit?status=edit'
            } else {
                const error = new Error(res.error);
                throw error;
            }
          })
          .catch(err => {
                console.error(err);
                alert('Error connecting to server, please try again');
          });
    }

    on_create_new(){
        window.location.href = '/gameedit?status=new'
    }

    jump1(e){
        window.location.href='/lobby'
    }

    jump2(e){
        window.location.href='/shop'
    }

    handleClick = (event) => {
        this.setState({anchorEl: true});
    };
    
    handleClose = () => {
        this.setState({anchorEl: false});
    };


    on_quit(e){
        window.location.href = '/profile?username=user'
    }

    render() {
        return (
            <div id="background">
                <IconButton onClick={this.handleClick}><MenuIcon/></IconButton>
                <div className = "b2">
                <StyledMenu
                            id="customized-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                        >
                            <StyledMenuItem onClick={this.on_quit.bind(this)}>
                            <ListItemIcon>
                                <MeetingRoomIcon fontSize="small" onClick={this.on_quit.bind(this)}/>
                            </ListItemIcon>
                            <ListItemText primary="Go To Dashboard" />
                            </StyledMenuItem>
                            <StyledMenuItem onClick={this.jump1.bind(this)}>
                            <ListItemIcon>
                                <MeetingRoomIcon fontSize="small" onClick={this.jump1.bind(this)} />
                            </ListItemIcon>
                            <ListItemText primary="Go To Lobby" />
                            </StyledMenuItem>
                            <StyledMenuItem onClick={this.jump2.bind(this)}>
                            <ListItemIcon>
                                <ShoppingCartIcon fontSize="small" onClick={this.jump2.bind(this)}/>
                            </ListItemIcon>
                            <ListItemText primary="Go to Shop" />
                            </StyledMenuItem>
                        </StyledMenu>
                        </div>
                <IconButton aria-label="Create" onClick={this.on_create_new.bind(this)}>
                    <Add/> Create Game
                </IconButton>
                <LayoutList player_preview={this.state.games}
                            on_del = {this.on_del_game.bind(this)}
                            on_edit = {this.on_edit_game.bind(this)}/>
            </div>
        )
    }

}
export default GameCreatedPage
