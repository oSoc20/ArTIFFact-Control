import { withStyles, Theme, createStyles, TableRow, makeStyles } from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";


/* TABLES */
export const useTableStyles = makeStyles((theme: Theme) =>
    createStyles({
        tableHeadRow: {
            borderBottom: '1px solid black'
        },
        tableHeadCell: {
            color: theme.palette.primary.main,
            fontWeight: 700
        },
        pagination: {
            marginLeft: '20px',
            marginRight: '20px',
            color: theme.palette.primary.main,
            fontWeight: 600
        },
        paginationArrow: {
            "&:hover": {
                cursor: 'pointer'
            }
        },
        paginationArrowDisabled: {
            filter: 'grayscale(100%)',
            opacity: '25%'
        }
    })
);

export const StyledTableRow1 = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            }
        }
    })
)(TableRow);

export const StyledTableRow2 = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
            '&:hover': {
                backgroundColor: theme.palette.secondary.light,
                cursor: 'pointer'
            }
        }
    })
)(TableRow);

export const TableCell = withStyles({
    root: {
        borderBottom: "none"
    }
})(MuiTableCell);