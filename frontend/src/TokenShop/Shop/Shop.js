// Everything here was previously in the App component.
import React from "react";
import pic from "./bag.png"
import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


import "./styles.css";


// Importing components
import Header from "./../Header";
import SimpleTabs from "./../NavBar"

class Shop extends React.Component {
    on_quit(e){
        window.location.href = '/profile?username=user'
    }

    render() {
        return (
            <div id="main">
                <IconButton onClick={this.on_quit.bind(this)}> <ExitToAppIcon/></IconButton>
                <div className="Shop">
                    <Header
                        title="Token Shop"
                        logo={pic}
                        money="$4500"
                    />
                </div>

                <div class="tabs">
                    <SimpleTabs/>
                </div>

            </div>
        );
    }
}

export default Shop;
