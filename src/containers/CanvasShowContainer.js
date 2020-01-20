import React from 'react';
import Canvas from '../components/Canvas';
import { API_ROOT, HEADERS } from '../constants/index';
import { connect } from 'react-redux'
import CanvasTools from './CanvasTools';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'

const CanvasShowContainer = props => {

    handleSaveCanvas = () => {
        fetch(`${API_ROOT}/users/${localStorage["id"]}/bookmarks`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({
                bookmark: {
                    user_id: localStorage["id"],
                    picture_id: props.canvas.id
                }
            })
        })
    }
    return (
        <div className="canvas-container">
            <ButtonGroup >
                <Button onClick={() => props.dispatch({type: 'SELECT_ANIMATION', animation: "shapes"})}>
                    Shapes
                </Button>
                <Button onClick={() => props.dispatch({type: 'SELECT_ANIMATION', animation: "bursts"})}>
                    Bursts
                </Button>
                <Button onClick={() => props.dispatch({type: 'SELECT_ANIMATION', animation: "paint"})}>
                    Paint
                </Button> 
                {localStorage["id"] === props.canvas.user_id ? <Button onClick={() => props.dispatch({type: 'SELECT_ANIMATION', animation: "settings"})}>
                    Settings
                </Button> : ""}
            </ButtonGroup>
            <Canvas paramsId={props.paramsId} />
            <CanvasTools />
        </div>
    )
    
}

const mapStateToProps = (state) => {
    return {
        canvas: state.canvas
    }
}

export default connect(mapStateToProps)(CanvasShowContainer)