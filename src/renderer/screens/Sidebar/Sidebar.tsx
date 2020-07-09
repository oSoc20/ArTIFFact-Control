import * as React from 'react';
// Material UI
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import BarChartIcon from '@material-ui/icons/BarChart';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
// History
import { useHistory } from "react-router-dom";

/* IMAGES */
const logoWithLabel = require('../../resources/images/logoWithLabel.svg');

/* STYLING */
const drawerWidth = 260;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },
        drawerPaper: {
            width: drawerWidth,
            background: '#2A4B5B',
            color: '#FCFCFC'
        },
        selected: {
            backgroundColor: "white !important",
            color: "black"
        }
    }),
);

const listItemLogo = {
    marginTop: '53px',
    marginBottom: '90px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '180px',
    display: 'block'
};

const listItem = {
    paddingTop: '5px',
    paddingBottom: '5px'
}

const icon = {
    minWidth: 0,
    marginRight: '12px'
}

/* ITEMS */
const middleItems = [
    { name: 'Dashboard', link: 'dashboard', icon: <HomeOutlinedIcon style={icon} /> },
    { name: 'File checks', link: 'fileChecks', icon: <DoneOutlineOutlinedIcon style={icon} /> },
    { name: 'Reports', link: 'reports', icon: <DescriptionOutlinedIcon style={icon} /> },
    { name: 'Statistics', link: 'statistics', icon: <BarChartIcon style={icon} /> },
    { name: 'Periodical checks', link: 'periodicalChecks', icon: <AlarmOnIcon style={icon} /> },
    { name: 'Conformance checks', link: 'conformanceChecks', icon: <InsertDriveFileOutlinedIcon style={icon} /> },
    { name: 'Configurations', link: 'configurations', icon: <SettingsIcon style={icon} /> }
];

const bottomItems = [
    { name: 'Help', link: 'help', icon: <InfoOutlinedIcon style={icon} /> },
    { name: 'About', link: 'about', icon: <HelpOutlineOutlinedIcon style={icon} /> }
];

/* FUNCTIONS */
function renderItems(items: any[], selectedItem: string, setSelectedItem: any, classes: any, history: any): any {
    return items.map((item, index) => (
        <ListItem button key={index} classes={{ selected: classes.selected }} style={listItem} selected={selectedItem == item.link} onClick={() => { setSelectedItem(item.link); history.push('/' + item.link); }}>
            {item.icon}
            <ListItemText><span style={{ fontSize: '18px' }}>{item.name}</span></ListItemText>
        </ListItem>
    ));
}

/* COMPONENT */
function Sidebar() {
    const classes = useStyles();
    const history = useHistory();
    const [selectedItem, setSelectedItem] = React.useState("dashboard");

    return (
        <nav className={classes.drawer} aria-label="sidebar">
            <Drawer
                classes={{
                    paper: classes.drawerPaper,
                }}
                variant="permanent"
                style={{ display: 'flex', flexDirection: 'column' }}
                open
            >
                <List disablePadding dense style={{ flex: 'none' }}>
                    <ListItem>
                        <img style={listItemLogo} src={logoWithLabel} />
                    </ListItem>
                </List>
                <List disablePadding dense style={{ flex: 1 }}>
                    {renderItems(middleItems, selectedItem, setSelectedItem, classes, history)}
                </List>
                <List disablePadding dense style={{ flex: 'none', marginBottom: '22px' }}>
                    {renderItems(bottomItems, selectedItem, setSelectedItem, classes, history)}
                </List>
            </Drawer>
        </nav>
    );
};

export default (Sidebar);
