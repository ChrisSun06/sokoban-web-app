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
// import IconButton from '@material-ui/core/IconButton';
//import b from './b.jpg'
//<a href="http://www.freepik.com">Designed by katemangostar / Freepik</a>

import {} from '../hardCodedData'
import "./profile.css"

export class Profile extends React.Component{

    constructor(props) {
        super(props)
        this.toggleClass1 = this.toggleClass1.bind(this)
        this.toggleClass2 = this.toggleClass2.bind(this)
        this.toggleClass3 = this.toggleClass3.bind(this)
        this.state = {
            // usr:{
            //     username:''
            // }
            usr: require('query-string').parse(window.location.search).username,
            active1: false,
            active2: false,
            active3: false
        }

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
    

    render() {
        let divStyle = {
            hidden: {
                visibility: "hidden",
                height: 0,
                opacity: 0
            },
            visible: {
                visibility: "visible",
                height: "auto",
                opacity: 1
            }
        }
        let hiddenProperty1 = this.state.active1 ? divStyle.visible : divStyle.hidden
        let hiddenProperty2 = this.state.active2 ? divStyle.visible : divStyle.hidden
        let hiddenProperty3 = this.state.active3 ? divStyle.visible : divStyle.hidden
        let rightIconHiddenProperty = (this.state.active1 ? 'active' : null)
        return (
            <div style={{backgroundImage: 'url(' + require('./d.jpg') + ')', backgroundSize: 'cover' , height: 900, width: "100%"}}>
            <IconButton onClick={this.on_logout.bind(this)}><ExitToAppIcon/></IconButton>
            {!!this.state.usr &&
                <div>
                    <img style = {{display: "inline-block", marginLeft: 50, marginTop: 60}} class='imgside' src={profile} height='130px'/>
                    <h2 style = {{display: "inline-block", marginLeft: 100}}>{this.state.usr}</h2><br/>
                    <button style={{display: "inline-block", marginLeft: 50}} id="signup_button" onClick={this.jump.bind(this)}><h2>Go to Lobby</h2></button>
                    <button style={{display: "inline-block", marginLeft: 50, marginTop: 30}} id="signup_button" onClick={this.jump1.bind(this)}><h2>Create Game</h2></button>
                    <button style={{display: "inline-block", marginLeft: 50}} id="signup_button" onClick={this.jump2.bind(this)}><h2>Go to Token Shop</h2></button><br/>

                    <div style = {{marginLeft:50, marginTop: 50}}>
                        <IconButton>
                            {this.state.active1 ? <KeyboardArrowDownIcon onClick={this.toggleClass1}/> : <ChevronRightIcon onClick={this.toggleClass1}/>}
                        </IconButton>
                    <span className = "big">Account Information</span></div>
                        <div className = "small" style={hiddenProperty1}>Personal information</div>
                        <div className = "tiny" style={hiddenProperty1}>Name: {this.state.usr}</div>
                        <div className = "tiny" style={hiddenProperty1}>Age: 20</div>
                        <div className = "tiny" style={hiddenProperty1}>VIP level: 0</div>
                        {/* <div className = "small1" style={hiddenProperty1}><button style={{marginLeft: 10}} id="login_button">Change password</button></div> */}

                        <IconButton style = {{marginLeft:50}}>
                            {this.state.active2 ? <KeyboardArrowDownIcon onClick={this.toggleClass2}/> : <ChevronRightIcon onClick={this.toggleClass2}/>}
                        </IconButton>
                    <span className = "big">Game History</span>
                        <div className = "small" style={hiddenProperty2}>Game: 1,  Score: 10</div>

                        <IconButton style = {{marginLeft:50}}>
                            {this.state.active3 ? <KeyboardArrowDownIcon onClick={this.toggleClass3}/> : <ChevronRightIcon onClick={this.toggleClass3}/>}
                        </IconButton>
                    <span className = "big">Games Created</span>
                        <div className = "small" style={hiddenProperty3}><img style = {{display: "inline-block"}} class='imgside' src={g1} height='130px'/></div>
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
