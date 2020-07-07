import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import Counter from './Counter';

const Application = () => (
    <div>
        Hello World from Electron!
        <Counter />
    </div>
);

export default hot(Application);
