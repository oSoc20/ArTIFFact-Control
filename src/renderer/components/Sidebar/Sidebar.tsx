import * as React from 'react';
import { createBrowserHistory } from 'history';
// Resources
import logoWithLabel from "../../../resources/images/logoWithLabel.svg";
// Redux store
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers';
import { SidebarAction, setActiveItem } from '../../actions/SidebarAction';
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

export interface Props {
    activeItem: string;
    setActiveItem: (value: string) => any;
}

export const browserHistory = createBrowserHistory();

function Sidebar(props: Props) {
    const classes = useStyles();

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
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
                        <ListItemText style={listItemLogo}><img style={{width:'180px', display:'block', marginLeft:'auto', marginRight:'auto'}} src={logoWithLabel}/></ListItemText>
                    </ListItem>
                </List>
                <List disablePadding dense style={{ flex: 1 }}>
                    {renderItems(middleItems, props.activeItem, props.setActiveItem)}
                </List>
                <List disablePadding dense style={{ flex: 'none', marginBottom:'15px' }}>
                    {renderItems(bottomItems, props.activeItem, props.setActiveItem)}
                </List>
            </Drawer>
        </nav>
    );
};

/* ITEMS */
const middleItems = [
    { name: 'Dashboard', link: 'dashboard', icon: <HomeOutlinedIcon style={{ color: "#FCFCFC" }} /> },
    { name: 'File checks', link: 'fileChecks', icon: <DoneOutlineOutlinedIcon style={{ color: "#FCFCFC" }} /> },
    { name: 'Reports', link: 'reports', icon: <DescriptionOutlinedIcon style={{ color: "#FCFCFC" }} /> },
    { name: 'Statistics', link: 'statistics', icon: <BarChartIcon style={{ color: "#FCFCFC" }} /> },
    { name: 'Periodical checks', link: 'periodicalChecks', icon: <AlarmOnIcon style={{ color: "#FCFCFC" }} /> },
    { name: 'Conformance checks', link: 'conformanceChecks', icon: <InsertDriveFileOutlinedIcon style={{ color: "#FCFCFC" }} /> }
];

const bottomItems = [
    { name: 'Help', link: 'help', icon: <InfoOutlinedIcon style={{ color: "#FCFCFC" }} /> },
    { name: 'About', link: 'about', icon: <HelpOutlineOutlinedIcon style={{ color: "#FCFCFC" }} /> }
];

/* FUNCTIONS */
function renderItems(items: any[], activeItem: string, setActiveItem: any): any {
    return items.map((item, index) => (
        <ListItem button key={index} style={listItem} selected={activeItem == item.link} onClick={() => changeActiveItem(item.link, setActiveItem)}>
            <ListItemIcon style={{ minWidth: 0, marginRight: '12px' }}>{item.icon}</ListItemIcon>
            <ListItemText><span style={{ fontSize: '13px' }}>{item.name}</span></ListItemText>
        </ListItem>
    ));
}

function changeActiveItem(link: string, setActiveItem: any) {
    setActiveItem(link);
    browserHistory.push('/' + link);
}

/* STYLING */
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        drawerPaper: {
            width: drawerWidth,
            background: '#2A4B5B',
            color: '#FCFCFC'
        },
        selected: {
            backgroundColor: "turquoise !important",
            color: "white",
            fontWeight: 600
        }
    }),
);

const listItemLogo = {
    marginTop: '50px',
    marginBottom: '65px'
};

const listItem = {
    paddingTop: '7px',
    paddingBottom: '7px',
}

/* REDUX STORE */

const mapStateToProps = (state: RootState) => ({
    activeItem: state.sidebar.activeItem
});

const mapDispatchToProps = (dispatch: Dispatch<SidebarAction>) => ({
    setActiveItem: (value: string) => dispatch(setActiveItem(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
