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

    // A function to send a POST request with a new student.
    addUser() {
    // the URL for the request
        const url = 'http://localhost:5000/users';

        // The data we are going to send in our request
        let data = {
            email: this.state.inputs.username,
            password: this.state.inputs.password
        }
        // Create our request constructor with all the parameters we need
        const request = new Request(url, {
            method: 'post', 
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
            // Usually check the error codes to see what happened.
            if (res.status == 400) {
                // If student was added successfully, tell the user.
                alert('Signup Failed')
            
            } else {
                console.log('Added student')
                alert('Signup Succeeed')
                console.log(request.session.id)
        
            }
            console.log(res)  // log the result in the console for development purposes,
                            //  users are not expected to see this.
        }).catch((error) => {
            console.log(error)
        })
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
                            onClick={this.addUser.bind(this)}><h2>Sign up</h2></button>
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
