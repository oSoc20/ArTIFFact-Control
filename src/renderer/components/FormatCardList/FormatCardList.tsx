import * as React from 'react';
import FormatCard from 'Components/FormatCard/FormatCard';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

/* STYLE */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            display: 'flex',
            alignItems: 'normal',
            justifyContent: 'space-between'
        }
    })
);

/* INTERFACE */
interface FormatCardListProps {
    formats: Array<Format> | undefined | null,
    listWidth?: string,
    cardsWidth?: string,
    cardsHeight?: string
}

/* COMPONENT */
const FormatCardList = (props: FormatCardListProps) => {
    const classes = useStyles();
    let color: string;
    let width = props.listWidth !== undefined ? props.listWidth : '500px';

    const getColor = (format: string): string => {
        let color: string;

        switch (format.toLocaleLowerCase()) {
            case 'html':
                color = '#52BF7E';
                break;
            case 'pdf':
                color = '#A63B3B';
                break;
            case 'xml':
                color = '#41A5C0';
                break;
            case 'json':
                color = '#CC7E2D';
                break;
            case 'mets':
                color = '#875EC4';
                break;
            default:
                color = '#F2F2F2'
                break;
        }

        return color;
    }

    return <>
        <div className={classes.list} style={{width: width}}>
            {props.formats !== undefined && props.formats !== null ?
                props.formats.map((format: Format) => {
                    color = getColor(format.title);
                    return <FormatCard key={format.title} format={format} color={color} width={props.cardsWidth !== undefined ? props.cardsWidth : undefined} height={props.cardsHeight !== undefined ? props.cardsHeight : undefined} />
                })
                : null
            }
        </div>
    </>
}

export default (FormatCardList);