import React from 'react'
import {Link} from 'react-router-dom'
// import LoginView from './log_view.js'
import Container from '@material-ui/core/Container'
import "./signup.css"
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center" color="#C3CFC9">
        {'Copyright © '}
        <Link href="https://material-ui.com/" color="#C3CFC9">
          Hongyi Sun
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const styles = theme => ({
    paper: {
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: 1,
      backgroundColor: "#007bff",
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: 1,
    },
    submit: {
    //   margin: theme.spacing(3, 0, 2),
        marginTop: 3,
        marginBottom: 0,
        marginLeft: 2
    },
  });

export class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                username: '',
                password: '',
                confirm_password: '',
                nickname: ''
            }
        }
        this.addUser = this.addUser.bind(this)
    }

    // A function to send a POST request with a new student.
    addUser() {
    // the URL for the request
        const url = '/users';

        // The data we are going to send in our request
        let data = {
            email: this.state.inputs.username,
            password: this.state.inputs.password,
            nickname: this.state.inputs.nickname
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
            if (res.status == 400) {
                // If student was added successfully, tell the user.
                alert('Signup Failed')
            } else {
                alert('Signup Succeeed')
            }  // log the result in the console for development purposes,
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
            alert('username cannot be empty')
        } else if (this.state.inputs.password !== this.state.inputs.confirm_password) {
            alert('password does not match')
        } else if (this.state.inputs.nickname === ''){
            alert('nickname cannot be empty')
        } else {
            // window.location.href = `/profile?username=${this.state.inputs.usr_nm}`
            window.location.href = '/'
        }
    }

    jump(e) {
        window.location.href = '/'
    }

    render() {
        const { classes } = this.props;
        return (
            <body id='l_back'>
            {/* <div id="rec">
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
            </div> */}
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <PersonAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign Up
                </Typography>
                <form className={classes.form} noValidate onSubmit={this.addUser}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    color="#C3CFC9"
                    id="email"
                    label="Email Address"
                    name="email"
                    value={this.state.inputs.username}
                    onChange={this.onInput('username')}
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    color="#C3CFC9"
                    name="password"
                    label="Password"
                    type="password"
                    value={this.state.inputs.password}
                    onChange={this.onInput('password')}
                    id="password"
                    autoComplete="current-password"
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    color="#C3CFC9"
                    name="password"
                    label="Confirm Password"
                    type="password"
                    value={this.state.inputs.confirm_password}
                    onChange={this.onInput('confirm_password')}
                    id="password"
                    autoComplete="current-password"
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    color="#C3CFC9"
                    id="nickname"
                    label="Nickname"
                    name="nickname"
                    value={this.state.inputs.nickname}
                    onChange={this.onInput('nickname')}
                    autoComplete="nickname"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    fullWidth
                    color="#007bff"
                    variant="contained"
                    className={classes.submit}
                  >
                    Sign Up
                  </Button>
                  <Grid container>
                    <Grid item onClick={this.jump.bind(this)}>
                      <Link href='/login' variant="body2" color="#C3CFC9">
                        {"Already have an account? Log in."}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <Box mt={8} my={10}>
                <Copyright />
              </Box>
            </Container>
            </body>
        )
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles, { withTheme: true })(SignUp);
