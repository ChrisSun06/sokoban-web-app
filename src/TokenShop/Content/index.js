import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import "./styles.css"


const Contents = (props) => {

    const {title, productData} = props;

    const handleBuy = (index, title) => {
        props.handleBuy(index, title)
    }

    return (
        <div className="root">
            <GridList cellHeight='200' id="gridList" spacing={16}>
                <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
                    <ListSubheader component="div">{title}</ListSubheader>
                </GridListTile>
                {productData.map((tile, index) => (
                    <GridListTile key={tile.img}>
                        <img src={tile.img} alt={tile.title}/>
                        <GridListTileBar
                            title={tile.title}
                            subtitle={<span>cost: {tile.price}$</span>}
                            actionIcon={
                                <IconButton aria-label={`purchase ${tile.title}`} className="icon" onClick={() => handleBuy(index, title)}>
                                    <MonetizationOnIcon/>
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
};

export default Contents;
