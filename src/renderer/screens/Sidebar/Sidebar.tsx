import * as React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { RootState } from 'src/renderer/reducers';
import { connect } from 'react-redux';
import { SidebarAction, setActiveItem } from 'Actions/SidebarAction';
// Icons
import LogoWithLabel from 'Assets/logos/logoWithLabel.svg';
import HomeIcon from 'Assets/icons/icons8-home-500.svg';
import CheckFileIcon from 'Assets/icons/icons8-check-file-500.svg';
import RatingsIcon from 'Assets/icons/icons8-ratings-500.svg';
import SettingsIcon from 'Assets/icons/icons8-settings-500.svg';
import ClockCheckedIcon from 'Assets/icons/icons8-clock-checked-500.svg';
import ComboChartIcon from 'Assets/icons/icons8-combo-chart-500.svg';
import HelpIcon from 'Assets/icons/icons8-help-500.svg';
import InfoIcon from 'Assets/icons/icons8-info-500.svg';

/* STYLING */
const drawerWidth = 260;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.primary.main,
            color: '#FCFCFC',
        },
        selected: {
            backgroundColor: 'white !important',
            color: 'black',
        },
    })
);

const listItemLogo = {
    marginTop: '53px',
    marginBottom: '90px',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '180px',
    display: 'block',
};

const listItem = {
    paddingTop: '5px',
    paddingBottom: '5px',
};

const blackIcon = {
    width: '25px',
    marginRight: '12px',
};

const whiteIcon = {
    width: '25px',
    marginRight: '12px',
    filter: 'grayscale(1) invert(1) contrast(500%)',
};

/* INTERFACES */
interface SidebarProps {
    activeItem: string;
    setActiveItem: (item: string) => void;
}

/* COMPONENT */
const Sidebar = (props: SidebarProps) => {
    const classes = useStyles();
    const history = useHistory();

    const middleItems: SidebarItem[] = [
        { name: 'Dashboard', link: 'dashboard', icon: HomeIcon, disabled: false },
        { name: 'Check a file', link: 'fileChecks', icon: CheckFileIcon, disabled: false },
        { name: 'Reports', link: 'reports', icon: RatingsIcon, disabled: false },
        { name: 'Configuration', link: 'configuration', icon: SettingsIcon, disabled: false },
        {
            name: 'Periodical checks',
            link: 'periodicalChecks',
            icon: ClockCheckedIcon,
            disabled: true,
        },
        { name: 'Statistics', link: 'statistics', icon: ComboChartIcon, disabled: true },
    ];

    const bottomItems: SidebarItem[] = [
        { name: 'Help', link: 'help', icon: InfoIcon, disabled: true },
        { name: 'About', link: 'about', icon: HelpIcon, disabled: false },
    ];

    const renderItems = (items: any[]): any => {
        return items.map((item: SidebarItem, index: number) => (
            <ListItem
                button
                key={index}
                classes={{ selected: classes.selected }}
                style={listItem}
                selected={props.activeItem === item.link}
                onClick={() => goToPath(item)}
                disabled={item.disabled}
            >
                <img
                    src={item.icon}
                    style={props.activeItem !== item.link ? whiteIcon : blackIcon}
                />
                <ListItemText>
                    <span style={{ fontSize: '18px' }}>{item.name}</span>
                </ListItemText>
            </ListItem>
        ));
    };

    const goToPath = (item: SidebarItem) => {
        props.setActiveItem(item.link);
        history.push('/' + item.link);
    };

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

/* Redux functions */
const mapStateToProps = (state: RootState) => ({
    activeItem: state.sidebar.activeItem,
});

const mapDispatchToProps = (dispatch: React.Dispatch<SidebarAction>) => ({
    setActiveItem: (item: string) => dispatch(setActiveItem(item)),
});

// Connect to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
