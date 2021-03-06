// Everything here was previously in the App component.
import React from "react";
import pic from "./bag.png"
import IconButton from '@material-ui/core/IconButton'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';

import "./styles.css";


// Importing components
import Header from "./../Header";
import SimpleTabs from "./../NavBar"

//Dummy datas for products
const productData = [

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 1a",
        price: "100"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 1b",
        price: "100"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 1c",
        price: "100"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 1d",
        price: "100"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 1e",
        price: "100"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 1f",
        price: "100"
    }
];

const productData2 = [

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 2a",
        price: "100"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 2b",
        price: "100"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 2c",
        price: "100"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 2d",
        price: "100"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 2e",
        price: "100"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 2f",
        price: "100"
    }
];

const productData3 = [

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 3a",
        price: "100"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 3b",
        price: "100"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 3c",
        price: "100"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 3d",
        price: "100"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 3e",
        price: "100"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 3f",
        price: "100"
    }
];

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


class Shop extends React.Component {
    constructor(props){
        super(props)
        this.handlePurchase = this.handlePurchase.bind(this)
        this.state = {
            productData: productData.map(function(elem) {
              return {
                img: elem.img,
                title: elem.title,
                price: elem.price
              }
            }),
            productData2: productData2.map(function(elem) {
                return {
                    img: elem.img,
                    title: elem.title,
                    price: elem.price
                }
            }),
            productData3: productData3.map(function(elem) {
                return {
                    img: elem.img,
                    title: elem.title,
                    price: elem.price
                }
            }),
            money: 4500,
            anchorEl: false
          }
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    jump1(e){
        window.location.href='/gamecreated'
    }

    jump2(e){
        window.location.href='/lobby'
    }

    handleClick = (event) => {
        this.setState({anchorEl: true});
    };
    
    handleClose = () => {
        this.setState({anchorEl: false});
    };


    //Server call that manipulate datas
    handlePurchase(index, title){
        if(title === "Product 1"){
            let tmp = this.state.money - this.state.productData[index].price;
            if(tmp < 0){
                alert("Money is not enough!")
            } else {
                this.setState({
                    money: tmp
                });
            }
        } else if (title === "Product 2"){
            let tmp = this.state.money - this.state.productData2[index].price;
            if(tmp < 0){
                alert("Money is not enough!")
            } else {
                this.setState({
                    money: tmp
                });
            }
        } else {
            let tmp = this.state.money - this.state.productData3[index].price;
            if(tmp < 0){
                alert("Money is not enough!")
            } else {
                this.setState({
                    money: tmp
                });
            }
        }
    }


    on_quit(e){
        window.location.href = '/profile?username=user'
    }

    render() {
        return (
            <div id="main">
                <IconButton onClick={this.handleClick}><MenuIcon/></IconButton>
                <div className = "b2">
                <StyledMenu
                            id="customized-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                        >
                            <StyledMenuItem onClick={this.on_quit.bind(this)}>
                            <ListItemIcon>
                                <MeetingRoomIcon fontSize="small" onClick={this.on_quit.bind(this)}/>
                            </ListItemIcon>
                            <ListItemText primary="Go To Dashboard" />
                            </StyledMenuItem>
                            <StyledMenuItem onClick={this.jump1.bind(this)}>
                            <ListItemIcon>
                                <AddBoxIcon fontSize="small" onClick={this.jump1.bind(this)} />
                            </ListItemIcon>
                            <ListItemText primary="Create Game" />
                            </StyledMenuItem>
                            <StyledMenuItem onClick={this.jump2.bind(this)}>
                            <ListItemIcon>
                                <MeetingRoomIcon fontSize="small" onClick={this.jump2.bind(this)}/>
                            </ListItemIcon>
                            <ListItemText primary="Go To Lobby" />
                            </StyledMenuItem>
                        </StyledMenu>
                        </div>
                <div className="Shop">
                    <Header
                        title="Token Shop"
                        logo={pic}
                        money={this.state.money}
                    />
                </div>

                <div class="tabs">
                    <SimpleTabs handlePurchase={this.handlePurchase.bind(this)} productData={this.state.productData} productData2={this.state.productData2} productData3={this.state.productData3}/>
                </div>

            </div>
        );
    }
}

export default Shop;
