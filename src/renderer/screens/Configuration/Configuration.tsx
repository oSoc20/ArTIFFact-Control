import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box, Paper, Button } from '@material-ui/core';
import { Policy, ReportTypes } from 'Interfaces/Configuration';
import ConfigurationTable, { tempConfigs } from 'Components/ConfigurationTable/ConfigurationTable';
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

const STEPS = ['Name', 'Implementation', 'Policy', 'Report', 'Summary'];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            textAlign: 'center',
            marginTop: '2rem',
            marginBottom: '3rem',
            fontFamily: 'DIN 2014',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '36px',
            lineHeight: '46px',
            color: theme.palette.primary.dark,
        },
        titleIcon: {
            width: '50px',
            marginRight: '20px',
        },
        boxButtons: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
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
        },
        paper: {
            minHeight: '50vh',
        },
    })
);

export default function Configuration() {
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
                            implementation: selectedStandards.toString(),
                            policies: policies,
                            reports: reportTypes,
                        }}
                    />
                );
            default:
                return (
                    <>
                        <ConfigurationTable configs={tempConfigs} />
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={10}>
                                <Box display={'flex'} width={'100%'} className={classes.boxButtons}>
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
                    </>
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
            <Typography component="span" gutterBottom className={classes.title}>
                <Box
                    fontSize="h4.fontSize"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img src={ConfigurationFileIcon} className={classes.titleIcon} />
                    <span>Configuration</span>
                </Box>
            </Typography>
            <Grid container spacing={3}>
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
