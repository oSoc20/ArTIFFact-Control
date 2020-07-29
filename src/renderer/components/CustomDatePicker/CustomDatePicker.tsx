import * as React from 'react';
// Material UI
import { TextField, InputAdornment, makeStyles, Theme, createStyles } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
// Icons
import CalendarIcon from 'Assets/icons/icons8-calendar-100 1.svg';
import { format } from 'date-fns';

/* STYLE */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textfield: {
            background: '#F0F0F0',
            borderRadius: '5px 0px 0px 5px',
            paddingLeft: '8px'
        },
        calendarButton: {
            backgroundColor: theme.palette.primary.main,
            height: '100%',
            borderRadius: '0px 5px 5px 0px',
            "&:hover": {
                backgroundColor: theme.palette.primary.dark,
                cursor: 'pointer'
            }
        }
    })
);

/* INTERFACE */
interface CustomDatePickerProps {
    selectedDate: Date | null,
    setSelectedDate: (date: Date | null) => void
}

/* COMPONENT */
const CustomDatePicker = (props: CustomDatePickerProps) => {
    const classes = useStyles();
    const [datePickerOpen, setDatePickerOpen] = React.useState(false);

    const handleDateChange = (date: Date | null) => {
        props.setSelectedDate(date);
        setDatePickerOpen(false);
    };

    return <>
        <TextField
            id="input-with-icon-textfield"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end" className={classes.calendarButton} onClick={() => setDatePickerOpen(true)}>
                        <img src={CalendarIcon} style={{ color: 'white', width: '22px', padding: '5px' }} />
                    </InputAdornment>
                ),
                disableUnderline: true
            }}
            placeholder="DD/MM/YY"
            value={props.selectedDate?.toLocaleDateString()}
            className={classes.textfield}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                autoOk
                onClose={() => setDatePickerOpen(false)}
                margin="normal"
                id="date-picker-dialog"
                format="dd/MM/yy"
                orientation="landscape"
                value={props.selectedDate !== null ? format(props.selectedDate, 'dd/MM/yyyy') : null}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                style={{ display: 'none' }}
                open={datePickerOpen}
            />
        </MuiPickersUtilsProvider>
    </>
}

export default (CustomDatePicker);