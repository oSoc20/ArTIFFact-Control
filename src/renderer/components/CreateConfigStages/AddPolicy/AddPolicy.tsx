import * as React from 'react';
import { Typography, Box, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, FormControl, Select, Switch, MenuItem } from '@material-ui/core';
import { Policy } from 'Interfaces/Configuration';

interface PolicyRule {
    name: string;
    type: 'number' | 'dropdown' | 'boolean' | 'string',
    options?: Array<number | string>;
    allowAllOperators?: boolean;
}

const POSS_POL = {
    ImageWidth: {
        type: "number"
    },
    ImageHeight: {
        type: "number"
    }
}

const POSSIBLE_POLICIES: Array<PolicyRule> = [
    { name: "ImageWidth", type: "number" },
    { name: "ImageHeight", type: "number" },
    { name: "LongEdge", type: "number" },
    { name: "PixelDensity", type: "number" },
    { name: "NumberImages", type: "number" },
    { name: "BitDepth", type: "dropdown", options: [1, 2, 4, 8, 16, 32, 64], allowAllOperators: true },
    { name: "Evenness", type: "dropdown", options: ["Even", "Uneven"] },
    { name: "ExtraChannels", type: "number" },
    { name: "EqualXYResolution", type: "boolean" },
    { name: "Compression", type: "dropdown", options: ["None", "CCITT", "PackBits", "CCITT GR3", "CCITT GR4", "LZW", "OJPEG", "JPEG", "Deflate Adobe", "JBIG BW", "JBIG C"] },
    { name: "Photometric", type: "dropdown", options: ["Bilevel", "RGB", "Palette", "Transparency Mask", "CMYK", "YCbCr", "CIEELAB"] },
    { name: "Planar", type: "dropdown", options: ["Chunky", "Planar"] },
    { name: "ByteOrder", type: "dropdown", options: ["BIG_ENDIAN", "LITTLE_ENDIAN"] },
    { name: "FileSize", type: "number" },
    { name: "IccProfileClass", type: "dropdown", options: ["Abstract", "Input", "Display", "Output", "DeviceLink", "ColorSpace", "NamedColor", "Unknown"] },
    { name: "IccProfileName", type: "string" }
]


interface AddPolicyProps {
    back: () => void;
    addPolicy: (policy: Policy) => void;
}


const AddPolicy = (props: AddPolicyProps) => {

    const [selectedPolicy, setSelected] = React.useState<PolicyRule | null>(POSSIBLE_POLICIES[0])
    const [policyName, setPolicyName] = React.useState<string>("ImageWidth");
    const [policyOperator, setOperator] = React.useState<'<' | '=' | '>'>("=");
    const [policyValue, setValue] = React.useState<string | number | boolean>("");

    const handlePolicyNameChange = (event: any) => {
        const name = event.target.value;
        setPolicyName(name);
        setValue("");
        setOperator('=');
    }

    const handlePolicyOperatorChange = (event: any) => {
        const operator = event.target.value;
        setOperator(operator);
    }

    const handlePolicyValueChange = (event: any) => {
        const value = event.target.value;
        setValue(value);
    }

    const getAllowedOperators = (policyRule: PolicyRule) => {
        const ALL = ["<", ">", "="];

        if (policyRule.allowAllOperators) {
            return ALL;
        }
        switch (policyRule.type) {
            case "boolean":
                return ['='];
            case "number":
                return ALL;
            case "string":
                return ['='];
            case "dropdown":
                return ['='];
            default:
                return ALL;
        }
    }

    const renderAllowedValues = (policyRule: PolicyRule) => {
        switch (policyRule.type) {
            case "boolean":
                return <Switch onChange={(event: any) => setValue(event.target.checked)} />
            case "number":
                return <label><input type="number" onChange={(event: any) => setValue(event.target.value)} /></label>
            case "string":
                return <input onChange={(event: any) => setValue(event.target.value)} />
            case "dropdown":
                return (
                    <Select
                        value={policyValue}
                        onChange={handlePolicyValueChange}
                    >
                        {policyRule.options?.map((option: string | number, index: number) => {
                            return <MenuItem key={index} value={option}>{option}</MenuItem>
                        })}
                    </Select>);
        }
    }

    return (
        <>
            <Button onClick={() => props.back()}>Back</Button>
            <Typography component="span" gutterBottom>
                <Box fontSize='h6.fontSize' style={{ marginBottom: '40px', textAlign: "center" }}>
                    Choose a policy to add
                </Box>
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Format</TableCell>
                            <TableCell>Operator</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <FormControl>
                                    <Select
                                        value={policyName}
                                        onChange={handlePolicyNameChange}
                                    >
                                        {POSSIBLE_POLICIES.map((policy: PolicyRule, index: number) => {
                                            return (
                                                <MenuItem key={index} value={policy.name} onClick={() => setSelected(policy)} >{policy.name}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell>
                                {selectedPolicy && <FormControl>

                                    <Select
                                        value={policyOperator}
                                        onChange={handlePolicyOperatorChange}
                                        defaultValue={'='}
                                    >
                                        {getAllowedOperators(selectedPolicy).map((op: string, index: number) => {
                                            return <MenuItem key={index} value={op}>{op}</MenuItem>
                                        })}

                                    </Select>
                                </FormControl>}
                            </TableCell>
                            <TableCell>
                                {selectedPolicy && <FormControl>
                                    {renderAllowedValues(selectedPolicy)}
                                </FormControl>}
                            </TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
            </TableContainer>
            <Button onClick={() => {
                let policy: Policy = {
                    lhs: policyName,
                    operator: policyOperator,
                    rhs: policyValue
                }
                props.addPolicy(policy);
                props.back();
            }}>Save rule</Button>
        </>
    );
}


export default AddPolicy;