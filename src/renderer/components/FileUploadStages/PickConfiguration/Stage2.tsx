import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Box, Typography, Paper, Button } from '@material-ui/core';
import ConfigurationTable, { tempConfigs } from 'Components/ConfigurationTable/ConfigurationTable'
import ImportIcon from 'Assets/icons/icons8-import-500.svg';
import PlusIcon from 'Assets/icons/icons8-plus-math-500.svg';
import BackArrow from 'Assets/icons/icons8-arrow-500.svg';
import { ConfigurationAction, loadConfigs, removeConfiguration } from 'Actions/ConfigurationActions';
import { Configuration } from 'Interfaces/Configuration';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from 'src/renderer/reducers';
import { useMainStyles } from 'Theme/Main';


/* Typescript interfaces */

interface Stage2Props {
    goBackOneStep: () => void;
    progressStep: () => void;
    loadConfigs: () => void;
    removeConfiguration: (config: Configuration) => void;
    configs: Array<Configuration>;
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
        configButton: {
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
    const mainClasses = useMainStyles();

    // React state object that holds the currently selected configuration
    // Maybe put this in Redux store in order to use at next stage
    let [currentSelected, setCurrent] = React.useState<null | number>(null);

    React.useEffect(() => {
        props.loadConfigs();
    }, []);

    return (
        <>
            <Paper className={mainClasses.paper}>
                <button className={classes.backButton} onClick={() => props.goBackOneStep()}><img src={BackArrow} style={{ paddingBottom: "2px", marginRight: "3px" }} />Back</button>
                <Typography component="span" gutterBottom>
                    <Box fontSize='h6.fontSize' style={{ marginBottom: '40px', textAlign: "center" }}>
                        Step 2 - TIFF Configuration settings
                </Box>
                </Typography>
                <ConfigurationTable
                    configs={props.configs}
                    selectable
                    currentSelected={currentSelected}
                    setCurrentSelected={setCurrent}
                    removeConfig={props.removeConfiguration}
                />
                <Box display={"flex"} width={"100%"} marginTop={"30px"}>
                    <Button
                        className={classes.configButton}
                    >
                        <img
                            src={ImportIcon}
                            style={{ width: '17px', marginRight: '8px' }}
                        />
                            import
                    </Button>
                    <Button
                        className={classes.configButton}
                    >
                        <img
                            src={PlusIcon}
                            style={{ width: '22px', marginRight: '8px' }}
                        />
                            new
                    </Button>
                    <button disabled={currentSelected == null ? true : false} className={classes.confirmButton} onClick={() => props.progressStep()}>
                        {currentSelected == null ? <>No configuration selected</> : <>Check files</>}
                    </button>
                </Box>
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
    configs: state.configuration.configs
});

/**
 * Function that maps dispatch functions to props
 * @param dispatch the dispatch function used by Redux
 */
const mapDispatchToProps = (dispatch: Dispatch<ConfigurationAction>) => ({
    loadConfigs: () => dispatch(loadConfigs()),
    removeConfiguration: (config: Configuration) => dispatch(removeConfiguration(config))
});


export default connect(mapStateToProps, mapDispatchToProps)(Stage2);