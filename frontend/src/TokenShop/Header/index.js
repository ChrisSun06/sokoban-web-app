import React from "react";
import AppBar from '@material-ui/core/AppBar'

import { Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//import classes from "*.module.css";

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
  const { title, logo, money } = props;

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

    const { title, logo, money } = this.props;

    return (
      <div>
        <SimpleHeader title={title} logo={logo} money={money}/>
      </div>
    );
  }
}

// const Header = () => {
//   const classes = useStyles();

//   return (
//     <div>
//       <AppBar style={{ background: '#fafafa'}} position="fixed">
//         <Toolbar>
//           <img
//             className={classes.logo}
//             src={
//               logo
//             }
//           />
//         <Typography style={{color: '#212121'}} variant="h3">
//           Token Shop
//         </Typography>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

/* The Header Component */
// class Header extends React.Component {
//     const classes = useStyles();
//     const { title, logo, money } = this.props;

//     return (
//       <div>
//         <AppBar color="primary" position="static">
//           <Toolbar>
//             <img
//               className={classes.logo}
//               src={
//                 "./bag.png"
//               }
//               alt="Bag Logo"
//             />
//           <Typography variant="h3">
//             {title}
//           </Typography>
//           <Typography variant="h6">
//             <img src="./bag.png"/>
//           </Typography>
//           </Toolbar>
//         </AppBar>
//       </div>
//     );
// }

export default Header;
