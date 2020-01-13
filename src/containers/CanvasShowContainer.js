import React from 'react';
import Canvas from '../components/Canvas';
import { Button } from 'semantic-ui-react';
import { API_ROOT, HEADERS } from '../constants/index';
import BurstEdit from '../components/presentational/BurstEdit'
import CanvasTools from './CanvasTools';

class CanvasShowContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            animations: this.props.animate_mos,
            activeEdit: null
        }
    }

    handleSaveCanvas = () => {
        fetch(`${API_ROOT}/users/${localStorage["id"]}/bookmarks`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({
                bookmark: {
                    user_id: localStorage["id"],
                    picture_id: this.props.paramsId
                }
            })
        })
    }

    handleNewAnimation = () => {
        console.log("I'm here")
        fetch(`${API_ROOT}/animate_mos`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({
                
            })
        })
    }

    render() {
        return (
            <div className="canvas-container">
                <CanvasTools handleClick={this.handleNewAnimation} />
                <Canvas paramsId={this.props.paramsId} />
                {localStorage["id"] ? <Button color="green" onClick={this.handleSaveCanvas}>Save</Button> : null}
                {this.state.activeEdit ? <BurstEdit tool={this.state.activeEdit}/> : null}
            </div>
        )
    }
}

export default CanvasShowContainer