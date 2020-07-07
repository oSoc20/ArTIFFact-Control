import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';
import { ExampleAction, decrement, increment } from '../actions/exampleActions';

export interface Props {
    value: number;

    incrementValue: () => any;
    decrementValue: () => any;
}

const Counter: React.FunctionComponent<Props> = ({ value, incrementValue, decrementValue }) => (
    <div className="counter">
        <p id="counter-value">Current value: {value}</p>
        <p>
            <button id="increment" onClick={incrementValue}>
                Increment
            </button>
            <button id="decrement" onClick={decrementValue}>
                Decrement
            </button>
        </p>
    </div>
);

const mapStateToProps = (state: RootState) => ({
    value: state.counter.value
});

const mapDispatchToProps = (dispatch: Dispatch<ExampleAction>) => ({
    incrementValue: () => dispatch(increment()),
    decrementValue: () => dispatch(decrement())
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
