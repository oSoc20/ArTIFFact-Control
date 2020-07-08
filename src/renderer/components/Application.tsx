import { hot } from 'react-hot-loader/root';
import * as React from 'react';
// React router
import { Route, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
// Components
import Sidebar from './Sidebar/Sidebar';
import Dashboard from './Dashboard/Dashboard';
import FileChecks from './FileChecks/FileChecks';


function Application() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Sidebar />
            <main className={classes.content}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/dashboard" exact component={Dashboard} />
                        <Route path="/fileChecks" exact component={FileChecks} />
                        <Redirect from="/*" to="/dashboard" />
                    </Switch>
                </BrowserRouter>
            </main>
        </div >
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);

export default hot(Application);
