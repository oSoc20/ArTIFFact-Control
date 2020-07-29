import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box, Paper, Button } from '@material-ui/core';
import { Policy, ReportTypes } from 'Interfaces/Configuration';
import ConfigurationTable from 'Components/ConfigurationTable/ConfigurationTable';
import PlusIcon from 'Assets/icons/icons8-plus-math-500.svg';
import ImportIcon from 'Assets/icons/icons8-import-500.svg';
import ConfigurationFileIcon from 'Assets/icons/icons8-administrative-tools-100.svg';
import ConfigStepper from 'Components/Stepper/Stepper';
import PolicyChecker from 'Components/CreateConfigStages/PolicyChecker/PolicyChecker';
import Report from 'Components/CreateConfigStages/Report/Report';
import StandardPick from 'Components/CreateConfigStages/StandardPick/StandardPick';
import Summary from 'Components/CreateConfigStages/Summary/Summary';
import NameSetter from 'Components/CreateConfigStages/NameSetter/NameSetter';
import { useMainStyles } from 'Theme/Main';
import { removeConfiguration, ConfigurationAction, loadConfigs } from 'Actions/ConfigurationActions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from 'src/renderer/reducers';
import {Configuration as ConfigInterface} from 'Interfaces/Configuration'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        boxButtons: {
            alignSelf: 'flex-end',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            marginLeft: 'auto',
        },
        button: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            backgroundColor: '#FCFCFC',
            margin: '0 46px',
            fontSize: '16px',
            textTransform: 'none',
            cursor: 'pointer',
        },
        paper: {
            minHeight: '50vh',
            position: 'relative',
        },
        tabel: {
            minHeight: '50vh',
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'space-between',
        },
    })
);

const STEPS = ['Name', 'Implementation', 'Policy', 'Report', 'Summary'];

interface ConfigProps{
    loadConfigs: () => void;
    removeConfiguration: (config: ConfigInterface) => void;
    configs: Array<ConfigInterface>;
}

const Configuration = (props: ConfigProps) => {
    const [step, setStep] = React.useState<number>(-1);
    const [selectedStandards, setSelectedStandards] = React.useState<Array<string>>([]);
    const [policies, setPolicies] = React.useState<Array<Policy>>([]);
    const [reportTypes, setReportTypes] = React.useState<Array<ReportTypes>>([]);
    const [policyName, setName] = React.useState<string>('');
    const classes = useStyles();
    const mainClasses = useMainStyles();

    // Reset everything if we are back on the configuration overview
    React.useEffect(() => {
        if (step === -1) {
            setSelectedStandards([]);
            setPolicies([]);
            setReportTypes([]);
            setName('');
        }
    }, [step]);

    React.useEffect(() => {
        props.loadConfigs();
    }, []);

    /**
     * Add standard to selected standards
     * @param standard standard to add
     */
    const addStandard = (standard: string) => {
        if (!selectedStandards.includes(standard)) {
            setSelectedStandards([...selectedStandards, standard]);
        }
    };

    /**
     * Remove standard from the list of selected standard
     * @param standard standard to remove
     */
    const removeStandard = (standard: string) => {
        if (selectedStandards.includes(standard)) {
            const newStandards = [...selectedStandards];
            const index = newStandards.indexOf(standard);
            newStandards.splice(index, 1);
            setSelectedStandards(newStandards);
        }
    };

    /**
     * Add a policy check to the configuration
     * @param policy policy check to add
     */
    const addPolicy = (policy: Policy) => {
        if (!policies.includes(policy)) {
            setPolicies([...policies, policy]);
        }
    };

    /**
     * Remove policy check from the configuration
     * @param policy policy to remove
     */
    const removePolicy = (policy: Policy) => {
        if (policies.includes(policy)) {
            const newPolicies = [...policies];
            const index = newPolicies.indexOf(policy);
            newPolicies.splice(index, 1);
            setPolicies(newPolicies);
        }
    };

    /**
     * Add report type to generate to the configuration
     * @param reportType report type to add
     */
    const addReportType = (reportType: ReportTypes) => {
        if (!reportTypes.includes(reportType)) {
            setReportTypes([...reportTypes, reportType]);
        }
    };

    /**
     * Remove report type from the configuration
     * @param reportType report type to remove
     */
    const removeReportType = (reportType: ReportTypes) => {
        if (reportTypes.includes(reportType)) {
            const newReportTypes = [...reportTypes];
            const index = newReportTypes.indexOf(reportType);
            newReportTypes.splice(index, 1);
            setReportTypes(newReportTypes);
        }
    };

    const incrementStep = () => {
        setStep(step + 1);
    };

    const goBackOneStep = () => {
        setStep(step - 1);
    };

    /**
     * Render the current step of the create configuration flow
     */
    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <NameSetter
                        setName={setName}
                        continue={incrementStep}
                        back={goBackOneStep}
                        name={policyName}
                    />
                );
            case 1:
                return (
                    <StandardPick
                        addStandard={addStandard}
                        removeStandard={removeStandard}
                        continue={incrementStep}
                        back={goBackOneStep}
                        standardCount={selectedStandards.length}
                        currentStandards={selectedStandards}
                    />
                );
            case 2:
                return (
                    <PolicyChecker
                        standards={selectedStandards}
                        addPolicy={addPolicy}
                        removePolicy={removePolicy}
                        policies={policies}
                        progressStep={incrementStep}
                        back={goBackOneStep}
                    />
                );
            case 3:
                return (
                    <Report
                        goBackOneStep={goBackOneStep}
                        addReportType={addReportType}
                        removeReportType={removeReportType}
                        progress={incrementStep}
                        currentReports={reportTypes}
                    />
                );
            case 4:
                return (
                    <Summary
                        goBack={goBackOneStep}
                        config={{
                            name: policyName,
                            profiles: selectedStandards,
                            policies: policies,
                            reports: reportTypes,
                        }}
                       resetStep={() => setStep(-1)}
                    />
                );
            default:
                return (
                        <div className={classes.tabel}>
                            <ConfigurationTable configs={props.configs} removeConfig={props.removeConfiguration}/>
                            <Grid container spacing={10}>
                                <Grid item xs={12} lg={12}>
                                    <Box
                                        display={'flex'}
                                        width={'100%'}
                                        className={classes.boxButtons}
                                    >
                                        <Button className={classes.button}>
                                            <img
                                                src={ImportIcon}
                                                style={{ width: '17px', marginRight: '8px' }}
                                            />
                                            import
                                        </Button>
                                        <Button
                                            onClick={() => handleClickCreate()}
                                            className={classes.button}
                                        >
                                            <img
                                                src={PlusIcon}
                                                style={{ width: '22px', marginRight: '8px' }}
                                            />
                                            new
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </div>
                );
        }
    };

    /**
     * Handler thats called when the create new configuration button is pressed
     */
    const handleClickCreate = () => {
        if (step < 0) {
            setStep(step + 1);
        }
    };

    return (
        <>
            <Typography component="span" gutterBottom className={mainClasses.topTitle}>
                <Box
                    fontSize="h4.fontSize"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img src={ConfigurationFileIcon} className={mainClasses.topTitleIcon} />
                    <span>Configuration</span>
                </Box>
            </Typography>
            <Grid container spacing={10}>
                <Grid item xs={12} lg={10} style={{ margin: 'auto' }}>
                    <Paper className={`${mainClasses.paper} ${classes.paper}`}>
                        {renderStep()}
                    </Paper>
                    {step >= 0 && <ConfigStepper stepLabels={STEPS} step={step} />}
                </Grid>
            </Grid>
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
    removeConfiguration: (config: ConfigInterface) => dispatch(removeConfiguration(config))
});


export default connect(mapStateToProps, mapDispatchToProps)(Configuration);