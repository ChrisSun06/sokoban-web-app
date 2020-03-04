import React from "react";
import AppBar from '@material-ui/core/AppBar'

import {Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import "./styles.css"


const SimpleHeader = (props) => {

    const {title, logo, money} = props;

    return (
        <div className="root">
            <AppBar position="relative" id="appbar">
                <Toolbar>
                    <img
                        className="logo"
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
};

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const {title, logo, money} = this.props;

        return (
            <div>
                <SimpleHeader title={title} logo={logo} money={money}/>
            </div>
        );
    }
}


export default Header;
