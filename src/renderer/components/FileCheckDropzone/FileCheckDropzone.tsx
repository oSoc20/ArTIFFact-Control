import * as React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useDropzone } from 'react-dropzone';
import PublishIcon from '@material-ui/icons/Publish';
import { Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { RootState } from 'src/renderer/reducers';
import { SidebarAction, setActiveItem } from 'Actions/SidebarAction';
import { connect } from 'react-redux';

/* Typescript interfaces */

interface DropZoneProps {
    updateFiles: (files: Array<File>) => void;
    setActiveItem: (item: string) => void;
    redirect?: string;
    dashboardVersion?: boolean;
}

/* Styles */

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dropzoneWrapper: {
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            margin: "auto",
            height: (props: DropZoneProps) => props.dashboardVersion ? "170px" : "250px",
            alignContent: "center",
        },
        dashedBorderSVG: {
            position: "absolute",
            top: "0px",
            left: "0px",
            height: "100%",
            width: "100%",
            overflow: "visible",
            userSelect: "none",
            pointerEvents: "none",
        },
        rectDashedBorder: {
            fill: "none",
            stroke: "black",
            strokeWidth: "1",
            strokeDasharray: "15, 15"
        },
        dropzone: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexFlow: (props: DropZoneProps) => props.dashboardVersion ? "row" : "column",
            boxSizing: "border-box",
            margin: "0 auto",
            alignContent: "center",
            width: "100%",
            height: "100%",
            borderRadius: '16px',
            "&:hover": {
                cursor: 'pointer',
            },
            "&:focus": {
                outline: 'none'
            }
        },
        dropzoneText: {
            marginLeft: (props: DropZoneProps) => props.dashboardVersion ? "0" : "auto",
            marginRight: (props: DropZoneProps) => props.dashboardVersion ? "0" : "auto",
            textAlign: "center",
            fontFamily: '"DIN 2014"',
            fontStyle: "normal",
            fontWeight: 250,
            fontSize: "36px",
            lineHeight: "46px"
        },
        uploadButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: theme.palette.grey[100],
            border: "2px solid " + theme.palette.grey[500],
            boxSizing: "border-box",
            borderRadius: "12px",
            width: "220px",
            height: "50px",
            margin: (props: DropZoneProps) => props.dashboardVersion ? "0 2rem 0 0" : " 0 0 2rem 0",
            cursor: "pointer",
            fontFamily: "DIN 2014",
            fontStyle: "normal",
            fontSize: "18px",
            lineHeight: "23px",
            textTransform: 'none'
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
    const classes = useStyles(props);

    /**
     * Callback function that handles the onDrop event
     * Adds the files to the Redux store using the function that is passed in
     * with the props.
     */
    const onDrop = React.useCallback((acceptedFiles: Array<File>) => {
        console.log(acceptedFiles);
        props.updateFiles(acceptedFiles);
        if (props.redirect !== undefined && props.redirect !== null) {
            props.setActiveItem(props.redirect);
            history.push('/' + props.redirect);
        }
    }, []);

    // Destructure the things we need
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: ".tiff,.TIFF,.tif,.TIF,.zip,.gz" });

    // TODO better view of where files can be dropped + other styling
    return (
        <div className={classes.dropzoneWrapper}>
            <svg className={classes.dashedBorderSVG} width="100%" height="100%" preserveAspectRatio="none">
                <rect className={classes.rectDashedBorder} x="0" y="0" width="100%" height="100%" rx="20" ry="20" />
            </svg>
            <div {...getRootProps()} className={classes.dropzone}>
                <input {...getInputProps()} />
                {isDragActive ?
                    <p className={classes.dropzoneText}>Release files here</p> :
                    <p className={classes.dropzoneText}>Drop .TIFF files here</p>
                }
                {props.dashboardVersion ? <Typography style={{ margin: "0 10%"}}>Or</Typography> : null}
                <Button className={classes.uploadButton} onClick={() => open}>
                    <PublishIcon style={{ marginRight: '5px' }} /> <span style={{ fontFamily: 'Open Sans' }}>Upload your files</span>
                </Button>
            </div>
        </div >
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