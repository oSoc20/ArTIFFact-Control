import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers';
import { FilecheckAction, progressStep, resetStep } from '../../actions/FileCheckActions';
import FileCheckStepper from './FileCheckStepper'


/* Typescript interfaces */

interface FilecheckerProps {
    step: number,
    progressStep: () => void,
    resetStep: () => void
}


/* Components */ 

/**
 * Screen used to handle the file checks
 * @param props props that are passed in by the Redux store
 */
const FileChecks = (props: FilecheckerProps) => {
    return (
        <div style={{display: "default"}}>
            <h1 style={{}}>File checks</h1>
            <FileCheckStepper />
            <button onClick={() => props.progressStep()}>test (remove me later)</button>
            <button onClick={() => props.resetStep()}>Reset</button>
        </div>
    )
}


/* Redux functions */ 

/**
 * Function that maps all required state variables to props.
 * @param state Rootstate that has all reducers combined
 */
const mapStateToProps = (state: RootState) => ({
    step: state.filecheck.step
});

/**
 * Function that maps dispatch functions to props
 * @param dispatch the dispatch function used by Redux
 */
const mapDispatchToProps = (dispatch: Dispatch<FilecheckAction>) => ({
    progressStep: () => dispatch(progressStep()),
    resetStep: () => dispatch(resetStep())
});

// Connect to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(FileChecks);
