import * as React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
// Icons
import LogoWithLabel from 'Assets/logos/logoWithLabel.svg';
import HomeIcon from 'Assets/icons/icons8-home-500.svg';
import CheckFileIcon from 'Assets/icons/icons8-check-file-500.svg';
import RatingsIcon from 'Assets/icons/icons8-ratings-500.svg';
import SettingsIcon from 'Assets/icons/icons8-settings-500.svg';
import ClockCheckedIcon from 'Assets/icons/icons8-clock-checked-500.svg';
import StatisticsReportIcon from 'Assets/icons/icons8-statistics-report-500.svg';
import ComboChartIcon from 'Assets/icons/icons8-combo-chart-500.svg';
import HelpIcon from 'Assets/icons/icons8-help-500.svg';
import InfoIcon from 'Assets/icons/icons8-info-500.svg';

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
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.primary.main,
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

/* COMPONENT */
const Sidebar = () => {
    const classes = useStyles();
    const history = useHistory();
    const [selectedItem, setSelectedItem] = React.useState("dashboard");

    const middleItems = [
        { name: 'Dashboard', link: 'dashboard', icon: HomeIcon },
        { name: 'File checks', link: 'fileChecks', icon: CheckFileIcon },
        { name: 'Reports', link: 'reports', icon: RatingsIcon },
        { name: 'Configurations', link: 'configurations', icon: SettingsIcon },
        { name: 'Periodical checks', link: 'periodicalChecks', icon: ClockCheckedIcon },
        { name: 'Conformance checks', link: 'conformanceChecks', icon: StatisticsReportIcon },
        { name: 'Statistics', link: 'statistics', icon: ComboChartIcon }
    ];
    
    const bottomItems = [
        { name: 'Help', link: 'help', icon: InfoIcon },
        { name: 'About', link: 'about', icon: HelpIcon }
    ];

    const renderItems = (items: any[]): any => {
        return items.map((item, index) => (
            <ListItem button key={index} classes={{ selected: classes.selected }} style={listItem} selected={selectedItem === item.link} onClick={() => { setSelectedItem(item.link); history.push('/' + item.link); }}>
                <img src={item.icon} style={selectedItem !== item.link ? whiteIcon : blackIcon} />
                <ListItemText><span style={{ fontSize: '18px' }}>{item.name}</span></ListItemText>
            </ListItem>
        ));
    }

    return (
        <nav className={classes.drawer} aria-label="sidebar">
            <Drawer
                classes={{
                    paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >
                <List disablePadding dense style={{ flex: 'none' }}>
                    <ListItem>
                        <img style={listItemLogo} src={LogoWithLabel} />
                    </ListItem>
                </List>
                <List disablePadding dense style={{ flex: 1 }}>
                    {renderItems(middleItems)}
                </List>
                <List disablePadding dense style={{ flex: 'none', marginBottom: '22px' }}>
                    {renderItems(bottomItems)}
                </List>
            </Drawer>
        </nav>
    );
};

export default (Sidebar);
