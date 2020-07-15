import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import Application from './screens/Application';
import store from './store';
// Style
import 'Styles/app.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Theming
const theme = createMuiTheme({
    typography: {
        fontFamily: [
            "'Open Sans'",
            "sans-serif"
        ].join(','),
        fontSize: 16
    },
    palette: {
        primary: {
            main: '#2A4B5B',
            light: '#598AA3',
            dark: '#2A4B5B'
        },
        secondary: {
            main: '#F69947',
            light: '#EAAC75',
            dark: '#BD6F2B'
        },
        success: {
            main: '#54C77B'
        },
        error: {
            main: '#F02929'
        },
        grey: {
            "100": '#959595'
        }
    }
});

// Render components
const render = (Component: () => JSX.Element) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Component />
                </ThemeProvider>
            </Provider>
        </AppContainer>,
        mainElement
    );
};

render(Application);
