import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import ConfigurationTable, { tempConfigs } from 'Components/ConfigurationTable/ConfigurationTable'
import ImportIcon from 'Assets/icons/icons8-import-500.svg';
import PlusIcon from 'Assets/icons/icons8-plus-math-500.svg';
import BackArrow from 'Assets/icons/icons8-arrow-500.svg';


/* Typescript interfaces */

interface Stage2Props {
    goBackOneStep: () => void;
    progressStep: () => void;
}


/* Styling */

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        selected: {
            color: " #FCFCFC"
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
            verticalAlign: "top",
        },
        typography: {
            fontSize: 14,
        },
        confirmButton: {
            backgroundColor: "#2A4B5B",
            borderRadius: "12px",
            width: "127px",
            height: "40px",
            marginLeft: "auto",
            border: "none",
            fontFamily: "'DIN 2014'",
            fontSize: "18px",
            color: "#FCFCFC",
            marginTop: "20px",
            cursor: "pointer",
            "&:disabled": {
                width: "250px",
                backgroundColor: "#CACACA",
                cursor: "no-drop"
            },
        },
        backButton: {
            background: "none",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: 600,
            border: "none",
            margin: 0,
            padding: 0
        },
        arrowBack: {
            width: "16px",
            border: "1px solid black",
            boxSizing: "border-box",
            transform: "matrix(-1, 0, 0, 1, 0, 0)"
        },
        configControlButton: {
            marginRight: "2rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            marginTop: "20px"
        }
    })
);


/* Functions and components */

/**
 * The component that handles the rendering of stage 2 of file checks.
 * This involves selecting a set of policy rules.
 * @param props Props passed in by the parent (FileChecks component)
 */
const Stage2 = (props: Stage2Props) => {
    const classes = useStyles();

    // React state object that holds the currently selected configuration
    // Maybe put this in Redux store in order to use at next stage
    let [currentSelected, setCurrent] = React.useState<null | number>(null);

    return (
        <>
            <button className={classes.backButton} onClick={() => props.goBackOneStep()}><img src={BackArrow} style={{ paddingBottom: "2px", marginRight: "3px" }} />Back</button>
            <Typography component="span" gutterBottom>
                <Box fontSize='h6.fontSize' style={{ marginBottom: '40px', textAlign: "center" }}>
                    Step 2 - TIFF Configuration settings
                </Box>
            </Typography>
            <ConfigurationTable
                configs={tempConfigs}
                selectable
                currentSelected={currentSelected}
                setCurrentSelected={setCurrent}
            />
            <Box display={"flex"} width={"100%"}>
                <button className={classes.configControlButton}>
                    <Typography style={{ fontSize: 15 }}>
                        <img src={ImportIcon} style={{ width: "17px" }} />
                        import
                    </Typography>
                </button>
                <button className={classes.configControlButton}>
                    <Typography style={{ fontSize: 15 }}>
                        <img src={PlusIcon} style={{ width: "22px" }} />
                         new
                    </Typography>
                </button>
                <button disabled={currentSelected == null ? true : false} className={classes.confirmButton} onClick={() => props.progressStep()}>
                    {currentSelected == null ? <>No configuration selected</> : <>Check files</>}
                </button>
            </Box>
        </>
    );
}

export default Stage2