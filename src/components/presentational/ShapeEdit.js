import React, { useState } from 'react';
import { connect } from 'react-redux';
import { API_ROOT, HEADERS } from '../../constants/index';
import { Slider, Button, FormControl, MenuItem, Select, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      height: 100,
    },
    margin: {
      height: theme.spacing(3),
    },
 }));

const ShapeEdit = props => {

    const [shape, setShape] = useState({...props.shape})

    const handleSubmit = () => {
        fetch(`${API_ROOT}/p5_shapes/${props.shape.id}`, {
            method: "PATCH",
            headers: HEADERS,
            body: JSON.stringify({
                p5_shape: {
                    ...shape
                }
            })}
        )
            .then(resp => resp.json())
            .then(json => {
                props.dispatch({type: "HTTP_EDIT_SHAPE", animation: json})
            })
    }

    const handleDelete = () => {
        fetch(`${API_ROOT}/p5_shapes/${props.shape.id}`, {
            method: "DELETE",
            headers: HEADERS
        })
            .then(resp => resp.json())
            .then(json => {
                props.dispatch(json)
            })
    }

    const handleInputChange = (name, value) => {
        // const { name, value } = event.target
        setShape({
                ...shape, 
                [name]: value
            })
    }

    const classes = useStyles();

    return (
        <Grid container spacing={1}>
            <Grid item xs >
            <h3>Shape</h3>
            <Button onClick={handleSubmit}>Save Shape</Button>
            <Button onClick={handleDelete}>Delete Shape</Button>
                <FormControl>
                    <Select 
                        labelId="frequency-select"
                        id="frequency"
                        name="frequency"
                        value={shape.frequency} 
                        onChange={handleInputChange}>
                        <MenuItem value="treble" >Treble</MenuItem>
                        <MenuItem value="mid" >Mid</MenuItem>
                        <MenuItem value="bass" >Bass</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <Select 
                        labelId="shape-select"
                        id="shape"
                        name="shape"
                        value={shape.shape} 
                        onChange={handleInputChange}>
                        <MenuItem value="rect" >Rectangle</MenuItem>
                        <MenuItem value="ellipse" >Ellipse</MenuItem>
                        <MenuItem value="triangle" >Triangle</MenuItem>
                        <MenuItem value="line" >Line</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <div className={classes.root}>
                    <Slider 
                        name="fill"
                        label="Fill"
                        onChange={(e,v) => handleInputChange("width", v)} />
                </div>
                <div className={classes.margin}>
                    <Slider 
                        name="stroke"
                        label="Stroke"
                        onChange={handleInputChange} />
                </div>
            <Grid item xs={3} >
                    <div className={classes.root}>
                        <Typography id="vertical-slider" gutterBottom>
                            Width
                        </Typography>
                        <Slider 
                            name="width"
                            label="Width"
                            orientation="vertical"
                            value={shape.width}
                            valueLabelDisplay='auto'
                            onChange={(e,v) => handleInputChange("width", v)} />
                    </div>
                    <div className={classes.margin}>
                        <Typography id="vertical-slider" gutterBottom>
                            Amount
                        </Typography>
                        <Slider 
                            name="amount"
                            label="Amount"
                            onChange={handleInputChange} 
                            orientation="vertical"
                            value={shape.amount}
                            valueLabelDisplay='auto'
                            onChange={(e,v) => handleInputChange("amount", v)}
                            />
                    </div>
                    <div className={classes.margin}>
                        <Typography id="vertical-slider" gutterBottom>
                            Orgit Speed
                        </Typography>
                        <Slider
                            name="orbit"
                            label="Orbit"
                            onChange={handleInputChange}
                            orientation="vertical"
                            value={shape.orbit}
                            valueLabelDisplay='auto'
                            onChange={(e,v) => handleInputChange("orbit", v)} />
                    </div>
                    <div className={classes.margin}>
                        <Typography id="vertical-slider" gutterBottom>
                            Spin Speed
                        </Typography>
                        <Slider
                            name="spin"
                            label="Spin"
                            onChange={handleInputChange} 
                            orientation="vertical"
                            value={shape.spin}
                            valueLabelDisplay='auto'
                            onChange={(e,v) => handleInputChange("spin", v)}
                            />
                    </div>
            </Grid>
            </Grid>
        </Grid>
    )
}

export default connect()(ShapeEdit)