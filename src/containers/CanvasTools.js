import React from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { API_ROOT, HEADERS } from '../constants/index'
import DrawEdit from '../components/presentational/DrawEdit'
import BurstEdit from '../components/presentational/BurstEdit'
import ShapeEdit from '../components/presentational/ShapeEdit'

const CanvasTools = (props) => {

    const renderMyAnimations = () => {
        switch (props.selected) {
            case "shapes":
                return (
                    <div className="tools">
                        <Button onClick={handleNewAnimation('animate_mos')}>New Burst</Button>
                        {props.myShapes ? props.myShapes.map(shape => <ShapeEdit shape={shape} />) : null}
                    </div>
                )
            case "bursts":
                return (
                    <div className="tools">
                        newButton = <Button onClick={handleNewAnimation('p5_shapes')}>New Shape</Button>
                        {props.myShapes ? props.myShapes.map(animation => <ShapeEdit animation={animation} />) : null}
                    </div>
                )
            case "draw":
                return <DrawEdit />
            default:
                return <></>
        }
    }
    
    const handleNewAnimation = (modelName) => {
        fetch(`${API_ROOT}/${modelName}`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({
                animate_mo: {
                    user_id: localStorage["id"],
                    picture_id: props.canvas_id,
                }
            })
        })
            .then(resp => resp.json())
            .then(json => {
                props.dispatch({type: "HTTP_NEW_BURST", animation: json})
            })
    }

    return (
        <div className="tools">
            {newButton}
            {renderMyAnimations()}
        </div>
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