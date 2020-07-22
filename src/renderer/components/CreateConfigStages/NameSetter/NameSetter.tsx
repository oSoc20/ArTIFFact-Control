import * as React from 'react';
import { Typography, Box, Divider, FormControl, Input, Button } from '@material-ui/core';


interface NameSetterProps {
    setName: (name: string) => void;
    readonly name: string;
    continue: () => void;
    back: () => void;
}


const NameSetter = (props: NameSetterProps) => {
    return (
        <>
            <Button onClick={() => props.back()}>Back</Button>
            <Typography component="span" gutterBottom>
                <Box fontSize='h6.fontSize' style={{ marginBottom: '40px', textAlign: "center" }}>
                    Step 1 - Name
                </Box>
            </Typography>
            <Typography>Name for the configuration</Typography>
            <Divider style={{height: "2px"}} />
            <FormControl>
                <Input onChange={(event) => props.setName(event.target.value)} value={props.name} type="text" />
            </FormControl>
            <Button onClick={() => props.continue()}>Continue</Button>
        </>
    );
}

export default NameSetter;