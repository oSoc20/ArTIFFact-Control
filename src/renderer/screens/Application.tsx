import { hot } from 'react-hot-loader/root';
import * as React from 'react';
// React router
import { BrowserRouter, Route, Redirect, Switch, Router, HashRouter } from 'react-router-dom'
// Material UI
import { makeStyles, createStyles, Theme } from '@material-ui/core';
// Components
import Sidebar from './Sidebar/Sidebar';
import Dashboard from './Dashboard/Dashboard';
import FileChecks from './FileChecks/FileChecks';
import Reports from './Reports/Reports';
import Statistics from './Statistics/Statistics';
import PeriodicalChecks from './PeriodicalChecks/PeriodicalChecks';
import ConformanceChecks from './ConformanceChecks/PeriodicalChecks';
import Help from './Help/Help';
import About from './About/About';


function Application() {
    const classes = useStyles();

    return (
        <HashRouter>
            <div className={classes.root}>
                <Sidebar />
                <main className={classes.content}>
                    <Switch>
                        <Route path="/dashboard" exact component={Dashboard} />
                        <Route path="/fileChecks" exact component={FileChecks} />
                        <Route path="/reports" exact component={Reports} />
                        <Route path="/statistics" exact component={Statistics} />
                        <Route path="/periodicalChecks" exact component={PeriodicalChecks} />
                        <Route path="/conformanceChecks" exact component={ConformanceChecks} />
                        <Route path="/help" exact component={Help} />
                        <Route path="/about" exact component={About} />
                        <Redirect from="/*" to="/dashboard" />
                    </Switch>
                </main>
            </div>
        </HashRouter>
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
