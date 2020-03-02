import React from 'react'
import {Link} from 'react-router-dom'
// import LoginView from './log_view.js'
import Container from '@material-ui/core/Container'
import profile from './profile.png'
import {} from '../hardCodedData'

export class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // usr:{
            //     username:''
            // }
            usr: require('query-string').parse(window.location.search).username
        }

    }

    // get_name(e){
    //     const queryString = require('query-string');
    //     return queryString.parse(window.location.search).username
    // }


    render() {
        return (
            <div>
                {!!this.state.usr &&
                <div>
                    <img style={{display: "inline-block", marginLeft: 50, marginTop: 60}} class='imgside' src={profile}
                         height='130px'/>
                    <h2 style={{display: "inline-block", marginLeft: 100}}>{this.state.usr}</h2> <br/>
                    <p style={{display: "inline-block", marginLeft: 30}}><strong>Account Information: </strong></p>
                    <p style={{display: "inline-block", marginLeft: 100}}>{this.state.usr}</p>
                    <p style={{marginLeft: 50, padding: 10}}><strong>Personal information </strong></p>
                    <p style={{marginLeft: 50, padding: 10}}><strong>Change password</strong></p>
                    <p style={{marginLeft: 30, padding: 10}}><strong>Game History:</strong></p>
                    <p style={{marginLeft: 50, padding: 10}}><strong>Game: 1, Score: 10</strong></p>
                    <p style={{marginLeft: 30, padding: 10}}><strong>Settings:</strong></p>
                    <p style={{marginLeft: 30, padding: 10}}><strong>Games Created</strong></p>
                </div>}
                {
                    !this.state.usr &&
                    <p>No User Loaded</p>
                }
            </div>
        )
    }
}

export default Profile
