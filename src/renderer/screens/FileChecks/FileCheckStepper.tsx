import * as React from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers';
import { FilecheckAction, progressStep } from '../../actions/FileCheckActions';

interface StepperProps {
    step: number,
    progressStep: () => void
}

export const steps = ["Upload", "Settings", "Check"]

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

const mapStateToProps = (state: RootState) => ({
    step: state.filecheck.step
});

export default connect(mapStateToProps)(FileChecksStepper)