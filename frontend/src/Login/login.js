import React from 'react'
import {Link} from 'react-router-dom'
// import LoginView from './log_view.js'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import {borders} from '@material-ui/system'
import {authenticate_user} from '../hardCodedData'
import {authenticate_admin} from '../hardCodedData'
import "./login.css"
export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                usr_nm: '',
                passwrd: ''
            }
        }
    }

    onInput(input_type) {
        return (function (e) {
            const v = e.target.value;
            // alert(Object.keys(e));
            this.setState({
                ...this.state,
                inputs: {...this.state.inputs, [input_type]: v}
            })
        }).bind(this);
    }

    onLogin(e) {
        // alert(JSON.stringify(this.state.inputs));
        authenticate_user({username: this.state.inputs.usr_nm, password: this.state.inputs.passwrd})
            .then(this.onAuthentication.bind(this))
    }

    onAuthentication(result) {
        if (result.admin) {
            window.location.href = `/admin`
            // window.location.href='/profile?' + this.state.inputs.usr_nm
        }
        else if (result.authenticated) {
            window.location.href = `/profile?username=${this.state.inputs.usr_nm}`
            // window.location.href='/profile?' + this.state.inputs.usr_nm
        } else {
            alert('fail')
        }
    }


    jump(e) {
        window.location.href = '/signup'
    }

    render() {
        return (
            <div id="background">
            <body id='l_back'>
            <div id="l_rec">
                <Container maxWidth="xs">
                    <span> </span><br/>
                    <h1 id = "l_h">Log in</h1>
                    <p className = "l_p1"><input className="login" type="text"
                                                                       placeholder="Username"
                                                                       value={this.state.inputs.usr_nm}
                                                                       onChange={this.onInput('usr_nm')}/></p>
                    <p className = "l_p1"><input className="login" type="password"
                                                                       placeholder="Password"
                                                                       value={this.state.inputs.passwrd}
                                                                       onChange={this.onInput('passwrd')}/></p>
                    <button id="bb"
                            onClick={this.onLogin.bind(this)}><h2>Log in</h2></button>
                    <br/>
                    <span> </span><br/>
                </Container>
            </div>
            <div>
                <Container maxWidth="xs">
                    <p id = "h2"><strong>Doesn't have an
                        account?</strong>
                        <button id = "bb2" onClick={this.jump.bind(this)}>Sign up
                        </button>
                    </p>
                </Container>
            </div>
            </body>
            </div>
        )
    }
}

export default Login
