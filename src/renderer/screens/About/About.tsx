import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box, Paper } from '@material-ui/core';
import InfoFileIcon from 'Assets/icons/icons8-info-500.svg';
import MeemooLogo from 'Assets/logos/meemoo_logo.svg';
import OsocLogo from 'Assets/logos/osoc_logo 1.svg';
import { useMainStyles } from 'Theme/Main';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            textAlign: 'center',
            marginTop: '2rem',
            marginBottom: '3rem',
            fontFamily: 'DIN 2014',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '36px',
            lineHeight: '46px',
            color: theme.palette.primary.dark,
        },
        titleIcon: {
            width: '50px',
            marginRight: '20px',
        },
        textcontainer: {
            padding: '65px',
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
        },
        margin: {
            margin: '10px 0',
        },
        extraMargin: {
            marginTop: '30px',
        },
        imagecontainer: {
            padding: '0 65px 65px',
        },
        logo: {
            marginRight: '58px',
        },
    })
);

export default function About() {
    const classes = useStyles();
    const mainClasses = useMainStyles();

    return (
        <>
            <Typography component="span" gutterBottom className={classes.title}>
                <Box
                    fontSize="h4.fontSize"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <img src={InfoFileIcon} className={classes.titleIcon} />
                    <span>About</span>
                </Box>
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={10} style={{ margin: 'auto' }}>
                    <Paper className={mainClasses.paper}>
                        <div className={classes.textcontainer}>
                            <Typography>
                                ArTIFFact Control is a project made by a student team at open Summer
                                of code 2020. The project was commissioned by Meemoo. The goals of
                                this project was to create a new, refreshed user interface that can
                                replace the current DPF Manager.
                            </Typography>
                            <Typography className={classes.extraMargin}>
                                All project members are:
                            </Typography>
                            <Typography className={classes.margin}>
                                Bram De Coninck - Coach
                            </Typography>
                            <Typography className={classes.margin}>
                                Christopher Denis - Front-end Developer
                            </Typography>
                            <Typography className={classes.margin}>
                                Freek De Sagher - Front-end Developer
                            </Typography>
                            <Typography className={classes.margin}>
                                Tim Pensart - UX/UI design
                            </Typography>
                            <Typography className={classes.margin}>
                                Amber Pérard - UX/UI design
                            </Typography>
                            <Typography className={classes.extraMargin}>
                                he project is build on the JHOVE rest API and Electron. The GitHub
                                repository is available at
                                <a href="https://github.com/oSoc20/ArTIFFact-Control">
                                    https://github.com/oSoc20/ArTIFFact-Control
                                </a>
                            </Typography>
                        </div>
                        <div className={classes.imagecontainer}>
                            <img src={OsocLogo} className={classes.logo}></img>
                            <img src={MeemooLogo}></img>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
