import * as React from 'react';
import { createRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from 'Reducers';
import { FilecheckAction, clearFiles, setFiles, FileData } from 'Actions/FileCheckActions';
import FileDropZone, { formatBytes } from 'Components/FileCheckDropzone/FileCheckDropzone'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MuiTableCell from '@material-ui/core/TableCell';
import { Box, TableContainer, TableHead, TableBody, TableRow, Table, withStyles, Typography } from '@material-ui/core';
import { default as DeleteIcon } from '@material-ui/icons/DeleteForever';


/* Typescript interfaces */

interface Stage1Props {
    progressStep: () => void;
    files: Array<FileData>;
    clearFiles: () => void;
    setFiles: (files: Array<FileData>) => void
}


/* Styles */

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        addButton: {
            background: "none",
            cursor: "pointer",
            border: "none",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 300,
            marginTop: "2rem",
            marginLeft: "1rem"
        },
        continueButton: {
            color: "white",
            marginTop: "2rem",
            background: "#2A4B5B",
            border: 'none',
            borderRadius: "12px",
            width: "125px",
            height: "45px",
            marginLeft: "auto", 
            marginRight: "1rem",
            cursor: "pointer"
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
            fontSize: "18px",
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
            let newFiles: Array<FileData> = [];
            fileList.forEach(file => {
                newFiles.push(
                    {
                        path: file.path,
                        size: formatBytes(file.size)
                    }
                )
            });
            props.setFiles([...props.files, ...newFiles]);
        }

    }

    return (
        <>
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
                                    <TableCell className={classes.tableHeadCell}>size</TableCell>
                                    <TableCell className={classes.tableHeadCell} />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.files.map((file, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell className={classes.tableContentCell}>{file.path}</TableCell>
                                            <TableCell className={classes.tableContentCell} >{file.size}</TableCell>
                                            <TableCell className={classes.tableContentCell} >
                                                <button style={{ background: "none", border: "none" }}
                                                    onClick={() => removeFile(index)}
                                                ><DeleteIcon /></button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box display={"flex"} width={"100%"} margin={"1rem 0rem 1rem"}>
                        <input
                            multiple
                            onChange={() => handleFileAdding()}
                            ref={fileInput}
                            type={"file"}
                            accept={".tiff,.TIFF,.tif,.TIF,.zip,.gz,.tar.gz"}
                            style={{ display: "none" }}
                        />
                        <button
                            className={classes.addButton}
                            onClick={() => fileInput.current?.click()}>+ new file or folder</button>
                        <button 
                            className={classes.continueButton}
                            onClick={() => props.progressStep()}>Continue</button>
                    </Box>
                </>
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

/**
 * Function that maps dispatch functions to props
 * @param dispatch the dispatch function used by Redux
 */
const mapDispatchToProps = (dispatch: Dispatch<FilecheckAction>) => ({
    setFiles: (files: Array<FileData>) => dispatch(setFiles(files)),
    clearFiles: () => dispatch(clearFiles())
});


// Connect to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Stage1);