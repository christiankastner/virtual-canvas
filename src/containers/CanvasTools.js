import React from 'react';
import BurstEdit from '../components/presentational/BurstEdit'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { API_ROOT, HEADERS } from '../constants/index'

const CanvasTools = (props) => {

    const renderMyAnimations = () => props.myAnimations ? props.myAnimations.map(animation => <BurstEdit animation={animation} />) : null

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
        myAnimations: state.myAnimations
    }
}

export default connect(mapStateToProps)(CanvasTools)