import React from "react";
import AppBar from '@material-ui/core/AppBar'

import {Toolbar, Typography} from "@material-ui/core";

import "./styles.css"


const SimpleHeader = (props) => {

    const {title, logo} = props;
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
                    <Typography id="title" variant="h3">
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

        const {title, logo} = this.props;

        return (
            <div>
                <SimpleHeader title={title} logo={logo}/>
            </div>
        );
    }
}


export default Header;
