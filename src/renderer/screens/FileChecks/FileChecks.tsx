import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from 'Reducers';
import { FilecheckAction, progressStep, resetStep } from 'Actions/FileCheckActions';
import FileCheckStepper from './FileCheckStepper'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Stage1 } from './Stage1'
import { Stage2 } from './Stage2'
import { Stage3 } from './Stage3'
import { autoUpdater } from 'electron';


/* Typescript interfaces */

interface FilecheckerProps {
    step: number,
    progressStep: () => void,
    resetStep: () => void
}

/* Styles */
const useStyles = makeStyles((theme: Theme) => 
    createStyles({
      title: {
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto"
      },
      stepperContainer: {
        display: "block",
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto"
      }
    })
);

/* Components */ 

/**
 * Screen used to handle the file checks
 * @param props props that are passed in by the Redux store
 */
const FileChecks = (props: FilecheckerProps) => {
    const classes = useStyles();

    const renderStage = () => {
        switch(props.step) {
            case 0:
                return <Stage1 />
            case 1:
                return <Stage2 />
            case 2:
                return <Stage3 />
            default:
                return <div>Other stage</div>
        }
    } 

    return (
        <>
            <h1 className={classes.title}>File checks</h1>
            {renderStage()}
                <div className={classes.stepperContainer}>
                    <FileCheckStepper />
                    <button onClick={() => props.progressStep()}>Next</button>
                </div>
                <button onClick={() => props.resetStep()}>Reset</button>
        </>
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
