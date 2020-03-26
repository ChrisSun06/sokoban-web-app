import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Contents from "./../Content";

import "./styles.css"
   


//This tab panel as well as the app bar is inspired by Material-UI's online guide at 'https://material-ui.com/components/app-bar/'
function TabPanel(props) {
    const {children, value, index} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default function SimpleTabs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleBuy = (index, title) => {
        props.handlePurchase(index, title);
    }

    return (
        <div className="root">
            <AppBar position="relative" id="appbar">
                <Tabs id="tab" value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Game Building Slots" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                    <Tab label="Badges" id="simple-tab-1" aria-controls="simple-tabpanel-1"/>
                    <Tab label="Player Icons" id="simple-tab-2" aria-controls="simple-tabpanel-2" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <div>
                    <Contents title="Product 1" productData={props.productData} handleBuy={handleBuy.bind(this)}/>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div>
                    <Contents title="Product 2" productData={props.productData2} handleBuy={handleBuy.bind(this)}/>
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div>
                    <Contents title="Product 3" productData={props.productData3} handleBuy={handleBuy.bind(this)}/>
                </div>
            </TabPanel>
        </div>
    );
}
