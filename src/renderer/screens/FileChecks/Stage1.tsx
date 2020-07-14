import * as React from 'react';
import { useCallback, createRef } from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from 'Reducers';
import { FilecheckAction, clearFiles, setFiles, FileData } from 'Actions/FileCheckActions';
import {useDropzone} from 'react-dropzone'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Container, TableContainer, TableCell, TableHead, TableBody, TableRow, Table, Paper } from '@material-ui/core'
import {default as DeleteIcon } from '@material-ui/icons/DeleteForever';


/* Typescript interfaces */

interface DropZoneProps {
    updateFiles: any;
}

interface Stage1Props {
    progressStep: () => void;
    files: Array<FileData>;
    clearFiles: () => void;
    setFiles: (files: Array<FileData>) => void
}


/* Styles */

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
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
      dropzone: {
        border: "2px dashed grey",
        borderRadius: "5px",
        margin: "auto",
        height: "50%",
        width: "50%",
      },
      centered: {
          marginLeft: "auto",
          marginRight: "auto"
      }
    })
);


/* Components and functions */

/**
 * Converts an amount of bytes to a clearer representation
 * ex. 10 kB or 10 GB
 * source: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
 * @param bytes the amount of bytes
 * @param decimals the amount of decimals in the result
 */
const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


/**
 * React component that handles the file drop zone
 * @param props props that are passed by the parent component
 */
const FileDropZone = (props: DropZoneProps) => {

    const classes = useStyles();

    /**
     * Callback function that handles the onDrop event
     * Adds the files to the Redux store using the function that is passed in
     * with the props.
     */
    const onDrop = useCallback(acceptedFiles => {
        let acceptedFilesArray: Array<any> = Object.keys(acceptedFiles).map((key) => acceptedFiles[key]);
        let files: Array<FileData> = [];
        acceptedFilesArray.forEach((file) => {
            files.push({
                path: file.path,
                size: formatBytes(file.size)
            })
        });
        props.updateFiles(files);
        
    }, []);

    // Destructure the things we need
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: ".tiff,.TIFF,.tif,.TIF,.zip,.gz"});

    // TODO better view of where files can be dropped + other styling
    return (
        <div {...getRootProps()} className={classes.dropzone} >
            <input {...getInputProps()} />
            {isDragActive ?
                <p>Release files here</p> :
                <p>Drop .TIFF files here or drag a folder over here</p>  
            }
            <button onClick={() => open}>Upload your files</button>
        </div>
    );
};

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
     * Temporary function that adds some fake paths
     * REMOVE THIS AFTERWARDS
     */
    const addSampleFiles = () => {
        const files = [ {path: "C:\\TEST\\file.tiff", size: "300 GB"}, {path: "C:\\TEST\\file2.tiff", size: "3 kB"}];
        props.setFiles(files);
    }

    /**
     * Handles adding a file. Called by file input element.
     */
    const handleFileAdding = () => {
        const inputFiles = fileInput.current?.files;
        if(inputFiles) {
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
        <Container>
            <h3>Step 1 - File upload</h3>
            <Paper style={{
                height: "20rem",
                color: 'black',
                overflow: "hidden",
                background: '#FCFCFC',
                boxShadow: '0px 0px 19px rgba(0, 0, 0, 0.05)',
                borderRadius: '12px',
            }}>
                {!hasFiles()? 
                <>
                    <FileDropZone updateFiles={props.setFiles}/>
                    {/* <button onClick={() => addSampleFiles()}>sample files</button>     */}
                </> 
                : 
                <> 
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Path</TableCell>
                                    <TableCell>size</TableCell>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.files.map((file, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{file.path}</TableCell>
                                        <TableCell>{file.size}</TableCell>
                                        <TableCell>
                                            <button style={{background: "none", border: "none"}}
                                                        onClick={() => removeFile(index)}
                                            ><DeleteIcon/></button>
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
                            style={{display: "none"}} 
                        />
                        <button style={{marginLeft: "1rem"}} onClick={() => fileInput.current?.click()}>+ add new files</button>
                        <button style={{marginLeft: "auto", marginRight: "1rem"}} onClick={()=>props.progressStep()}>Continue</button>
                    </Box>
                </>
                }
            </Paper>
        </Container>
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