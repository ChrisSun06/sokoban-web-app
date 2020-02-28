import React from "react";
import AppBar from '@material-ui/core/AppBar'

import { Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  logo: {
    width: 45,
    height: 45
  },
  appbar: {
    alignItems: 'center',
  }
});

const SimpleHeader = (props) => {

  const classes = useStyles();
  const { title, logo } = props;

  return (
    <div className={classes.root}>
      <AppBar style={{ background: '#fafafa'}} position="relative" className={classes.appbar}>
        <Toolbar>
          <img
            className={classes.logo}
            src={
              logo
            }
          />
        <Typography style={{color: '#212121'}} variant="h3">
          {title}
        </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

class Header extends React.Component{
  constructor(props){
    super(props)
  }

  render() {

    const { title, logo } = this.props;

    return (
      <div>
        <SimpleHeader title={title} logo={logo}/>
      </div>
    );
  }
}


export default Header;
