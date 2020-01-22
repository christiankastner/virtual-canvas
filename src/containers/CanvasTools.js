import React from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { API_ROOT, HEADERS } from '../constants/index'
import PaintEdit from '../components/presentational/PaintEdit'
import BurstEdit from '../components/presentational/BurstEdit'
import ShapeEdit from '../components/presentational/ShapeEdit'
import CanvasSettings from '../components/presentational/CanvasSettings'

const CanvasTools = (props) => {

    const renderMyAnimations = () => {
        switch (props.selected) {
            case "shapes":
                return (
                    <div className="tools-container">
                        <Button onClick={() => handleNewAnimation('p5_shape')}>Create New Shape</Button>
                        {props.myShapes ? props.myShapes.map(shape => <ShapeEdit shape={shape} />) : null}
                    </div>
                )
            case "bursts":
                return (
                    <div className="tools-container">
                        <Button onClick={() => handleNewAnimation('animate_mo')} >Create New Burst</Button>
                        {props.myBursts ? props.myBursts.map(animation => <BurstEdit animation={animation} />) : null}
                    </div>
                )
            case "paint":
                return <PaintEdit />
            case "settings":
                return (
                    <div className='tools-container' >
                        <CanvasSettings />
                    </div> 
                )
            default:
                return <></>
        }
    }
    
    const handleNewAnimation = (modelName) => {
        fetch(`${API_ROOT}/${modelName}s`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({
                [`${modelName}`]: {
                    user_id: localStorage["id"],
                    picture_id: props.canvas_id,
                }
            })
        })
            .then(resp => resp.json())
            .then(json => {
                if (modelName == 'animate_mo') {
                    props.dispatch({type: "HTTP_NEW_BURST", animation: json})
                } else {
                    props.dispatch({type: "HTTP_NEW_SHAPE", animation: json})
                }
            })
    }

    return (
        <>
            {renderMyAnimations()}
        </>
    )
}


const mapStateToProps = state => {
    return {
        canvas_id: state.canvas.id,
        myBursts: state.myBursts,
        myShapes: state.myShapes,
        selected: state.selected
    }
}

export default connect(mapStateToProps)(CanvasTools)