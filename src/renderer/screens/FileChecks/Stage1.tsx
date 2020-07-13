import * as React from 'react';
import { useCallback, createRef } from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from 'Reducers';
import { FilecheckAction, clearFiles, setFiles, FileData } from 'Actions/FileCheckActions';
import {useDropzone} from 'react-dropzone'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Container, TableContainer, TableCell, TableHead, TableBody, TableRow, Table } from '@material-ui/core'
import {default as DeleteIcon } from '@material-ui/icons/DeleteForever';


const useStyles = makeStyles((theme: Theme) => 
    createStyles({
      container: {
          background: "#eee"
      },
      fileContainer: {
          border: "2px dashed grey",
          borderRadius: "5px",
          margin: "5rem"
      },
      centered: {
          marginLeft: "auto",
          marginRight: "auto"
      }
    })
);

const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

interface DropZoneProps {
    updateFiles: any;
}

const FileDropZone = (props: DropZoneProps) => {
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles, typeof(acceptedFiles));
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
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    // TODO better view of where files can be dropped

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ?
                <p>Release files here</p> :
                <p>Drop .TIFF files here</p>  
            }
        </div>
    );
};


interface Stage1Props {
    progressStep: () => void;
    files: Array<FileData>;
    clearFiles: () => void;
    setFiles: (files: Array<FileData>) => void
}


const Stage1 = (props: Stage1Props) => {
    const classes = useStyles();
    const fileInput = createRef<HTMLInputElement>();

   // let [files, setFiles] = useState<Array<FileData>>([])

    const hasFiles = () => {
        return props.files.length !== 0;
    }

    const removeFile = (index: number) => {
        // React state only updates if setFiles callback is called
        // Therefore we create a copy of the current array, slice it and
        // then update using setFiles callback
        let filesCopy = [...props.files];
        filesCopy.splice(index, 1);
        props.setFiles(filesCopy);
    }

    const addSampleFiles = () => {
        const files = [ {path: "C:\\TEST\\file.tiff", size: "300 GB"}, {path: "C:\\TEST\\file2.tiff", size: "3 kB"}];
        props.setFiles(files);
    }

    const handleFileAdding = (event: any) => {
        const fileObject = fileInput.current?.files;
        if(fileObject) {
            const fileList = Array.from(fileObject);
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
            <Box className={classes.fileContainer} >
                {!hasFiles()? 
                <>
                    <h3>Step 1 - File upload</h3>
                    <FileDropZone updateFiles={props.setFiles}/>
                    <button onClick={() => addSampleFiles()}>Upload your files</button>    
                </> 
                : 
                <> 
                    <TableContainer>
                        <Table>
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
                        <input multiple onChange={(event) => handleFileAdding(event)} ref={fileInput} type={"file"} style={{display: "none"}} />
                        <button style={{marginLeft: "1rem"}} onClick={() => fileInput.current?.click()}>+ add new files</button>
                        <button style={{marginLeft: "auto", marginRight: "1rem"}} onClick={()=>props.progressStep()}>Continue</button>
                    </Box>
                </>
                }
            </Box>
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


export default connect(mapStateToProps, mapDispatchToProps)(Stage1);