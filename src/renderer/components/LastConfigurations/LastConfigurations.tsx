import * as React from 'react';
import { useMainStyles } from 'Theme/Main';
import { TableCell, StyledTableRow2, useTableStyles } from 'Theme/Table';
import { Typography, Paper, Box, TableContainer, Table, TableHead, TableRow, TableBody, Button } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SettingsIcon from 'Assets/icons/icons8-settings-500.svg';
import { useHistory } from 'react-router-dom';
import { Configuration } from 'Interfaces/Configuration';
import { SidebarAction, setActiveItem } from 'Actions/SidebarAction';
import { connect } from 'react-redux';
import { RootState } from 'Reducers'
import { ConfigurationAction, loadConfigs } from 'Actions/ConfigurationActions';

/* INTERFACES */
interface LastConfigurationsProps {
    setActiveItem: (item: string) => void;
    loadConfigs: () => void;
    configs: Array<Configuration>;
}

/* COMPONENT */
const LastConfigurations = (props: LastConfigurationsProps) => {
    const mainClasses = useMainStyles();
    const tableClasses = useTableStyles();
    const maxItems = 6;

    const history = useHistory();

    const goToConfig = () => {
        props.setActiveItem('configuration');
        history.push('/configuration')
    }

    React.useEffect(() => {
        props.loadConfigs();
    }, []);

    return (
        <>
            <Paper className={mainClasses.paper}>
                <Typography component='span' style={{ display: 'flex' }}>
                    <Box className={mainClasses.boxTitle} fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                        <img src={SettingsIcon} className={mainClasses.titleIcon} />
                        Configurations
                    </Box>
                    <Button style={{ marginLeft: 'auto', fontWeight: 600, textTransform: 'none' }} onClick={goToConfig}>
                        More <ArrowForwardIcon style={{ marginLeft: '3px', fontSize: '20px' }} />
                    </Button>
                </Typography>
                {props.configs.length > 0 ?
                    <TableContainer style={{ marginTop: '20px' }}>
                        <Table aria-label='span' size='small'>
                            <TableHead>
                                <TableRow className={tableClasses.tableHeadRow}>
                                    <TableCell className={tableClasses.tableHeadCell}>Name</TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>Profile</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.configs.map((row, index) => {
                                    if (index < maxItems) {
                                        const opacity = index < maxItems - 2 ? { opacity: 1 }
                                            : index === maxItems - 2 ? { opacity: 0.6 }
                                                : { opacity: 0.3 };

                                        return (
                                            <StyledTableRow2 key={index} style={opacity} onClick={goToConfig}>
                                                <TableCell>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell>
                                                    {row.profiles.join(',')}
                                                </TableCell>
                                            </StyledTableRow2>
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
const mapStateToProps = (state: RootState) => ({
    configs: state.configuration.configs
});

const mapDispatchToProps = (dispatch: React.Dispatch<SidebarAction | ConfigurationAction>) => ({
    setActiveItem: (item: string) => dispatch(setActiveItem(item)),
    loadConfigs: () => dispatch(loadConfigs())
});

export default connect(mapStateToProps, mapDispatchToProps)(LastConfigurations);