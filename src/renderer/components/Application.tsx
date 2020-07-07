import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import Counter from './Counter';
import { HashRouter, Route } from 'react-router-dom';

const Application = () => (
    <HashRouter>
        <div>
            <Route path="/" exact component={Counter} />
        </div>
    </HashRouter>
);

export default hot(Application);
