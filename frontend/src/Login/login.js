import React from 'react'
import { Link } from 'react-router-dom'
// import LoginView from './log_view.js'
import Container from '@material-ui/core/Container'
import {authenticate_user} from '../hardCodedData'

export class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            inputs:{
                usr_nm: '',
                passwrd: ''
            }
        }
    }

    onInput(input_type){
        return (function(e){
            const v = e.target.value;
            // alert(Object.keys(e));
            this.setState({
                ...this.state,
                inputs: {...this.state.inputs, [input_type]: v}
            })
        }).bind(this);
    }

    onLogin(e){
        // alert(JSON.stringify(this.state.inputs));
        authenticate_user({username: this.state.inputs.usr_nm,password: this.state.inputs.passwrd})
            .then(this.onAuthentication.bind(this))
    }

    onAuthentication(result){
        if(result.authenticated){
            window.location.href=`/profile?username=${this.state.inputs.usr_nm}`
            // window.location.href='/profile?' + this.state.inputs.usr_nm
        }else{
            alert('fail')
        }
    }

    jump(e){
        window.location.href='/signup'
    }

    render() {
        return (
            <div>
                <Container maxWidth="xs">
                    <h1 style = {{marginLeft: 167, marginTop: 180}}>Log in</h1>
                    <p style = {{marginLeft: 130, marginTop: 30}}><input className = "login" type="text"placeholder="Username" value={this.state.inputs.usr_nm} onChange={this.onInput('usr_nm')}/></p>
                    <p style = {{marginLeft: 130, marginTop: 30}}><input className = "login" type="password" placeholder="Password" value={this.state.inputs.passwrd} onChange={this.onInput('passwrd')}/></p>
                    <button style = {{marginLeft: 176, marginTop: 45}} id = "login_button" onClick={this.onLogin.bind(this)}><h2>Log in</h2></button><br/>
                    <p style = {{marginLeft: 90, marginTop: 100}}>Doesn't have an account? <button id = "login_button" onClick={this.jump.bind(this)}>Sign up</button></p>
                </Container>
            </div>
        )
    }
}

export default Login
