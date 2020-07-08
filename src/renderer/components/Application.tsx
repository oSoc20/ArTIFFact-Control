import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import Sidebar from './Sidebar/Sidebar';
import { HashRouter, Route } from 'react-router-dom';

const Application = () => (
    <HashRouter>
        <Route path="/" exact component={Sidebar} />
    </HashRouter>
);

export default hot(Application);
