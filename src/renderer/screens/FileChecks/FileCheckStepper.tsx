import * as React from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';


/* Typescript interfaces */

interface StepperProps {
    step: number
}


/* Components and variables */ 

// The possible steps the stepper can take
export const steps = ["Upload", "Settings", "Check"]

/**
 * Component that renders the stepper
 * @param props props that are passed in by the Redux store
 */
const FileChecksStepper = (props: StepperProps) => {
    return (
        <Stepper activeStep={props.step}>
            {steps.map((stepName) => {
                return (
                    <Step key={stepName}>
                        <StepLabel>{stepName}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
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

// Connect to the Redux store
export default connect(mapStateToProps)(FileChecksStepper)