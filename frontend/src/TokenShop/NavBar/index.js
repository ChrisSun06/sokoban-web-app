import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Contents from "./../Content";

//Dummy datas for products
const productData = [

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 1a",
        price: "Me"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 1b",
        price: "Me"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 1c",
        price: "Me"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 1d",
        price: "Me"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 1e",
        price: "Me"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 1f",
        price: "Me"
    }
];

const productData2 = [

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 2a",
        price: "Me"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 2b",
        price: "Me"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 2c",
        price: "Me"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 2d",
        price: "Me"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 2e",
        price: "Me"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 2f",
        price: "Me"
    }
];

const productData3 = [

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 3a",
        price: "Me"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 3b",
        price: "Me"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 3c",
        price: "Me"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 3d",
        price: "Me"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 3e",
        price: "Me"
    },

    {
        img: "https://bit.ly/2WNi2Ml",
        title: "Product 3f",
        price: "Me"
    }
];
   

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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
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
                    <Tab label="Game Building Slots" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                    <Tab label="Badges" id="simple-tab-1" aria-controls="simple-tabpanel-1"/>
                    <Tab label="Player Icons" id="simple-tab-2" aria-controls="simple-tabpanel-2" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <div>
                    <Contents title="Product 1" productData={productData}/>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div>
                    <Contents title="Product 2" productData={productData2}/>
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div>
                    <Contents title="Product 3" productData={productData3}/>
                </div>
            </TabPanel>
        </div>
    );
}
