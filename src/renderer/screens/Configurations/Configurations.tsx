import * as React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Policy, ReportTypes } from 'Interfaces/Configuration';
import ConfigurationTable, { tempConfigs } from 'Components/ConfigurationTable/ConfigurationTable';
import PlusIcon from 'Assets/icons/icons8-plus-math-500.svg';
import ImportIcon from 'Assets/icons/icons8-import-500.svg';
import ConfigStepper from 'Components/Stepper/Stepper';
import PolicyChecker from 'Components/CreateConfigStages/PolicyChecker/PolicyChecker';
import Report from 'Components/CreateConfigStages/Report/Report';
import StandardPick from 'Components/CreateConfigStages/StandardPick/StandardPick';
import Summary from 'Components/CreateConfigStages/Summary/Summary';
import NameSetter from 'Components/CreateConfigStages/NameSetter/NameSetter';


const STEPS = ['Name', 'Implementation', 'Policy', 'Report', 'Summary'];


export default function Configuration() {

    const [step, setStep] = React.useState<number>(-1);
    const [selectedStandards, setSelectedStandards] = React.useState<Array<string>>([]);
    const [policies, setPolicies] = React.useState<Array<Policy>>([]);
    const [reportTypes, setReportTypes] = React.useState<Array<ReportTypes>>([]);
    const [policyName, setName] = React.useState<string>("");

    const addStandard = (standard: string) => {
        if (!selectedStandards.includes(standard)) {
            setSelectedStandards([...selectedStandards, standard]);
        }
    }

    const removeStandard = (standard: string) => {
        if (selectedStandards.includes(standard)) {
            const newStandards = [...selectedStandards];
            const index = newStandards.indexOf(standard);
            newStandards.splice(index, 1);
            setSelectedStandards(newStandards);
        }
    }

    const addPolicy = (policy: Policy) => {
        if (!policies.includes(policy)) {
            setPolicies([...policies, policy]);
        }
    }

    const removePolicy = (policy: Policy) => {
        if (policies.includes(policy)) {
            const newPolicies = [...policies];
            const index = newPolicies.indexOf(policy);
            newPolicies.splice(index, 1);
            setPolicies(newPolicies);
        }
    }

    const addReportType = (reportType: ReportTypes) => {
        if(!reportTypes.includes(reportType)) {
            setReportTypes([...reportTypes, reportType]);
        }
    }

    const removeReportType = (reportType: ReportTypes) => {
        if (reportTypes.includes(reportType)) {
            const newReportTypes = [...reportTypes];
            const index = newReportTypes.indexOf(reportType);
            newReportTypes.splice(index, 1);
            setReportTypes(newReportTypes);
        }
    }

    const incrementStep = () => {
        setStep(step + 1);
    }

    const goBackOneStep = () => {
        setStep(step - 1);
    }


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
                    />);
            case 2:
                return (
                    <PolicyChecker
                        standards={selectedStandards}
                        addPolicy={addPolicy}
                        removePolicy={removePolicy}
                        policies={policies}
                        progressStep={incrementStep}
                        back={goBackOneStep}
                    />);
            case 3:
                return (<Report 
                    goBackOneStep={goBackOneStep}
                    addReportType={addReportType}
                    removeReportType={removeReportType}
                    progress={incrementStep}
                />);
            case 4:
                return (<Summary 
                    goBack={goBackOneStep}
                    config={{
                        name: policyName,
                        implementation: selectedStandards.toString(),
                        policies: policies,
                        reports: reportTypes
                    }}
                />);
            default:
                return (
                    <>
                        <ConfigurationTable configs={tempConfigs} />
                        <Box display={"flex"} width={"100%"}>
                            <button>
                                <Typography style={{ fontSize: 15 }}>
                                    <img src={ImportIcon} style={{ width: "17px" }} />
                                    import
                                </Typography>
                            </button>
                            <button onClick={() => handleClickCreate()}>
                                <Typography style={{ fontSize: 15 }}>
                                    <img src={PlusIcon} style={{ width: "22px" }} />
                                    new
                                </Typography>
                            </button>
                        </Box>
                    </>
                );
        }
    }

    const handleClickCreate = () => {
        if (step < 0) {
            setStep(step + 1);
        }
    }

    return (
        <>
            <Typography component="span" gutterBottom>
                <Box fontSize='h4.fontSize' fontFamily='"DIN 2014"'>
                    Configuration
                </Box>
            </Typography>
            {renderStep()}
            {step >= 0 && <ConfigStepper stepLabels={STEPS} step={step} />}
        </>
    )
}
