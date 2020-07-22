import * as React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { FileData, setFiles } from 'Actions/FileCheckActions';
import { useDropzone } from 'react-dropzone';
import PublishIcon from '@material-ui/icons/Publish';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { RootState } from 'src/renderer/reducers';
import { SidebarAction, setActiveItem } from 'Actions/SidebarAction';
import { connect } from 'react-redux';

/* Typescript interfaces */

interface DropZoneProps {
    updateFiles: (files: Array<File>) => void;
    setActiveItem: (item: string) => void;
    redirect?: string;
}

/* Styles */

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dropzone: {
            border: "3px dashed #282828",
            boxSizing: "border-box",
            borderRadius: "20px",
            margin: "auto",
            height: 200,
            alignContent: "center",
        }
    })
);


/* Helper functions */


/**
 * Converts an amount of bytes to a clearer representation
 * ex. 10 kB or 10 GB
 * source: https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
 * @param bytes the amount of bytes
 * @param decimals the amount of decimals in the result
 */
export const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + '' + sizes[i];
}


/* Components */

/**
 * React component that handles the file drop zone
 * @param props props that are passed by the parent component
 */
const FileDropZone = (props: DropZoneProps) => {
    const history = useHistory();
    const classes = useStyles();

    /**
     * Callback function that handles the onDrop event
     * Adds the files to the Redux store using the function that is passed in
     * with the props.
     */
    const onDrop = React.useCallback((acceptedFiles: Array<File>) => {
        props.updateFiles(acceptedFiles);
        if(props.redirect !== undefined && props.redirect !== null) {
            props.setActiveItem(props.redirect);
            history.push('/' + props.redirect);
        }
    }, []);

    // Destructure the things we need
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: ".tiff,.TIFF,.tif,.TIF,.zip,.gz" });

    // TODO better view of where files can be dropped + other styling
    return (
        <div {...getRootProps()} className={classes.dropzone} style={{
            display: "flex", justifyContent: "center", alignItems: "center", flexFlow: "column"
        }}>
            <input {...getInputProps()} />
            {isDragActive ?
                <p style={
                    {
                        marginLeft: "auto",
                        marginRight: "auto",
                        textAlign: "center",
                        fontFamily: '"DIN 2014"',
                        fontStyle: "normal",
                        fontWeight: 250,
                        fontSize: "36px",
                        lineHeight: "46px"
                    }
                }>Release files here</p> :
                <p
                    style={{
                        fontFamily: '"DIN 2014"',
                        fontStyle: "normal",
                        fontWeight: 250,
                        fontSize: "36px",
                        lineHeight: "46px",
                        textAlign: "center",
                        color: "#282828"
                    }}
                >Drop .TIFF files here</p>
            }
            <button  onClick={() => open}
                 style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    background: "#FCFCFC",
                    border: "2px solid #282828",
                    boxSizing: "border-box",
                    borderRadius: "12px",
                    width: "220px",
                    height: "50px",
                    marginBottom: "2rem",
    
                    cursor: "pointer",
    
                    fontFamily: "DIN 2014",
                    fontStyle: "normal",
                    fontSize: "18px",
                    lineHeight: "23px",
                }}>
                <PublishIcon style={{marginRight: '5px'}} /> <span style={{fontFamily: 'Open Sans'}}>Upload your files</span>
            </button>
        </div>
    );
};

/* REDUX */
const mapStateToProps = (state: RootState) => ({

});

const mapDispatchToProps = (dispatch: React.Dispatch<SidebarAction>) => ({
    setActiveItem: (item: string) => dispatch(setActiveItem(item)),
});

// Connect to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(FileDropZone);