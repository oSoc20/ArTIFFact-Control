import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from 'Reducers';
import { FilecheckAction, incrementStep, resetStep, goBackOneStep } from 'Actions/FileCheckActions';
import FileCheckStepper from 'Components/Stepper/Stepper';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stage1 from 'Components/FileUploadStages/PickFiles/Stage1'
import Stage2 from 'Components/FileUploadStages/PickConfiguration/Stage2'
import Stage3 from 'Components/FileUploadStages/ProcessFiles/Stage3'
import { Grid, Typography, Box, Container } from '@material-ui/core';
import CheckFileIcon from 'Assets/icons/icons8-check-file-500.svg';
import { Configuration } from 'Interfaces/Configuration';
/* Typescript interfaces */

interface FilecheckerProps {
    step: number;
    progressStep: () => void;
    resetStep: () => void;
    goBackOneStep: () => void;
}

/* Styles */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            textAlign: "center",
            marginTop: "1.5rem",
            marginBottom: "3rem",
            fontFamily: "DIN 2014",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "36px",
            lineHeight: "46px",
            color: "#2A4B5B"
        },
        titleIcon: {
            width: '50px',
            marginRight: '20px'
        },
        stepperContainer: {
            display: "block",
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "1rem"
        },
    })
);

/* Components */

const STEPS = ["Upload", "Settings", "Check"]

/**
 * Screen used to handle the file checks
 * @param props props that are passed in by the Redux store
 */
const FileChecks = (props: FilecheckerProps) => {
    const classes = useStyles();
    const [configuration, setConfiguration] = React.useState<Configuration | null>(null);

    const renderStage = () => {
        switch (props.step) {
            case 0:
                return <Stage1 progressStep={props.progressStep} />
            case 1:
                return <Stage2 goBackOneStep={props.goBackOneStep} progressStep={props.progressStep} setConfiguration={setConfiguration} />
            case 2:
                return <Stage3 configuration={configuration!} />
            default:
                return <div>Other stage</div>
        }
    }

    React.useEffect(() => {

    }, [configuration]);

    return (
        <>
            <Typography component="span" gutterBottom className={classes.title}>
                <Box fontSize='h4.fontSize' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                    <img src={CheckFileIcon} className={classes.titleIcon} />
                    <span>File checks</span>
                </Box>
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={10} style={{ margin: 'auto' }}>
                    <Container>
                        {renderStage()}
                    </Container>
                </Grid>
                <Grid item xs={12} lg={10} style={{ margin: 'auto' }}>
                    <div className={classes.stepperContainer}>
                        <FileCheckStepper stepLabels={STEPS} step={props.step} />
                    </div>
                </Grid>
            </Grid>
            {/* ²<button onClick={() => props.resetStep()}>Reset progress (temp button)</button> */}
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
    progressStep: () => dispatch(incrementStep()),
    resetStep: () => dispatch(resetStep()),
    goBackOneStep: () => dispatch(goBackOneStep())
});

// Connect to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(FileChecks);
