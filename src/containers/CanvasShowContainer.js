import React from 'react';
import Canvas from '../components/Canvas';
import { Button } from 'semantic-ui-react';
import { API_ROOT, HEADERS } from '../constants/index';
import { connect } from 'react-redux'
import BurstEdit from '../components/presentational/BurstEdit'
import CanvasTools from './CanvasTools';

class CanvasShowContainer extends React.Component {

    handleSaveCanvas = () => {
        fetch(`${API_ROOT}/users/${localStorage["id"]}/bookmarks`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({
                bookmark: {
                    user_id: localStorage["id"],
                    picture_id: this.props.canvas.id
                }
            })
        })
    }

    render() {
        return (
            <div className="canvas-container">
                <Canvas paramsId={this.props.paramsId} />
                <div>
                    {localStorage["id"] ? <Button color="green" onClick={this.handleSaveCanvas}>Save</Button> : null}
                    {localStorage["id"] ? <CanvasTools handleClick={this.props.handleNewAnimation} /> : null }
                </div>
                {this.props.selectedAnimation ? <BurstEdit tool={this.state.activeEdit}/> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        canvas: state.canvas
    }
}

export default connect(mapStateToProps)(CanvasShowContainer)