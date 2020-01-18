import React from 'react';
import Canvas from '../components/Canvas';
import { API_ROOT, HEADERS } from '../constants/index';
import { connect } from 'react-redux'
import CanvasTools from './CanvasTools';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'

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
                <ButtonGroup >
                    <Button onClick={() => this.props.dispatch({type: 'SELECT_ANIMATION', animation: "shapes"})}>
                        Shapes
                    </Button>
                    <Button onClick={() => this.props.dispatch({type: 'SELECT_ANIMATION', animation: "bursts"})}>
                        Bursts
                    </Button>
                    <Button onClick={() => this.props.dispatch({type: 'SELECT_ANIMATION', animation: "paint"})}>
                        Paint
                    </Button> 
                </ButtonGroup>
                <Canvas paramsId={this.props.paramsId} />
                <CanvasTools />
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