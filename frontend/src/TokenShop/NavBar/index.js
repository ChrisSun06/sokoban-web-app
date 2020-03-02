import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Contents from "./../Content";
import datas from "./dummy-data.js"

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    appbar: {
        alignItems: 'center',
    }
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar style={{background: '#fafafa'}} position="relative" className={classes.appbar}>
                <Tabs style={{color: '#212121'}} value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Game Building Slots" {...a11yProps(0)} />
                    <Tab label="Badges" {...a11yProps(1)} />
                    <Tab label="Player Icons" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <div>
                    <Contents title="Main Page 1" productData={datas.productData}/>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div>
                    <Contents title="Main Page 2" productData={datas.productData2}/>
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div>
                    <Contents title="Main Page 3" productData={datas.productData3}/>
                </div>
            </TabPanel>
        </div>
    );
}
