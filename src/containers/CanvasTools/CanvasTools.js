import React from 'react';
import { connect } from 'react-redux'
import { api } from '../../services/api'
import PaintEdit from '../../components/PaintEdit/PaintEdit'
import ShapeEdit from '../../components/ShapeEdit/ShapeEdit'
import CanvasSettings from '../../components/CanvasSettings/CanvasSettings'
import "./CanvasTools.scss"
import BrushIcon from '@material-ui/icons/Brush';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AllOutIcon from '@material-ui/icons/AllOut';
import SettingsIcon from '@material-ui/icons/Settings';

const CanvasTools = (props) => {

    const renderMyAnimations = () => {
        switch (props.selected) {
            case "shapes":
                return (
                    <div className="tools-container">
                        <div className="shape-container">
                            <button className="new-shape" onClick={() => handleNewAnimation('p5_shape')}><AddCircleIcon /> Create New Shape</button>
                            {props.myShapes ? props.myShapes.map(shape => <ShapeEdit shape={shape} />) : null}
                        </div>
                    </div>
                )
            case "paint":
                return (
                    <div className="tools-container">
                        <PaintEdit myBrush={props.myBrush}/>
                    </div>
                    )
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

    const renderShapeButton = () => {
        if (props.user_id) {
            return (
                <button onClick={() => props.dispatch({type: 'SELECT_ANIMATION', animation: "shapes"})}>
                    <AllOutIcon /> Shapes
                </button>
            )
        } else {
            return ""
        }
    }

    const renderSettingButton = () => {
        if (props.user_id == props.admin) {
            return (
                <button onClick={() => props.dispatch({type: 'SELECT_ANIMATION', animation: "settings"})}>
                    <SettingsIcon /> Settings
                </button>
            )
        } else {
            return ""
        }
    }

    return (
        <>
            <div className="tools-selector">
                <button onClick={() => props.dispatch({type: 'SELECT_ANIMATION', animation: "paint"})}>
                    <BrushIcon /> Paint
                </button> 
                {renderShapeButton()}
                {renderSettingButton()}
            </div>
            {renderMyAnimations()}
        </>
    )
}


const mapStateToProps = state => {
    return {
        user_id: state.user_id,
        canvas_id: state.canvas.id,
        myShapes: state.myShapes,
        myBrush: state.myBrush,
        selected: state.selected,
        admin: state.admin
    }
}

export default connect(mapStateToProps)(CanvasTools)