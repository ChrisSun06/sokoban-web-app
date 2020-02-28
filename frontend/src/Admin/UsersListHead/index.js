import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Button from '@material-ui/core/Button';
import UserListContent from './../UsersList';
import dummy_users from './dummy-users'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: "inline-block",
    alignItems: 'center',
    alignSelf: 'center',
    width: 240,
    margin: 10,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  add_to_all: {
    padding: 10,
    display: "inline-block",
    margin: 10,
  },
  remove_all: {
    padding: 10,
    display: "inline-block",
    margin: 10,
  },
  main: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  user_contents: {
      alignItems: 'Center',
  }
}));

export default function UsersList() {
  const classes = useStyles();

  return (
    <div className={classes.main} align='center'>
        <Paper component="form" className={classes.root} position="relative">
            <InputBase
                className={classes.input}
                placeholder="Search People"
                inputProps={{ 'aria-label': 'Search People' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
        <Button variant="contained" className={classes.add_to_all}>Add Token To All</Button>
        <Button variant="contained" className={classes.remove_all}>Remove All</Button>
        <div className={classes.user_contents} align='center'>
            <UserListContent user_data={dummy_users}/>
        </div>
    </div>
  );
}