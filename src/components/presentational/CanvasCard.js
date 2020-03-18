import React from 'react'
import CanvasImg from './CanvasImg'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        width: 'auto',
        margin: 10
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const CanvasCard = props => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CanvasImg canvas={props.canvas} />
            <CardContent className={classes.title}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.user}
                </Typography>
                <Typography variant="h5" component="h2">
                    {props.canvas.title}
                </Typography>
            </CardContent>  
        </Card>
    )
}

export default CanvasCard