import * as React from 'react';
// Themes
import { useMainStyles } from 'Theme/Main';
import { TableCell, StyledTableRow1, useTableStyles } from 'Theme/Table';
// Material UI
import { Typography, Paper, Box, makeStyles, Theme, createStyles, TableContainer, Table, TableHead, TableRow, TableBody, Button } from '@material-ui/core';
// Icons
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SettingsIcon from 'Assets/icons/icons8-settings-500.svg';
import { useHistory } from 'react-router-dom';
import { Configuration } from 'Interfaces/Configuration';
import { SidebarAction, setActiveItem } from 'Actions/SidebarAction';
import { connect } from 'react-redux';

/* INTERFACES */
interface LastConfigurationsProps {
    setActiveItem: (item: string) => void
}

/* COMPONENT */
const LastConfigurations = (props: LastConfigurationsProps) => {
    const mainClasses = useMainStyles();
    const tableClasses = useTableStyles();
    const maxItems = 6;

    const history = useHistory();
    const [configurations, setConfigurations] = React.useState<Array<Configuration>>([]);

    return (
        <>
            <Paper className={mainClasses.paper}>
                <Typography component='span' style={{ display: 'flex' }}>
                    <Box className={mainClasses.boxTitle} fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                        <img src={SettingsIcon} className={mainClasses.titleIcon} />
                        Configurations
                    </Box>
                    <Button style={{ marginLeft: 'auto', fontWeight: 600, textTransform: 'none' }} onClick={() => { props.setActiveItem('configurations'); history.push('/configurations') }}>More <ArrowForwardIcon style={{ marginLeft: '3px', fontSize: '20px' }} /></Button>
                </Typography>
                {configurations.length > 0 ?
                    <TableContainer style={{ marginTop: '20px' }}>
                        <Table aria-label="span" size="small">
                            <TableHead>
                                <TableRow className={tableClasses.tableHeadRow}>
                                    <TableCell className={tableClasses.tableHeadCell}>Name</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Profile</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {configurations.map((row, index) => {
                                    if (index < maxItems) {
                                        const opacity = index < maxItems - 2 ? { opacity: 1 }
                                            : index === maxItems - 2 ? { opacity: 0.6 }
                                                : { opacity: 0.3 };

                                        return (
                                            <StyledTableRow1 key={index} style={opacity}>
                                                <TableCell>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell>
                                                    {row.profiles.join(',')}
                                                </TableCell>
                                            </StyledTableRow1>
                                        );
                                    }
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <Typography style={{ marginTop: '15px' }}>No data found.</Typography>
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