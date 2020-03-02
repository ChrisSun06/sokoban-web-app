// Everything here was previously in the App component.
import React from "react";
import pic from "./admin.jpg"

// Importing components
import Header from "./../Header";
import UsersList from "./../UsersListHead"
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    alignSelf: 'center',
  },
});

class Admin extends React.Component {
  

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <Header
            title="Administrator"
            logo= {pic}
          />
        </div>

        <div className={classes.root}>
          <UsersList/>
        </div>

      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Admin);