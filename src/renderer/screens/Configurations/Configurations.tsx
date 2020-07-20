import * as React from 'react';
import { Typography, Box } from '@material-ui/core';
import ConfigurationTable, {tempConfigs} from 'Components/ConfigurationTable/ConfigurationTable';
import PlusIcon from 'Assets/icons/icons8-plus-math-500.svg';
import ImportIcon from 'Assets/icons/icons8-import-500.svg';


export default function Configuration() {
    return (
        <>
            <Typography component="span" gutterBottom>
                <Box fontSize='h4.fontSize' fontFamily='"DIN 2014"'>
                    Configuration
                </Box>
                <ConfigurationTable configs={tempConfigs}/>
                <Box display={"flex"} width={"100%"}>
                <button>
                    <Typography style={{ fontSize: 15 }}>
                        <img src={ImportIcon} style={{ width: "17px" }} />
                        import
                    </Typography>
                </button>
                <button>
                    <Typography style={{ fontSize: 15 }}>
                        <img src={PlusIcon} style={{ width: "22px" }} />
                         new
                    </Typography>
                </button>
            </Box>
            </Typography>
        </>
    )
}
