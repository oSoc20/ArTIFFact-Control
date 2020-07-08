import * as React from 'react';
// Redux store
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers';
import { SidebarAction, setActiveItem, ACTIVE_ITEM } from '../../actions/SidebarAction';
// Material UI
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import BarChartIcon from '@material-ui/icons/BarChart';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';

export interface Props {
    activeItem: string;
    setActiveItem: (value: string) => any;
}

function Sidebar(props: Props) {
    const classes = useStyles();

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Drawer
                classes={{
                    paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >
                <List disablePadding dense>
                    <ListItem>
                        <ListItemText style={listItemTextTitle}><span style={title}>JHOVE</span></ListItemText>
                    </ListItem>
                    {listItems(props.activeItem, props.setActiveItem)}
                </List>
            </Drawer>
        </nav>
    );
};

/* ITEMS */
const items = [
    { name: 'Dashboard', icon: <HomeOutlinedIcon style={{ color: "#FCFCFC" }}/> },
    { name: 'File checks', icon: <DoneOutlineOutlinedIcon style={{ color: "#FCFCFC" }} /> },
    { name: 'Reports', icon: <DescriptionOutlinedIcon style={{ color: "#FCFCFC" }} /> },
    { name: 'Statistics', icon: <BarChartIcon style={{ color: "#FCFCFC" }} /> },
    { name: 'Periodical checks', icon: <AlarmOnIcon style={{ color: "#FCFCFC" }} /> },
    { name: 'Conformance checks', icon: <InsertDriveFileOutlinedIcon style={{ color: "#FCFCFC" }} /> }
];

/* FUNCTIONS */
function listItems(activeItem: string, setActiveItem: any): any {
    return items.map((item, index) => (
        <ListItem button key={index} style={listItem} selected={activeItem == item.name} onClick={() => setActiveItem(item.name)}>
            <ListItemIcon style={{ minWidth: 0, marginRight: '12px' }}>{item.icon}</ListItemIcon>
            <ListItemText><span style={{ fontSize: '13px' }}>{item.name}</span></ListItemText>
        </ListItem>
    ));
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

const listItemTextTitle = {
    fontSize: '25px',
    marginTop: '30px',
    marginBottom: '50px'
};

const title = {
    fontSize: '25px',
    marginTop: '30px',
    marginBottom: '50px'
};

const listItem = {
    paddingTop: '6px',
    paddingBottom: '6px'
}

/* REDUX STORE */

const mapStateToProps = (state: RootState) => ({
    activeItem: state.sidebar.activeItem
});

const mapDispatchToProps = (dispatch: Dispatch<SidebarAction>) => ({
    setActiveItem: (value: string) => dispatch(setActiveItem(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
