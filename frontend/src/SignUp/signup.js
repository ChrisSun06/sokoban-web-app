import React from 'react'
import {Link} from 'react-router-dom'
// import LoginView from './log_view.js'
import Container from '@material-ui/core/Container'
import "./signup.css"

export class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                username: '',
                password: '',
                confirm_password: ''
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

    checkPassword(e) {
        if (this.state.inputs.username === '') {
            alert('username can not be empty')
        } else if (this.state.inputs.password !== this.state.inputs.confirm_password) {
            alert('password does not match')
        } else {
            // window.location.href = `/profile?username=${this.state.inputs.usr_nm}`
            window.location.href = '/'
        }
    }

    jump(e) {
        window.location.href = '/'
    }

    render() {
        return (
            <body id='l_back'>
            <div id="rec">
                <Container maxWidth="xs">
                    <span> </span><br/>
                    <h1 id = "l_h1">Sign Up</h1>
                    <p className = "l_p1"><input className="signup" type="text"
                                                                       placeholder="Username"
                                                                       value={this.state.inputs.username}
                                                                       onChange={this.onInput('username')}/></p>
                    <p className = "l_p1"><input className="signup" type="password"
                                                                       placeholder="Password"
                                                                       value={this.state.inputs.password}
                                                                       onChange={this.onInput('password')}/></p>
                    <p className = "l_p1"><input className="signup" type="password"
                                                                       placeholder="Confirm Password"
                                                                       value={this.state.inputs.confirm_password}
                                                                       onChange={this.onInput('confirm_password')}/></p>
                    <button  id = "bbb"
                            onClick={this.checkPassword.bind(this)}><h2>Sign up</h2></button>
                    <br/>
                    <span> </span><br/>
                </Container>
            </div>
            <div>
                <Container maxWidth="xs">
                    <p  id = "h2"><strong>Already have an account?</strong>
                        <button className = "b2" id="login_button" onClick={this.jump.bind(this)}>Log in
                        </button>
                    </p>
                </Container>
            </div>
            </body>
        )
    }
}

export default SignUp
