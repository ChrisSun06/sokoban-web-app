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
import ImageForm from "./ImageForm"
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PublishIcon from '@material-ui/icons/Publish';

  
  const styles = theme => ({
    root: {
      '& > *': {
        marginTop:8,
      },
    },
    input:{
      marginTop: 20
    },
    paper: {
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    profilepic: {
      direction:"column",
      justify:"center"
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
            },
            image_id: undefined,
            image_url: "./../Profile/profile.png" 
        }
        this.addUser = this.addUser.bind(this)
        this.addImage = this.addImage.bind(this)
    }

    addImage (form){
      // the URL for the request
      const url = "/images";
  
      // The data we are going to send in our request
      const imageData = new FormData(form);
  
      // Create our request constructor with all the parameters we need
      const request = new Request(url, {
          method: "post",
          body: imageData,
      });
  
      // Send the request with fetch()
      fetch(request)
          .then(res => res.json())
          .then(res => {
              // Handle response we get from the API.
              // Usually check the error codes to see what happened.
                  // If image was added successfully, tell the user.
                this.setState({
                    image_id: res.image_id,
                    image_url: res.image_url
                });
                alert("Image upload succeed")
          })
          .catch(error => {
              console.log(error);
          });
    };

    // A function to send a POST request with a new student.
    addUser() {
    // the URL for the request
        const url = '/users';
        let ret = this.checkPassword();
        if (ret === -1){
          return;
        }

        // The data we are going to send in our request
        let data = {
            email: this.state.inputs.username,
            password: this.state.inputs.password,
            nickname: this.state.inputs.nickname,
            avatar: this.state.image_url
        }
        // Create our request constructor with all the parameters we need
        const request = new Request(url, {
            method: "post", 
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            }
        });

        // Send the request with fetch()
        fetch(request)
        .then(function(res) {

          // Handle response we get from the API.
          // Usually check the error codes to see what happened.
          if (res.status == 400 || res.status == 404) {
              alert('Signup Failed')
          
          } else {
              alert('Signup Succeed')
          }
      }).catch((error) => {
          alert('Sigup Failed')
          console.log(error)
      })
        window.location.href = '/login'
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
            return -1
        } else if (this.state.inputs.password !== this.state.inputs.confirm_password) {
            alert('password does not match')
            return -1
        } else if (this.state.inputs.nickname === ''){
            alert('nickname cannot be empty')
            return -1
        } else if (this.state.image_url === undefined || this.state.image_url === "./../Profile/profile.png" ){
            alert('Please upload your profile picture')
            return -1
        }
    }

    jump(e) {
        window.location.href = '/'
    }

    render() {
        const { classes } = this.props;
        return (
            <body id='l_back'>
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
                  {/* <div className={classes.root}>
                  Upload Avatar:  
                  <form className="image-form" onSubmit={(e) => {
                    e.preventDefault();
                    this.addImage(e.target);
                }}>
                  <input type="file" id="file1" className={classes.input}  name="file1" />
                  <label htmlFor="icon-button-file">
                    <IconButton color="#C3CFC9" type="submit" aria-label="upload picture" component="span" justify="right">
                      <PublishIcon />
                    </IconButton>
                  </label>
                  </form>
                </div> */}
                </form>
                <ImageForm addImage={this.addImage}/>
                <Grid container>
                    <Grid item onClick={this.jump.bind(this)}>
                      <Link href='/login' variant="body2" color="#C3CFC9">
                        {"Already have an account? Log in."}
                      </Link>
                    </Grid>
                  </Grid>
              </div>
            </Container>
            </body>
        )
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles, { withTheme: true })(SignUp);
