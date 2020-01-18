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
                return props.myShapes ? props.myShapes.map(shape => <ShapeEdit shape={shape} />) : null;
            case "bursts":
                return props.myBursts ? props.myBursts.map(animation => <BurstEdit animation={animation} />) : null;
            case "draw":
                return <DrawEdit />
            default:
                return ""
        }
    }
    

    const handleNewAnimation = () => {
        fetch(`${API_ROOT}/animate_mos`, {
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
                if (!json.error) {
                    props.dispatch({type: "HTTP_NEW_ANIMATION", animation: json})
                }
            })
    }

    return (
        <div className="tools">
            <Button onClick={handleNewAnimation}>New Burst</Button>
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