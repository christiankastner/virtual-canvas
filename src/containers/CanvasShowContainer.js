import React from 'react';
import Canvas from '../components/Canvas';
import { Button } from 'semantic-ui-react';
import { API_ROOT, HEADERS } from '../constants/index';
import BurstEdit from '../components/presentational/BurstEdit'

class CanvasShowContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tools: []
            
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

    render() {
        return (
            <div className="canvas-container">
                <Canvas paramsId={this.props.paramsId} />
                {localStorage["id"] ? <Button color="green" onClick={this.handleSaveCanvas}>Save</Button> : null}
                <BurstEdit />
            </div>
        )
    }
}

export default CanvasShowContainer