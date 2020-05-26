import React from 'react';
import { connect } from 'react-redux'
import { api } from '../../services/api'
import PaintEdit from '../../components/presentational/PaintEdit'
import ShapeEdit from '../../components/presentational/ShapeEdit'
import CanvasSettings from '../../components/presentational/CanvasSettings'
import "./CanvasTools.scss"

const CanvasTools = (props) => {

    const renderMyAnimations = () => {
        switch (props.selected) {
            case "shapes":
                return (
                    <div className="tools-container">
                        <button onClick={() => handleNewAnimation('p5_shape')}>Create New Shape</button>
                        {props.myShapes ? props.myShapes.map(shape => <ShapeEdit shape={shape} />) : null}
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
                return ""
        }
    }
    
    const handleNewAnimation = (modelName) => {
        api.animation.newAnimation(modelName, props.canvas_id)
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
        user_id: state.user_id,
        canvas_id: state.canvas.id,
        myBursts: state.myBursts,
        myShapes: state.myShapes,
        selected: state.selected
    }
}

export default connect(mapStateToProps)(CanvasTools)