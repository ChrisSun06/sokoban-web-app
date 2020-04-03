import React from 'react'
import { Link } from 'react-router-dom'
// import LoginView from './log_view.js'
import Container from '@material-ui/core/Container'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import IconButton from "@material-ui/core/IconButton";
import profile from './profile.png'
import g1 from './g1.png'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';

// import IconButton from '@material-ui/core/IconButton';
//import b from './b.jpg'
//<a href="http://www.freepik.com">Designed by katemangostar / Freepik</a>

import "./profile.css"

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


export class Profile extends React.Component{

    constructor(props) {
        super(props)
        this.toggleClass1 = this.toggleClass1.bind(this)
        this.toggleClass2 = this.toggleClass2.bind(this)
        this.toggleClass3 = this.toggleClass3.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onInfoo = this.onInfoo.bind(this)
        this.state = {
            // usr:{
            //     username:''
            // }
            usr: require('query-string').parse(window.location.search).username,
            active1: false,
            active2: false,
            active3: false,
            anchorEl: false
        }
    }

    

    onInfoo(){
        fetch("users/getInfo", {
            method: 'GET',
            redirect: 'follow',
            credentials: 'include',
            headers: {
                'Accept': 'application/json , text/plain',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": '*'
            }
        }).then(res => res.text())
        .then(res => this.setState({usr: res}));
    }

    componentDidMount() {
        this.onInfoo();
    }

    // get_name(e){
    //     const queryString = require('query-string');
    //     return queryString.parse(window.location.search).username
    // }

    jump(e){
        window.location.href='/lobby'
    }

    jump1(e){
        window.location.href='/gamecreated'
    }

    jump2(e){
        window.location.href='/shop'
    }

    toggleClass1() {
        const currentState = this.state.active1
        this.setState({ active1: !currentState })
    }
    toggleClass2() {
        const currentState = this.state.active2
        this.setState({ active2: !currentState })
    }
    toggleClass3() {
        const currentState = this.state.active3
        this.setState({ active3: !currentState })
    }

    on_logout(e){
        window.location.href = '/'
    }

    handleClick = (event) => {
        this.setState({anchorEl: true});
    };
    
    handleClose = () => {
        this.setState({anchorEl: false});
    };

    render() {
        const {onlogoff} = this.props;
        let hiddenProperty1 = this.state.active1 ? "visible" : "hidden"
        let hiddenProperty2 = this.state.active2 ? "visible" : "hidden"
        let hiddenProperty3 = this.state.active3 ? "visible" : "hidden"
        let rightIconHiddenProperty = (this.state.active1 ? 'active' : null)
        return (
            <div id='l_back'>
            <IconButton onClick={this.handleClick}><MenuIcon/></IconButton>
            {!!this.state.usr &&
                <div>
                    <img id = "im1" class='imgside' src={profile}/>
                    <h2 id = "h1">{this.state.usr}</h2><br/>
                    <div className = "b2">
                        <StyledMenu
                            id="customized-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                        >
                            <StyledMenuItem onClick={this.jump.bind(this)}>
                            <ListItemIcon>
                                <MeetingRoomIcon fontSize="small" onClick={this.jump.bind(this)}/>
                            </ListItemIcon>
                            <ListItemText primary="Go To Lobby" />
                            </StyledMenuItem>
                            <StyledMenuItem onClick={this.jump1.bind(this)}>
                            <ListItemIcon>
                                <AddBoxIcon fontSize="small" onClick={this.jump1.bind(this)} />
                            </ListItemIcon>
                            <ListItemText primary="Create Game" />
                            </StyledMenuItem>
                            <StyledMenuItem onClick={this.jump2.bind(this)}>
                            <ListItemIcon>
                                <ShoppingCartIcon fontSize="small" onClick={this.jump2.bind(this)}/>
                            </ListItemIcon>
                            <ListItemText primary="Go to Shop" />
                            </StyledMenuItem>
                            <StyledMenuItem onClick={() => this.props.onLogOff()}>
                            <ListItemIcon>
                                <ExitToAppIcon fontSize="small" onClick={() => this.props.onLogOff()}/>
                            </ListItemIcon>
                            <ListItemText primary="Log Out" />
                            </StyledMenuItem>
                        </StyledMenu>
                    </div>


                    <div className = "d1">
                        <IconButton>
                            {this.state.active1 ? <KeyboardArrowDownIcon onClick={this.toggleClass1}/> : <ChevronRightIcon onClick={this.toggleClass1}/>}
                        </IconButton>
                    <span className = "big">Account Information</span></div>
                        <div className = "small" id = {hiddenProperty1}> Personal information</div>
                        <div className = "tiny" id = {hiddenProperty1}>Name: {this.state.usr}</div>
                        <div className = "tiny" id = {hiddenProperty1}>Age: 20</div>
                        <div className = "tiny" id = {hiddenProperty1}>VIP level: 0</div>
                        {/* <div className = "small1" style={hiddenProperty1}><button style={{marginLeft: 10}} id="login_button">Change password</button></div> */}

                        <IconButton id = "I1">
                            {this.state.active2 ? <KeyboardArrowDownIcon onClick={this.toggleClass2}/> : <ChevronRightIcon onClick={this.toggleClass2}/>}
                        </IconButton>
                    <span className = "big">Game History</span>
                        <div className = "small" id={hiddenProperty2}>Game: 1,  Score: 10</div>

                        <IconButton id = "I1">
                            {this.state.active3 ? <KeyboardArrowDownIcon onClick={this.toggleClass3}/> : <ChevronRightIcon onClick={this.toggleClass3}/>}
                        </IconButton>
                    <span className = "big">Games Created</span>
                        <div className = "small" id={hiddenProperty3}><img id = "im2" class='imgside' src={g1}/></div>
                </div>
            }
            {!this.state.usr &&
                <p>No User Loaded</p>
            }
            </div>


        )
    }
}

export default Profile
