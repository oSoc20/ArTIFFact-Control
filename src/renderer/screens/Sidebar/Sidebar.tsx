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
const logoWithLabel = require('../../assets/logos/logoWithLabel.svg');
const homeIcon = require('../../assets/icons/icons8-home-500.svg');
const checkFileIcon = require('../../assets/icons/icons8-check-file-500.svg');
const ratingsIcon = require('../../assets/icons/icons8-ratings-500.svg');
const comboChartIcon = require('../../assets/icons/icons8-combo-chart-500.svg');
const clockCheckedIcon = require('../../assets/icons/icons8-clock-checked-500.svg');
const statisticsReportIcon = require('../../assets/icons/icons8-statistics-report-500.svg');
const settingsIcon = require('../../assets/icons/icons8-settings-500.svg');
const helpIcon = require('../../assets/icons/icons8-info-500.svg');
const aboutIcon = require('../../assets/icons/icons8-help-500.svg');

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

const blackIcon = {
    width: '25px',
    marginRight: '12px'
}

const whiteIcon = {
    width: '25px',
    marginRight: '12px',
    filter: 'grayscale(1) invert(1) contrast(500%)'
}

/* ITEMS */
const middleItems = [
    { name: 'Dashboard', link: 'dashboard', icon: homeIcon },
    { name: 'File checks', link: 'fileChecks', icon: checkFileIcon },
    { name: 'Reports', link: 'reports', icon: ratingsIcon },
    { name: 'Configurations', link: 'configurations', icon: settingsIcon },
    { name: 'Periodical checks', link: 'periodicalChecks', icon: clockCheckedIcon },
    { name: 'Conformance checks', link: 'conformanceChecks', icon: statisticsReportIcon },
    { name: 'Statistics', link: 'statistics', icon: comboChartIcon }
];

const bottomItems = [
    { name: 'Help', link: 'help', icon: helpIcon },
    { name: 'About', link: 'about', icon: aboutIcon }
];

/* FUNCTIONS */
function renderItems(items: any[], selectedItem: string, setSelectedItem: any, classes: any, history: any): any {
    return items.map((item, index) => (
        <ListItem button key={index} classes={{ selected: classes.selected }} style={listItem} selected={selectedItem == item.link} onClick={() => { setSelectedItem(item.link); history.push('/' + item.link); }}>
            <img src={item.icon} style={selectedItem != item.link ? whiteIcon : blackIcon} />
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
