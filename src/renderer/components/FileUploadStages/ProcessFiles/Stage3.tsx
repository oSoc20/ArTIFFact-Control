import * as React from 'react';
import { Box, Divider, makeStyles, createStyles, Theme, LinearProgress, Typography, withStyles, CircularProgress as Spinner, TableContainer, TableRow, Table, TableHead, TableCell, TableBody, Paper } from '@material-ui/core';
import { RootState } from 'Reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux'
import axios, { AxiosResponse } from 'axios';
import { resetStep, FilecheckAction, clearFiles } from 'Actions/FileCheckActions';
import JhoveValidationResponse, { JhoveMessage } from 'Interfaces/JhoveResults';
import ReportDetails from 'Components/ReportDetails/ReportDetails';
import { useMainStyles } from 'Theme/Main';
import { Configuration, Policy } from 'Interfaces/Configuration';


const JHOVE_API_BASE = 'https://soc.openpreservation.org/';

const INFO = 'info', ERROR = 'error', WARNING = 'warning';
type MessageType = 'info' | 'warning' | 'error';

/**
 * Combines JHOVE base with endpoint.
 * @param endpoint endpoint of the api to use
 */
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
    configuration: Configuration;
    resetStep: () => void;
    clearFiles: () => void;
}


/* Styling */

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        divider: {
            marginBottom: '1rem',
            marginLeft: '22px',
            marginRight: '22px',
            height: '1px',
            backgroundColor: '#2A4B5B'
        },
        progressContainer: {
            margin: '100px 65px 100px',
            textAlign: 'center',
            '& small': {
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
            marginBottom: '3px'
        },
        colorPrimary: {
            backgroundColor: '#E0E0E0'
        },
        bar: {
            backgroundColor: '#54C77B'
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
            <ProgressBar value={getProgressValue()} variant={'determinate'} />
            {finished() ? <small>Done!</small> : <small><Spinner size={'10px'} /> Checking file {props.current + 1} of {props.max}</small>}
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
    const mainClasses = useMainStyles();
    const { files } = props;

    // React state variable and setter that keeps track of the current file index
    const [currentFileIndex, setCurrentFileIndex] = React.useState<number>(0);
    const [responseObjects, setResponseObjects] = React.useState<Array<JhoveValidationResponse>>([]);
    const [processFinished, setFinishState] = React.useState<boolean>(false);


    /**
     * Validates the next file in the array of files using JHOVE-REST. This function makes use of the
     * currentFileIndex, responseObjects and files state objects.
     */
    const validateNextFile = () => {
        if (currentFileIndex < files.length && !processFinished) {
            let formData = new FormData();
            formData.append('module', 'TIFF-opf');
            formData.append('file', files[currentFileIndex]);

            // TIFF Validation
            axios.post(JHOVE_API('api/jhove/validate'), formData)
                .then((res: AxiosResponse) => {
                    let data: JhoveValidationResponse = res.data;
                    setResponseObjects([...responseObjects, data]);

                    // Conformance
                    // props.configuration.profiles.forEach((profile: string) => {
                    //     let value = '';
                    //     switch (profile.toUpperCase()) {
                    //         case 'TI/A DRAFT':
                    //             value = 'A_0_1';
                    //             break;
                    //         case 'TIFF/IT-P1':
                    //             value = 'IT_P1';
                    //             break;
                    //         case 'TIFF/IT-P2':
                    //             value = 'IT_P2';
                    //             break;
                    //         case 'TIFF/IT':
                    //             value = 'IT';
                    //             break;
                    //         case 'BASELINE TIFF 6.0':
                    //             value = 'BASELINE_6_0';
                    //             break;
                    //         case 'EXTENDED TIFF 6.0':
                    //             value = 'EXTENSIONS_6_0';
                    //             break;
                    //         case 'TIFF/EP':
                    //             value = 'EP';
                    //             break;
                    //         default:
                    //             break;
                    //     }

                    //     if(value.length > 0)
                    //         formData.append('profiles', value);
                    // });
                    // props.configuration.policies.forEach((policy: Policy) => {
                    //     formData.append('policies', JSON.stringify(policy));
                    // });

                    // axios.post(JHOVE_API('api/jhove/conformance'), formData)
                    //     .then((res: AxiosResponse) => {
                    //         let data: any = res.data;
                            setResponseObjects([...responseObjects, data]);
                            setCurrentFileIndex(currentFileIndex + 1);
                    //     });
                });
        }
        else {
            setFinishState(true);
        }
    }

    /**
     * Hook that runs on update of the props currentFileIndex and processFinished. 
     * Validates the files on update. If the process has finished, the steps and files redux state
     * properties are reset.
     */
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

    /**
     * Filter the messages of the JHOVE validation response.
     * @param response the JHOVE validation response to filter the messages from
     * @param type the type of message to filter on.
     */
    const filterMessages = (response: JhoveValidationResponse, type: MessageType) => {
        switch (type) {
            case INFO:
                return response.messages.filter((report: JhoveMessage) => {
                    return report.prefix.toLowerCase() === INFO;
                });
            case ERROR:
                return response.messages.filter((report: JhoveMessage) => {
                    return report.prefix.toLowerCase() === ERROR;
                });
            case WARNING:
                return response.messages.filter((report: JhoveMessage) => {
                    // A warning type does not exist in JHOVE (yet). Right now, JHOVE info messages
                    // Are both DPF info messages AND warnings
                    return report.prefix.toLowerCase() === WARNING || report.prefix.toLowerCase() === INFO;
                });
            default:
                return response.messages;
        }
    }

    /**
     * Count the amount of messages of a certain type in a JHOVE validation response.
     * @param response JHOVE validation response to count message types in.
     * @param type type of messages to count
     */
    const getMessageCount = (response: JhoveValidationResponse, type: MessageType) => {
        return filterMessages(response, type).length;
    }

    /**
     * Render the response objects
     */
    const renderResults = () => {
        let reports: ReportParent = { reports: [], formats: null };
        responseObjects.forEach((response: JhoveValidationResponse) => {
            let report: Report = {
                date: new Date(),
                fileName: response.fileName,
                errors: getMessageCount(response, ERROR),
                passed: response.valid,
                result: response.wellFormed === 1,
                score: 100,
                warnings: getMessageCount(response, WARNING),
                infos: getMessageCount(response, INFO),
                filePath: files[responseObjects.indexOf(response)].path,
            }
            reports.reports.push(report);
        });

        return <>
            <ReportDetails reportParent={reports} />
        </>
    }

    return (
        <>
            {!processFinished ?
                <Paper className={mainClasses.paper}>
                    <Typography component='span' gutterBottom>
                        <Box fontSize='h6.fontSize' style={{ marginBottom: '22px', textAlign: 'center' }}>
                            Checking the files...
                        </Box>
                    </Typography>
                    <Divider className={classes.divider} />
                    <CheckProgress current={currentFileIndex} max={files.length} />
                </Paper>
                : renderResults()
            }
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