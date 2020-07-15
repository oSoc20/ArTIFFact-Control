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
            '"OpenSans"'
        ].join(','),
        fontSize: 16
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
