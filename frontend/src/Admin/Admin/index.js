// Everything here was previously in the App component.
import React from "react";
import pic from "./admin.jpg"

// Importing components
import Header from "./../Header";
import UsersList from "./../UsersListHead"
import { withStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';

import "./styles.css"


class Admin extends React.Component {
  on_logout(e){
    window.location.href = '/'
  }

  render() {
    return (
      <div id="background">
        <div>
          <IconButton onClick={this.on_logout.bind(this)}><ExitToAppIcon/></IconButton>
          <Header
            title="Administrator"
            logo= {pic}
          />
        </div>

        <div className="root">
          <UsersList/>
        </div>

      </div>
    );
  }
}

export default Admin;
