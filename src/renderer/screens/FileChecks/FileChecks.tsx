import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { FilecheckAction, progressStep, resetStep } from '../../actions/FileCheckActions';
import FileCheckStepper from './FileCheckStepper'


interface StepperProps {
    step: number,
    progressStep: () => void,
    resetStep: () => void
}


const FileChecks = (props: StepperProps) => {
    return (
        <div style={{display: "default"}}>
            <h1 style={{}}>File checks</h1>
            <FileCheckStepper />
            <button onClick={() => props.progressStep()}>test (remove me later)</button>
            <button onClick={() => props.resetStep()}>Reset</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch: Dispatch<FilecheckAction>) => ({
    progressStep: () => dispatch(progressStep()),
    resetStep: () => dispatch(resetStep())
});

export default connect(null, mapDispatchToProps)(FileChecks);
