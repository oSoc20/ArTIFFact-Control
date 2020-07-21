import *  as React from 'react';
import { Typography, Box, Button } from '@material-ui/core';
import { Configuration } from 'Interfaces/Configuration';


interface SummaryProps {
    goBack: () => void;
    config: Configuration;
}


const Summary = (props: SummaryProps) => {
    return (
        <>
            <Button onClick={() => props.goBack()}>Back</Button>
            <Typography component="span" gutterBottom>
                <Box fontSize='h6.fontSize' style={{ marginBottom: '40px', textAlign: "center" }}>
                    Step 5 - Summary
                </Box>
            </Typography>
            <Typography>Name: </Typography>
            <Typography>Implementation: </Typography>
            <Typography>Policy: </Typography>
            <Typography>Report: </Typography>
            <Button>Save configuration</Button>
        </>
    );
}

export default Summary;