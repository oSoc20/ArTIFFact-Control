import * as React from 'react';
import { Box, Divider, makeStyles, createStyles, Theme, LinearProgress, Typography, withStyles, CircularProgress as Spinner } from '@material-ui/core';
import { RootState } from 'src/renderer/reducers';
import { connect } from 'react-redux';
import { FileData } from 'Actions/FileCheckActions';
import axios from 'axios';


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
}

interface JHOVE_validationArgs {
    moduleName: string;
    file: File;
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
            {finished()? <small>Done!</small> : <small><Spinner size={"10px"}/> Checking file {props.current + 1} of {props.max}</small>}
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
    const {files} = props;

    

    // React state variable and setter that keeps track of the current file index
    const [currentFileIndex, setCurrentFileIndex] = React.useState<number>(0);

    React.useEffect(() => {
        axios.post(JHOVE_API("jhove/validate"), {
            module
        })
    }, [currentFileIndex])

    // TODO -> Add hooks to connect to JHOVE backend here 

    return (
        <>
            <Typography component="span" gutterBottom>
                <Box fontSize='h6.fontSize' style={{ marginBottom: '22px', textAlign: "center" }}>
                    Checking the files...
                </Box>
            </Typography>
            <Divider className={classes.divider} />
            <CheckProgress current={currentFileIndex} max={files.length} />
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


// Default export for this file
export default connect(mapStateToProps)(Stage3)