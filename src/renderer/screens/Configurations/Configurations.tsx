import * as React from 'react';
import { Typography, Box } from '@material-ui/core';
import ConfigurationTable, { tempConfigs } from 'Components/ConfigurationTable/ConfigurationTable';
import PlusIcon from 'Assets/icons/icons8-plus-math-500.svg';
import ImportIcon from 'Assets/icons/icons8-import-500.svg';
import ConfigStepper from 'Components/Stepper/Stepper';
import PolicyChecker from 'Components/CreateConfigStages/PolicyChecker/PolicyChecker';
import Report from 'Components/CreateConfigStages/Report/Report';
import StandardPick from 'Components/CreateConfigStages/StandardPick/StandardPick';
import Summary from 'Components/CreateConfigStages/Summary/Summary';


const STEPS = ['Implementation', 'Policy check', 'Report', 'Summary'];


export default function Configuration() {

    const [step, setStep] = React.useState<number>(-1);
    const [selectedStandards, setSelectedStandards] = React.useState<Array<string>>([]);

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
                    <StandardPick
                        addStandard={addStandard}
                        removeStandard={removeStandard}
                        progressStep={incrementStep}
                        goBackOneStep={goBackOneStep}
                        standardCount={selectedStandards.length}
                    />);
            case 1:
                return (<PolicyChecker />);
            case 2:
                return (<Report />);
            case 3:
                return (<Summary />);
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
