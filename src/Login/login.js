import React from 'react'
import {Link} from 'react-router-dom'
// import LoginView from './log_view.js'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import axios from 'axios'
import {borders} from '@material-ui/system'
import {authenticate_admin} from '../hardCodedData'
import "./login.css"
export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                usr_nm: '',
                passwrd: '',
                authenticated: false
            }
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onLogin(this.state.inputs.usr_nm, this.state.inputs.passwrd)
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


    jump(e) {
        window.location.href = '/signup'
    }

    render() {
        return (
            <div id="background">
            <body id='l_back'>
            <div id="l_rec">
                {/* <Container maxWidth="xs">
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
                            onClick={() => this.onLogin("a")}><h2>Log in</h2></button>
                    <br/>
                    <span> </span><br/>
                </Container> */}
                <form onSubmit={this.onSubmit}>
                    <h1>Login Below!</h1>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={this.state.inputs.usr_nm}
                        onChange={this.onInput('usr_nm')}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={this.state.inputs.passwrd}
                        onChange={this.onInput('passwrd')}
                        required
                    />
                    <input type="submit" value="Submit"/>
                </form>
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

