import * as React from 'react';
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
    Button,
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core';
import EditIcon from 'Assets/icons/icons8-edit-property-500.svg';
import TrashIcon from 'Assets/icons/icons8-delete-bin-500.svg';
import PlusIcon from 'Assets/icons/icons8-plus-math-500.svg';
import AddPolicy from 'Components/CreateConfigStages/AddPolicy/AddPolicy';
import LeftArrowIcon from 'Assets/icons/icons8-arrow-500.svg';
import { useTableStyles } from 'Theme/Table';
import MainButton from 'Components/Buttons/MainButton/MainButton';
import TextButton from 'Components/Buttons/TextButton/TextButton';

const DEFAULT = 'default',
    ADD = 'add',
    EDIT = 'edit';
type PolicyCheckerState = 'default' | 'add' | 'edit';

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
        boxButtons: {
            alignSelf: 'flex-end',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: 'auto',
            marginTop: '3Opx',
        },
        leftMargin: {
            margin: '0 25px',
            width: 'auto',
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
            borderBottom: '2px solid #2A4B5B',
            marginRight: '50px'
        },
    })
);

interface PolicyCheckerProps {
    standards: Array<string>;
    addPolicy: (policy: Policy) => void;
    removePolicy: (policy: Policy) => void;
    policies: Array<Policy>;
    progressStep: () => void;
    back: () => void;
}

const PolicyChecker = (props: PolicyCheckerProps) => {
    const [renderState, setRenderState] = React.useState<PolicyCheckerState>('default');
    const classes = useStyles();
    const tableClasses = useTableStyles();

    return (
        <>
            {renderState === DEFAULT ? (
                <>
                    <Button
                        style={{ fontWeight: 600, textTransform: 'none', width: 'auto' }}
                        onClick={() => props.back()}
                    >
                        <img src={LeftArrowIcon} style={{ marginRight: '7px', fontSize: '20px' }} />{' '}
                        Back
                    </Button>
                    <Typography component="span" gutterBottom>
                        <Box
                            fontSize="h6.fontSize"
                            style={{ marginBottom: '40px', textAlign: 'center' }}
                        >
                            Step 3 - Policy
                        </Box>
                    </Typography>
                    <Typography className={classes.label}>ISO</Typography>
                    <Divider className={classes.divider} />
                    {props.standards.map((standard: string, index: number) => {
                        return (
                            <Typography
                                className={`${classes.leftMargin} ${classes.isoElement}`}
                                key={index}
                            >
                                {standard}
                            </Typography>
                        );
                    })}
                    <TableContainer className={`${classes.leftMargin} ${classes.tableContainer}`}>
                        <Table>
                            <TableHead>
                                <TableRow className={classes.tableHeadRow}>
                                    <TableCell className={tableClasses.tableHeadCell}>
                                        Policy
                                    </TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>
                                        Operator
                                    </TableCell>
                                    <TableCell className={tableClasses.tableHeadCell}>
                                        Value
                                    </TableCell>
                                    <TableCell className={tableClasses.tableHeadCell} />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.policies.map((policy: Policy, index: number) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{policy.name}</TableCell>
                                            <TableCell>{policy.type}</TableCell>
                                            <TableCell>{policy.value}</TableCell>
                                            <TableCell>
                                                <Button>
                                                    <img
                                                        src={EditIcon}
                                                        style={{ height: '20px', width: '20px' }}
                                                    />
                                                </Button>
                                                <Button onClick={() => props.removePolicy(policy)}>
                                                    <img
                                                        src={TrashIcon}
                                                        style={{
                                                            height: '20px',
                                                            width: '20px',
                                                            paddingBottom: '4px',
                                                        }}
                                                    />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box display={'flex'} width={'100%'} marginBottom={'20px'} className={classes.boxButtons}>
                        <TextButton
                            style={{ marginLeft: '22px' }}
                            icon={PlusIcon}
                            onClick={() => setRenderState('add')}
                        >
                            Add a policy
                        </TextButton>
                        <MainButton style={{ marginTop: '0' }} onClick={() => props.progressStep()}>
                            Continue
                        </MainButton>
                    </Box>
                </>
            ) : renderState === ADD ? (
                <>
                    {/* <Typography component="span" gutterBottom>
                        <Box
                            fontSize="h6.fontSize"
                            style={{ marginBottom: '40px', textAlign: 'center' }}
                        >
                            Choose a policy to add
                        </Box>
                    </Typography> */}
                    <AddPolicy
                        back={() => {
                            setRenderState(DEFAULT);
                        }}
                        addPolicy={props.addPolicy}
                    />
                </>
            ) : (
                        <>Edit component here</>
                    )}
        </>
    );
};

export default PolicyChecker;
