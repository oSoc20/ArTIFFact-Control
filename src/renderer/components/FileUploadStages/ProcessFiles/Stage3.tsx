import * as React from 'react';
import { Box, Divider, makeStyles, createStyles, Theme, LinearProgress, Typography, withStyles, CircularProgress as Spinner } from '@material-ui/core';
import { RootState } from 'Reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux'
import axios, { AxiosResponse } from 'axios';
import { resetStep, FilecheckAction, clearFiles } from 'Actions/FileCheckActions';


const JHOVE_API_BASE = "https://soc.openpreservation.org/"

const JHOVE_API = (endpoint: string) => {
    return `${JHOVE_API_BASE}${endpoint}`;
}

/* Typescript interfaces */

interface CheckProgressProps {
    current: number;
    max: number;
}

interface Stage3Props {
    files: Array<File>;
    resetStep: () => void;
    clearFiles: () => void;
}

interface Message {
    message: string;
    prefix: string;
    subMessage: string;
    jhoveMessage: {
        subMessage: string;
        message: string;
        id: string;
    }
    id: string;
    offset: number
}

interface ValidationResponse {
    checksums: Array<{ type: string; value: string }>;
    created: string | null;
    fileName: string;
    format: string | null;
    lastMod: string | null;
    message: string;
    messages: Array<Message>;
    mimeType: string | null;
    sigMatches: Array<any>;
    size: number;
    valid: number;
    wellFormed: number;
}


/* Styling */

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        divider: {
            marginBottom: "1rem",
            marginLeft: "22px",
            marginRight: "22px",
            height: "1px",
            backgroundColor: "#2A4B5B"
        },
        progressContainer: {
            margin: "100px 65px 100px",
            textAlign: "center",
            "& small": {
                fontFamily: "'DIN 2014'",
            }
        },

    })
);

// Stylized LinearProgress component
const ProgressBar = withStyles((theme) => (
    {
        root: {
            height: 20,
            borderRadius: 12,
            marginBottom: "3px"
        },
        colorPrimary: {
            backgroundColor: "#E0E0E0"
        },
        bar: {
            backgroundColor: "#54C77B"
        }

    }
))(LinearProgress);


/* Components */

/**
 * Small component that contains the progress bar and a small
 * status message about the progress
 * @param props Props are passed in by the parent (Stage3 component)
 */
const CheckProgress = (props: CheckProgressProps) => {
    const classes = useStyles();

    /**
     * Calculate the value that needs to be passed to the Material UI progress bar.
     * The progress bar values are in the range [2,100]
     * The minimal value is 2 to always show a little progress
     */
    const getProgressValue = () => {
        return Math.max(props.current * 100 / props.max, 2);
    }

    // Check whether the progress bar is full
    const finished = () => props.current === props.max

    // props.current references to the index in the files array
    // therefore, the current property needs to be incremented by 1
    return (
        <div className={classes.progressContainer}>
            <ProgressBar value={getProgressValue()} variant={"determinate"} />
            {finished() ? <small>Done!</small> : <small><Spinner size={"10px"} /> Checking file {props.current + 1} of {props.max}</small>}
        </div>
    );
}

/**
 * Component that handles the checking of the files. This is the component that handles
 * connection with the JHOVE DPF module.
 * @param props props are passed by the parent (FileChecks component)
 */
const Stage3 = (props: Stage3Props) => {
    const classes = useStyles();
    const { files } = props;

    // React state variable and setter that keeps track of the current file index
    const [currentFileIndex, setCurrentFileIndex] = React.useState<number>(0);
    const [responseObjects, setResponseObjects] = React.useState<Array<ValidationResponse>>([]);
    const [processFinished, setFinishState] = React.useState<boolean>(false);
    const [showResult, setShowResult] = React.useState<boolean>(false);


    const validateNextFile = () => {
        if (currentFileIndex < files.length && !processFinished) {
            let formData = new FormData();
            formData.append('module', 'TIFF-opf');
            formData.append('file', files[currentFileIndex]);
            axios.post(JHOVE_API("api/jhove/validate"), formData)
                .then(async (res: AxiosResponse) => {
                    console.log("Processed file ", currentFileIndex, responseObjects);
                    let data: ValidationResponse = res.data;
                    setResponseObjects([...responseObjects, data]);
                    setCurrentFileIndex(currentFileIndex + 1);
                })
        }
        else {
            setFinishState(true);
        }
    }

    React.useEffect(() => {
        validateNextFile();

        // Function called upon unmounting.
        // Function also gets called in between render cycles.
        // Only reset progress if rendering is done == the checking process has finished
        return () => {
            if (processFinished) {
                props.resetStep();
                props.clearFiles();
            }
        }

    }, [currentFileIndex, processFinished]);


    const renderResults = () => {
        console.log(responseObjects);
        return (
            <>
                {responseObjects.map((response, index) => {
                    return (
                        <pre key={index}>
                            {JSON.stringify(response, undefined, 2)}
                        </pre>
                    );
                })}
            </>);
    }

    return (
        <>
            <Typography component="span" gutterBottom>
                <Box fontSize='h6.fontSize' style={{ marginBottom: '22px', textAlign: "center" }}>
                    {(processFinished && showResult)? "Results" : "Checking the files..."}
                </Box>
            </Typography>
            <Divider className={classes.divider} />
            {showResult ? renderResults() : <CheckProgress current={currentFileIndex} max={files.length} />}
            {(processFinished && !showResult) && <button onClick={() => setShowResult(true)}>Show results</button>}
        </>
    );
}

/* Redux functions */

/**
 * Function that maps all required state variables to props.
 * @param state Rootstate that has all reducers combined
 */
const mapStateToProps = (state: RootState) => ({
    files: state.filecheck.files
});

const mapDispatchToProps = (dispatch: Dispatch<FilecheckAction>) => ({
    resetStep: () => dispatch(resetStep()),
    clearFiles: () => dispatch(clearFiles())
});


// Default export for this file
export default connect(mapStateToProps, mapDispatchToProps)(Stage3)