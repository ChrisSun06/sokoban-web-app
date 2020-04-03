// Everything here was previously in the App component.
import React from "react";
import pic from "./admin.jpg"

// Importing components
import Header from "./../Header";
import UsersList from "./../UsersListHead"
import { withStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

import "./styles.css"
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.onLogOff = this.onLogOff.bind(this)
    this.state = {
        anchorEl: false
    }
}
onLogOff(){
  const url = "/logoff";
  fetch(url)
  .then(res => {
      window.location.href = '/'
  })
  .catch(error => {
      console.log(error);
  });
}

  on_logout(e){
    window.location.href = '/'
  }

  handleClick = (event) => {
    this.setState({anchorEl: true});
  };

  handleClose = () => {
    this.setState({anchorEl: false});
  };

  render() {
    return (
      <div id="background">
        <div>
        <IconButton onClick={this.handleClick}><MenuIcon/></IconButton>
          <Header
            title="Administrator"
            logo= {pic}
          />
        </div>

        <div className="root">
          <UsersList/>
        </div>
        <StyledMenu
        id="customized-menu"
        anchorEl={this.state.anchorEl}
        keepMounted
        open={Boolean(this.state.anchorEl)}
        onClose={this.handleClose}
        >
        <StyledMenuItem onClick={() => this.onLogOff()}>
        <ListItemIcon>
            <ExitToAppIcon fontSize="small" onClick={() => this.onLogOff()}/>
        </ListItemIcon>
        <ListItemText primary="Log Out" />
        </StyledMenuItem>
        </StyledMenu>
      </div>
    );
  }
}

export default Admin;
