import * as React from 'react';
// Material UI
import { Typography, Grid, Box, makeStyles, Theme, createStyles, Paper } from '@material-ui/core';
import LastReports from 'Components/LastReports/LastReports';
import LastConfigurations from 'Components/LastConfigurations/LastConfigurations';
import LastPeriodicalChecks from 'Components/LastPeriodicalChecks/LastPeriodicalChecks';
import { useMainStyles } from 'Theme/Main';
import FileDropZone from 'Components/FileCheckDropzone/FileCheckDropzone';
import { RootState } from 'src/renderer/reducers';
import { FilecheckAction, setFiles } from 'Actions/FileCheckActions';
import { connect } from 'react-redux';
import CheckFileIcon from 'Assets/icons/icons8-check-file-500.svg';

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
interface DashboardProps {
    setFiles: (files: Array<File>) => void
}

/* COMPONENT */
const Dashboard = (props: DashboardProps) => {
    const classes = useStyles();
    const mainClasses = useMainStyles();

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} xl={10} style={{ margin: 'auto' }}>
                    <Typography component="span" gutterBottom>
                        <Box fontSize='h4.fontSize' fontFamily='"DIN 2014"'>
                            Dashboard
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={12} xl={10} style={{ margin: 'auto' }}>
                    <Grid container spacing={3} alignItems="stretch">
                        <Grid item xs={12}>
                            <Paper className={mainClasses.paper}>
                                <Typography component='span' style={{ display: 'flex', marginBottom: '20px' }}>
                                    <Box className={classes.box} fontSize='h6.fontSize' fontWeight='fontWeightBold'>
                                        <img src={CheckFileIcon} style={{ marginRight: '20px', width: '40px' }} />
                                        Check a file
                                    </Box>
                                </Typography>
                                <FileDropZone dashboardVersion={true} updateFiles={props.setFiles} redirect='fileChecks' />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} lg={7} style={{ display: 'flex' }}>
                            <LastReports />
                        </Grid>
                        <Grid item xs={12} lg={5} style={{ display: 'flex' }}>
                            <LastConfigurations />
                        </Grid>
                        <Grid item xs={12}>
                            <LastPeriodicalChecks />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

/* REDUX */
const mapStateToProps = (state: RootState) => ({

});

const mapDispatchToProps = (dispatch: React.Dispatch<FilecheckAction>) => ({
    setFiles: (files: Array<File>) => dispatch(setFiles(files)),
});

// Connect to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);