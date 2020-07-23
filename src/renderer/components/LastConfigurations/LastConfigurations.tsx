import * as React from 'react';
// Themes
import {useMainStyles} from 'Theme/Main';
import {TableCell, StyledTableRow1, useTableStyles} from 'Theme/Table';
// Material UI
import { Typography, Paper, Box, makeStyles, Theme, createStyles, TableContainer, Table, TableHead, TableRow, TableBody, Button } from '@material-ui/core';
// Icons
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SettingsIcon from 'Assets/icons/icons8-settings-500.svg';
import { useHistory } from 'react-router-dom';
import { Configuration } from 'Interfaces/Configuration';
import { SidebarAction, setActiveItem } from 'Actions/SidebarAction';
import { connect } from 'react-redux';

/* STYLE */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            display: 'flex',
            alignItems: 'center'
        }
    })
);

/* INTERFACES */
interface LastConfigurationsProps {
    setActiveItem: (item: string) => void
}

/* COMPONENT */
const LastConfigurations = (props: LastConfigurationsProps) => {
    const classes = useStyles();
    const mainClasses = useMainStyles();
    const tableClasses = useTableStyles();

    const history = useHistory();
    var configurationsData: Configuration[] = [
        { name: 'Default', implementation: 'Baseline TIFF 6.0' },
        { name: 'Special', implementation: 'Extended TIFF 6.0' },
        { name: 'Special', implementation: 'Extended TIFF 6.0' },
        { name: 'Special', implementation: 'Extended TIFF 6.0' },
        { name: 'Special', implementation: 'Extended TIFF 6.0' },
        { name: 'Special', implementation: 'Extended TIFF 6.0' }
    ];
    const [configurations, setConfigurations] = React.useState(configurationsData);

    return (
        <>
            <Paper className={mainClasses.paper}>
                <Typography component='span' style={{ display: 'flex' }}>
                    <Box className={classes.box} fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                        <img src={SettingsIcon} style={{ marginRight: '20px', width: '40px' }} />
                        Configurations
                    </Box>
                    <Button style={{ marginLeft: 'auto', fontWeight: 600, textTransform: 'none' }} onClick={() => {props.setActiveItem('configurations'); history.push('/configurations')}}>More <ArrowForwardIcon style={{ marginLeft: '3px', fontSize: '20px' }} /></Button>
                </Typography>
                {configurations.length > 0 ?
                    <TableContainer style={{ marginTop: '20px' }}>
                        <Table aria-label="span" size="small">
                            <TableHead>
                                <TableRow className={tableClasses.tableHeadRow}>
                                    <TableCell className={tableClasses.tableHeadCell}>Name</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Implementation</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {configurations.map((row, index) => {
                                    const opacity = index < configurations.length - 2 ? { opacity: 1 }
                                        : index === configurations.length - 2 ? { opacity: 0.6 }
                                            : { opacity: 0.3 };

                                    return (
                                        <StyledTableRow1 key={index} style={opacity}>
                                            <TableCell>
                                                {row.name}
                                            </TableCell>
                                            <TableCell>
                                                {row.implementation}
                                            </TableCell>
                                        </StyledTableRow1>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <Typography style={{marginTop: '15px'}}>No data found.</Typography>
                }
            </Paper>
        </>
    )
}

/* REDUX STORE */
const mapDispatchToProps = (dispatch: React.Dispatch<SidebarAction>) => ({
    setActiveItem: (item: string) => dispatch(setActiveItem(item))
});

// Connect to the Redux store
export default connect(null, mapDispatchToProps)(LastConfigurations);