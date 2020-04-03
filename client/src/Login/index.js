import React from 'react'
import {Link} from 'react-router-dom'
// import LoginView from './log_view.js'
import Container from '@material-ui/core/Container'
import "./login.css"
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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { bottom } from '@material-ui/system';
import Typography from '@material-ui/core/Typography';

// Source: One of the sign-in templates by https://material-ui.com/getting-started/templates/sign-in/.
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
        marginTop: 3,
        marginBottom: 0,
        marginLeft: 2
    },
  });

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                usr_nm: '',
                passwrd: '',
                authenticated: false,
            },
            remember_me: false
        }
        this.onRemember = this.onRemember.bind(this)
        this.onLoad = this.onLoad.bind(this)
    }

    componentDidMount() {
        this.onLoad()
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onLogin(this.state.inputs.usr_nm, this.state.inputs.passwrd, this.state.remember_me)
    }

    onRemember = () => {
        if (this.state.remember_me === true){
            this.setState({ remember_me: false })
        } else {
            this.setState({ remember_me: true })
        }
    }

    onLoad = () => {
        const url = "/users/getInfoEmail";
        fetch(url)
        .then(res => res.json())
        .then(res => {
            if(res){
                this.setState({
                    inputs: {usr_nm: res.email, passwrd: res.password}
                })
            }
        })
        .catch(error => {
            console.log(error);
        });
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
        const { classes } = this.props;
        return (
            <div id="background">
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={this.onSubmit}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    color="#C3CFC9"
                    id="email"
                    label="Email Address"
                    name="email"
                    value={this.state.inputs.usr_nm}
                    onChange={this.onInput('usr_nm')}
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
                    value={this.state.inputs.passwrd}
                    onChange={this.onInput('passwrd')}
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="#000000" onChange={this.onRemember} />}
                    color="#C3CFC9"
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    color="#007bff"
                    variant="contained"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item onClick={this.jump.bind(this)}>
                      <Link href='/signup' variant="body2" color="#C3CFC9">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <Box mt={8} my={10}>
                <Copyright />
              </Box>
            </Container>
            </div>
          );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles, { withTheme: true })(Login);

