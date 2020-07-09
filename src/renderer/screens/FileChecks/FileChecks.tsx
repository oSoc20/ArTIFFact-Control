import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers';
import { FilecheckAction, progressStep, resetStep } from '../../actions/FileCheckActions';
import FileCheckStepper from './FileCheckStepper'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Stage1 } from './Stage1'
import { Stage2 } from './Stage2'
import { Stage3 } from './Stage3'


/* Typescript interfaces */

interface FilecheckerProps {
    step: number,
    progressStep: () => void,
    resetStep: () => void
}

/* Styles */
const useStyles = makeStyles((theme: Theme) => 
    createStyles({
      container: {
          height: "90vh",
          display: "flex",
          alignContent: "center",
      },
      title: {
          textAlign: "center"
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
        <div className={classes.container}>
            <h1 className={classes.title}>File checks</h1>
            <div>
                <div>
                    <FileCheckStepper />
                </div>
                <button onClick={() => props.progressStep()}>test (remove me later)</button>
                <button onClick={() => props.resetStep()}>Reset</button>
                {renderStage()}
            </div>
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
