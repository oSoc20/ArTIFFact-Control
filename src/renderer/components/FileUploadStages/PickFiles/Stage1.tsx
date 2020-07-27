import * as React from 'react';
import { createRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from 'Reducers';
import { FilecheckAction, clearFiles, setFiles, FileData } from 'Actions/FileCheckActions';
import FileDropZone, { formatBytes } from 'Components/FileCheckDropzone/FileCheckDropzone'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MuiTableCell from '@material-ui/core/TableCell';
import { Box, TableContainer, TableHead, TableBody, TableRow, Table, withStyles, Typography, Paper, Button } from '@material-ui/core';
import TrashIcon from 'Assets/icons/icons8-delete-bin-500.svg'
import PlusIcon from 'Assets/icons/icons8-plus-math-500.svg';
import { useMainStyles } from 'Theme/Main';


/* Typescript interfaces */

interface Stage1Props {
    progressStep: () => void;
    files: Array<File>;
    clearFiles: () => void;
    setFiles: (files: Array<File>) => void
}


/* Styles */

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        continueButton: {
            color: "#FCFCFC",
            background: "#2A4B5B",
            border: 'none',
            borderRadius: "12px",
            width: "125px",
            height: "45px",
            marginLeft: "auto",
            marginRight: "1rem",
            cursor: "pointer",
            fontFamily: "'Open Sans'"
        },
        newButton: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            border: 'none',
            marginRight: '2rem',
            backgroundColor: '#FCFCFC',
            fontSize: '16px',
            textTransform: 'none',
            cursor: 'pointer',
            height: 'fit-content',
        },
        container: {
            background: "#eee"
        },
        fileContainer: {
            height: "50vh",
            background: "#eee",
            marginTop: "0rem",
            marginLeft: "5rem",
            marginRight: "5rem",
            overflow: "auto"
        },
        tableContainer: {
            maxHeight: 200
        },
        tableHeadRow: {
            borderBottom: '1px solid black'
        },
        tableHeadCell: {
            color: '#39657B',
            fontWeight: 600
        },
        tableContentCell: {
            fontSize: "14px",
            lineHeight: "25px",
            fontFamily: "Open Sans",
        }
    })
);

// Styled Material UI Table Cell component
const TableCell = withStyles({
    root: {
        borderBottom: "none"
    }
})(MuiTableCell);


/* Components and functions */

/**
 * Component that handles and renders Stage 1 of processing file(s)
 * @param props props that are passed in by the FileChecks component
 */
const Stage1 = (props: Stage1Props) => {
    const classes = useStyles();
    const mainClasses = useMainStyles();
    const fileInput = createRef<HTMLInputElement>();

    /**
     * Check whether there are files at the moment
     * @returns true if there are files
     */
    const hasFiles = () => {
        return props.files.length !== 0;
    }

    /**
     * Remove a file of the list
     * @param index index of the file to remove
     */
    const removeFile = (index: number) => {
        // React state only updates if setFiles callback is called
        // Therefore we create a copy of the current array, slice it and
        // then update using setFiles callback
        let filesCopy = [...props.files];
        filesCopy.splice(index, 1);
        props.setFiles(filesCopy);
    }


    /**
     * Handles adding a file. Called by file input element.
     */
    const handleFileAdding = () => {
        const inputFiles = fileInput.current?.files;
        if (inputFiles) {
            const fileList = Array.from(inputFiles);
            props.setFiles([...props.files, ...fileList]);
        }

    }

    return (
        <>
            <Paper className={mainClasses.paper} style={{
                padding: "50px"
            }}>
                <Typography component="span" gutterBottom>
                    <Box fontSize='h6.fontSize' style={{ marginBottom: '40px', textAlign: "center" }}>
                        Step 1 - File upload
                </Box>
                </Typography>
                {!hasFiles() ?
                    <>
                        <FileDropZone updateFiles={props.setFiles} />
                    </>
                    :
                    <>
                        <TableContainer className={classes.tableContainer}>
                            <Table stickyHeader size="small" aria-label="span">
                                <TableHead>
                                    <TableRow className={classes.tableHeadRow}>
                                        <TableCell className={classes.tableHeadCell}>Path</TableCell>
                                        <TableCell className={classes.tableHeadCell}>Size</TableCell>
                                        <TableCell className={classes.tableHeadCell} />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.files.map((file, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell className={classes.tableContentCell}>{file.path}</TableCell>
                                                <TableCell className={classes.tableContentCell} >{formatBytes(file.size)}</TableCell>
                                                <TableCell className={classes.tableContentCell}>
                                                    <button style={{ background: "none", border: "none" }}
                                                        onClick={() => removeFile(index)}
                                                    >
                                                        <img src={TrashIcon} style={{ width: "22px" }} />
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box display={"flex"} width={"100%"} marginTop={"3rem"}>
                            <input
                                multiple
                                onChange={() => handleFileAdding()}
                                ref={fileInput}
                                type={"file"}
                                accept={".tiff,.TIFF,.tif,.TIF,.zip,.gz,.tar.gz"}
                                style={{ display: "none" }}
                            />
                            <Button
                                onClick={() => fileInput.current?.click()}
                                className={classes.newButton}
                            >
                                <img
                                    src={PlusIcon}
                                    style={{ width: '22px', marginRight: '8px' }}
                                />
                                            new file or folder
                                        </Button>
                            <button
                                className={classes.continueButton}
                                onClick={() => props.progressStep()}>Continue</button>
                        </Box>
                    </>
                }
            </Paper>
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

/**
 * Function that maps dispatch functions to props
 * @param dispatch the dispatch function used by Redux
 */
const mapDispatchToProps = (dispatch: Dispatch<FilecheckAction>) => ({
    setFiles: (files: Array<File>) => dispatch(setFiles(files)),
    clearFiles: () => dispatch(clearFiles())
});


// Connect to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Stage1);