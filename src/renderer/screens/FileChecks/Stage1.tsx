import * as React from 'react';
import { useState, useCallback } from 'react'
import {useDropzone} from 'react-dropzone'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Container, TableContainer, TableCell, TableHead, TableBody, TableRow, Table } from '@material-ui/core'
import {default as DeleteIcon } from '@material-ui/icons/DeleteForever';


interface FileData {
    path: string;
    size: string;
}


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
                size: file.size
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
}


export const Stage1 = (props: Stage1Props) => {
    const classes = useStyles();

    let [files, setFiles] = useState<Array<FileData>>([])

    const hasFiles = () => {
        return files.length !== 0;
    }

    const removeFile = (index: number) => {
        // React state only updates if setFiles callback is called
        // Therefore we create a copy of the current array, slice it and
        // then update using setFiles callback
        let filesCopy = [...files];
        filesCopy.splice(index, 1);
        setFiles(filesCopy);
    }

    const addSampleFiles = () => {
        const files = [ {path: "C://TEST/file.tiff", size: "300GB"}, {path: "C://TEST//file2.tiff", size: "3kb"}];
        setFiles(files);
    }

    return (
        <Container>
            <h3>Step 1 - File upload</h3>
            <Box className={classes.fileContainer} >
                {!hasFiles()? 
                <>
                    <h3>Step 1 - File upload</h3>
                    <FileDropZone updateFiles={setFiles}/>
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
                                {files.map((file, index) => {
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
                        <button style={{marginLeft: "1rem"}}>+ add new files</button>
                        <button style={{marginLeft: "auto", marginRight: "1rem"}} onClick={()=>props.progressStep()}>Continue</button>
                    </Box>
                    
                </>
                }
            </Box>
        </Container>
    );
}