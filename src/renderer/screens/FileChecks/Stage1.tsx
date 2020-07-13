import * as React from 'react';
import { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Container, TableContainer, TableCell, TableHead, TableBody, TableRow } from '@material-ui/core'
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


export const Stage1 = () => {
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
                    <p>Drop .TIFF files here</p>
                    <button onClick={() => addSampleFiles()}>Upload your files</button>    
                </> 
                : 
                <> 
                    <TableContainer>
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
                    </TableContainer>
                    <small>+ add items</small>
                </>
                }
                
            </Box>
        </Container>
    );
}