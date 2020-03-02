import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import PopUp from "./PopUp";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
        flexGrow: 1,
        alignItems: 'center',
        alignSelf: 'center',
    },
    list_container: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    subside_btn: {
        margin: 10,
    },
    list_elements: {
        alignItems: 'center',
        alignSelf: 'center',
    }
});

class UserList extends React.Component {
    state = {
        seen: false
    };
    state = {dense: false, seconday: false};

    togglePop = (event) => {
        this.setState({
            seen: !this.state.seen
        });
        alert(event.target.dataset.id)
    };

    render() {
        const {classes, user_data} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" className={classes.title}>
                            Users
                        </Typography>
                        <div className={classes.list_container}>
                            <List dense={this.state.dense} className={classes.list_elements}>
                                {user_data.map(user => (
                                    <ListItem id={user.name} onClick={this.togglePop.bind(this)}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Avatar src={user.pic}/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={user.name}
                                            secondary={this.state.secondary ? 'Secondary text' : null}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete" className={classes.subside_btn}>
                                                <DeleteIcon/>
                                            </IconButton>
                                            <Button variant="contained" color="primary" className={classes.subside_btn}>
                                                Change Password
                                            </Button>
                                            <Button variant="contained" color="primary" className={classes.subside_btn}>
                                                Change Tokens
                                            </Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(UserList);



