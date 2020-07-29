import * as React from 'react';
import {
    Typography,
    Box,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    FormControl,
    Select,
    Input,
    Switch,
    MenuItem,
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core';
import { Policy } from 'Interfaces/Configuration';
import LeftArrowIcon from 'Assets/icons/icons8-arrow-500.svg';
import { useMainStyles } from 'Theme/Main';
import { useTableStyles } from 'Theme/Table';
import MainButton from 'Components/Buttons/MainButton/MainButton';

interface PolicyRule {
    name: string;
    type: 'number' | 'dropdown' | 'boolean' | 'string';
    options?: Array<number | string>;
    allowAllOperators?: boolean;
}

const POSS_POL = {
    ImageWidth: {
        type: 'number',
    },
    ImageHeight: {
        type: 'number',
    },
};

const POSSIBLE_POLICIES: Array<PolicyRule> = [
    { name: 'ImageWidth', type: 'number' },
    { name: 'ImageHeight', type: 'number' },
    { name: 'LongEdge', type: 'number' },
    { name: 'PixelDensity', type: 'number' },
    { name: 'NumberImages', type: 'number' },
    {
        name: 'BitDepth',
        type: 'dropdown',
        options: [1, 2, 4, 8, 16, 32, 64],
        allowAllOperators: true,
    },
    { name: 'Evenness', type: 'dropdown', options: ['Even', 'Uneven'] },
    { name: 'ExtraChannels', type: 'number' },
    { name: 'EqualXYResolution', type: 'boolean' },
    {
        name: 'Compression',
        type: 'dropdown',
        options: [
            'None',
            'CCITT',
            'PackBits',
            'CCITT GR3',
            'CCITT GR4',
            'LZW',
            'OJPEG',
            'JPEG',
            'Deflate Adobe',
            'JBIG BW',
            'JBIG C',
        ],
    },
    {
        name: 'Photometric',
        type: 'dropdown',
        options: ['Bilevel', 'RGB', 'Palette', 'Transparency Mask', 'CMYK', 'YCbCr', 'CIEELAB'],
    },
    { name: 'Planar', type: 'dropdown', options: ['Chunky', 'Planar'] },
    { name: 'ByteOrder', type: 'dropdown', options: ['BIG_ENDIAN', 'LITTLE_ENDIAN'] },
    { name: 'FileSize', type: 'number' },
    {
        name: 'IccProfileClass',
        type: 'dropdown',
        options: [
            'Abstract',
            'Input',
            'Display',
            'Output',
            'DeviceLink',
            'ColorSpace',
            'NamedColor',
            'Unknown',
        ],
    },
    { name: 'IccProfileName', type: 'string' },
];

/* STYLE */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        label: {
            color: theme.palette.primary.dark,
            marginLeft: '25px',
            fontWeight: 700,
        },
        divider: {
            marginBottom: '1rem',
            marginLeft: '22px',
            marginRight: '22px',
            height: '1px',
            backgroundColor: '#2A4B5B',
        },
        flex: {
            maxWidth: '300px',
            display: 'flex',
            flexFlow: 'column',
            margin: '0 auto',
        },
        leftMargin: {
            margin: '0 25px',
        },
        isoElement: {
            borderBottom: '1px solid #E9E9E9',
            padding: '8px 0',
        },
        tableContainer: {
            maxWidth: '96%',
            minHeight: '30vh',
        },
        tableHeadRow: {
            borderBottom: '1.5px solid #2A4B5B',
        },
        input: {
            border: '2px solid #2A4B5B',
            boxSizing: 'border-box',
            borderRadius: '12px',
            padding: '8px 20px',
            maxWidth: '300px',
            minWidth: '100px',
        },
    })
);

interface AddPolicyProps {
    back: () => void;
    addPolicy: (policy: Policy) => void;
}

const AddPolicy = (props: AddPolicyProps) => {
    const [selectedPolicy, setSelected] = React.useState<PolicyRule | null>(POSSIBLE_POLICIES[0]);
    const [policyName, setPolicyName] = React.useState<string>('ImageWidth');
    const [policyOperator, setOperator] = React.useState<'<' | '=' | '>'>('=');
    const [policyValue, setValue] = React.useState<string | number | boolean>('');
    const classes = useStyles();
    const mainClasses = useMainStyles();
    const tableClasses = useTableStyles();

    /**
     * Handles the change of the policy name.
     * The values for the policy are set to default values in order to avoid
     * warnings.
     * @param event event thats generated upon changing
     */
    const handlePolicyNameChange = (event: any) => {
        const name = event.target.value;
        setPolicyName(name);
        setValue('');
        setOperator('=');
    };

    /**
     * Update the current policy operator
     * @param event event thats generated upon changing
     */
    const handlePolicyOperatorChange = (event: any) => {
        const operator = event.target.value;
        setOperator(operator);
    };

    /**
     * Update the current policy value
     * @param event event thats generated upon chaning
     */
    const handlePolicyValueChange = (event: any) => {
        const value = event.target.value;
        setValue(value);
    };

    /**
     * Get the allowed operators of a certain policy rule
     * @param policyRule policy rule to get the allowed operators from
     */
    const getAllowedOperators = (policyRule: PolicyRule) => {
        const ALL = ['<', '>', '='];

        if (policyRule.allowAllOperators) {
            return ALL;
        }

        switch (policyRule.type) {
            case 'boolean':
                return ['='];
            case 'number':
                return ALL;
            case 'string':
                return ['='];
            case 'dropdown':
                return ['='];
            default:
                return ALL;
        }
    };

    /**
     * Renders the allowed values of a certain policy rule.
     * @param policyRule policy rule of which the options need to be rendered
     */
    const renderAllowedValues = (policyRule: PolicyRule) => {
        switch (policyRule.type) {
            case 'boolean':
                // setValue(false);
                return (
                    <Switch
                        className={classes.input}
                        onChange={(event: any) => setValue(event.target.checked)}
                    />
                );
            case 'number':
                return (
                    <label>
                        <Input
                            placeholder="Number"
                            className={classes.input}
                            disableUnderline={true}
                            type="number"
                            onChange={(event: any) => setValue(event.target.value)}
                        />
                    </label>
                );
            case 'string':
                return (
                    <Input
                        placeholder="Text"
                        className={classes.input}
                        disableUnderline={true}
                        onChange={(event: any) => setValue(event.target.value)}
                    />
                );
            case 'dropdown':
                return (
                    <Select
                        // multiple
                        className={classes.input}
                        disableUnderline={true}
                        value={policyValue}
                        onChange={handlePolicyValueChange}
                    >
                        {policyRule.options?.map((option: string | number, index: number) => {
                            return (
                                <MenuItem key={index} value={option}>
                                    {option}
                                </MenuItem>
                            );
                        })}
                    </Select>
                );
        }
    };

    return (
        <>
            <Button
                style={{ fontWeight: 600, textTransform: 'none', width: 'auto' }}
                onClick={() => props.back()}
            >
                <img src={LeftArrowIcon} style={{ marginRight: '7px', fontSize: '20px' }} /> Back
            </Button>
            <Typography component="span" gutterBottom>
                <Box fontSize="h6.fontSize" style={{ marginBottom: '40px', textAlign: 'center' }}>
                    Step 3 - Policy
                </Box>
            </Typography>
            <TableContainer className={`${classes.leftMargin} ${classes.tableContainer}`}>
                <Table>
                    <TableHead>
                        <TableRow className={tableClasses.tableHeadRow}>
                            <TableCell className={tableClasses.tableHeadCell}>Format</TableCell>
                            <TableCell className={tableClasses.tableHeadCell}>Operator</TableCell>
                            <TableCell className={tableClasses.tableHeadCell}>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <FormControl>
                                    <Select
                                        className={classes.input}
                                        disableUnderline={true}
                                        value={policyName}
                                        onChange={handlePolicyNameChange}
                                    >
                                        {POSSIBLE_POLICIES.map(
                                            (policy: PolicyRule, index: number) => {
                                                return (
                                                    <MenuItem
                                                        key={index}
                                                        value={policy.name}
                                                        onClick={() => setSelected(policy)}
                                                    >
                                                        {policy.name}
                                                    </MenuItem>
                                                );
                                            }
                                        )}
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell>
                                {selectedPolicy && (
                                    <FormControl>
                                        <Select
                                            placeholder="Name for configuration"
                                            className={classes.input}
                                            disableUnderline={true}
                                            value={policyOperator}
                                            onChange={handlePolicyOperatorChange}
                                            defaultValue={'='}
                                        >
                                            {getAllowedOperators(selectedPolicy).map(
                                                (op: string, index: number) => {
                                                    return (
                                                        <MenuItem key={index} value={op}>
                                                            {op}
                                                        </MenuItem>
                                                    );
                                                }
                                            )}
                                        </Select>
                                    </FormControl>
                                )}
                            </TableCell>
                            <TableCell>
                                {selectedPolicy && (
                                    <FormControl>{renderAllowedValues(selectedPolicy)}</FormControl>
                                )}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <MainButton
                disabled={policyValue === ''}
                onClick={() => {
                    let policy: Policy = {
                        name: policyName,
                        type: policyOperator,
                        value: policyValue,
                    };
                    props.addPolicy(policy);
                    props.back();
                }}
            >
                Save rule
            </MainButton>
        </>
    );
};

export default AddPolicy;
