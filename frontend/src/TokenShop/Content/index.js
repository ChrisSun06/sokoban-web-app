import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'auto',
    },
    gridList: {
        width: 600,
        height: '100%',
        overflow: 'auto',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

const Contents = (props) => {
    const classes = useStyles();

    const {title, productData} = props;

    return (
        <div className={classes.root}>
            <GridList cellHeight='200' className={classes.gridList} spacing={16}>
                <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
                    <ListSubheader component="div">{title}</ListSubheader>
                </GridListTile>
                {productData.map(tile => (
                    <GridListTile key={tile.img}>
                        <img src={tile.img} alt={tile.title}/>
                        <GridListTileBar
                            title={tile.title}
                            subtitle={<span>cost: {tile.price}$</span>}
                            actionIcon={
                                <IconButton aria-label={`purchase ${tile.title}`} className={classes.icon}>
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
