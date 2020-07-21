import *  as React from 'react';
import { Policy } from 'Interfaces/Configuration';
import {
    Box,
    Typography,
    Divider,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button
} from '@material-ui/core';
import EditIcon from 'Assets/icons/icons8-edit-property-500.svg';
import TrashIcon from 'Assets/icons/icons8-delete-bin-500.svg';
import AddPolicy from 'Components/AddPolicy/AddPolicy';


const DEFAULT = 'default', ADD = 'add', EDIT = 'edit';
type PolicyCheckerState = "default" | "add" | "edit";



interface PolicyCheckerProps {
    standards: Array<string>;
    addPolicy: (policy: Policy) => void;
    removePolicy: (policy: Policy) => void;
    policies: Array<Policy>;
    progressStep: () => void;
}


const PolicyChecker = (props: PolicyCheckerProps) => {

    const [renderState, setRenderState] = React.useState<PolicyCheckerState>("default");


    const backToDefault = () => {
        setRenderState(DEFAULT);
    }

    return (
        <>  {
            renderState === DEFAULT ?
                <>
                    <Typography component="span" gutterBottom>
                        <Box fontSize='h6.fontSize' style={{ marginBottom: '40px', textAlign: "center" }}>
                            Step 2 - Policy checker
                        </Box>
                    </Typography>
                    <Typography>ISO</Typography>
                    <Divider style={{ height: '1px' }} />
                    {props.standards.map((standard: string, index: number) => {
                        return (
                            <Typography key={index}>{standard}</Typography>
                        );
                    })}
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Custom policies</TableCell>
                                    <TableCell>Operator</TableCell>
                                    <TableCell>Value</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.policies.map((policy: Policy, index: number) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{policy.lhs}</TableCell>
                                            <TableCell>{policy.operator}</TableCell>
                                            <TableCell>{policy.rhs}</TableCell>
                                            <TableCell>
                                                <Button>
                                                    <img src={EditIcon} style={{ height: "10px", width: "10px" }} />
                                                </Button>
                                                <Button>
                                                    <img src={TrashIcon} style={{ height: "10px", width: "10px", paddingBottom: "4px" }} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button onClick={() => setRenderState('add')}>+ Add rule</Button>
                    <Button onClick={() => props.progressStep()}>Continue</Button>
                </> :
                renderState === ADD ?
                    <>
                        <Typography component="span" gutterBottom>
                            <Box fontSize='h6.fontSize' style={{ marginBottom: '40px', textAlign: "center" }}>
                                Choose a policy to add
                        </Box>
                        </Typography>
                        <AddPolicy back={() => {setRenderState(DEFAULT)}} addPolicy={props.addPolicy} />
                    </> :
                    <>


                    </>
        }

        </>
    );
}

export default PolicyChecker;