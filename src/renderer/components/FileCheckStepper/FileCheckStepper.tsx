import * as React from 'react';
import { Stepper, Step, StepLabel, StepConnector } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { RootState } from 'Reducers';


/* Typescript interfaces */

interface StepperProps {
    step: number
}

interface IconProps {
    active: boolean;
    completed: boolean;
}


/* Styling */

/**
 * Restyling of the connector (line between steps)
 */
const CustomConnector = withStyles({
    alternativeLabel: {
        top: 6,
        left: 'calc(-50%)',
        right: 'calc(50%)',
    },
    active: {
        '& $line': {
            borderColor: '#F79947',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#F79947',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 10,
        borderRadius: 0,
    },
})(StepConnector)


const useStyle = makeStyles({
    default: {
        textDecoration: "none"
    },
    current: {
        color: '#F79947',
        fontWeight: "bolder"
    }
});


const useIconStyle = makeStyles({
    root: {
        color: '#F79947',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    circle: {
        width: 12,
        height: 12,
        border: "4px solid #eaeaf0",
        borderRadius: '50%',
        backgroundColor: 'white',
        zIndex: 1
    },
    circleCurrent: {
        width: 15,
        height: 15,
        border: "5px solid #F79947",
        borderRadius: '50%',
        backgroundColor: 'white',
        zIndex: 1
    },
    circleFinished: {
        width: 15,
        height: 15,
        borderRadius: '50%',
        border: "none",
        backgroundColor: "#F79947",
    },
});

/* Components and variables */

// The possible steps the stepper can take (todo pass steps in as prop to make it more generic)
export const steps = ["Upload", "Settings", "Check"]

/**
 * Custom step icon for the stepper
 * @param props props passed in by the parent
 */
const CustomStepIcon = (props: IconProps) => {
    const classes = useIconStyle();
    return (
        <div className={classes.root}>
            {props.completed ? <div className={classes.circleFinished} /> : 
            props.active? <div className={classes.circleCurrent}/> :
            <div className={classes.circle} />}
        </div>
    );
}

/**
 * Component that renders the stepper
 * @param props props that are passed in by the Redux store
 */
const FileChecksStepper = (props: StepperProps) => {
    const classes = useStyle();
    return (
        <Stepper alternativeLabel activeStep={props.step} connector={<CustomConnector />} style={{backgroundColor: 'transparent', marginBottom: 0}}>
            {steps.map((stepName, index) => {
                return (
                    <Step key={stepName} >
                        <StepLabel StepIconComponent={CustomStepIcon}>
                            <span className={props.step === index? classes.current : classes.default}>{stepName}</span>
                        </StepLabel>
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