import React from 'react';
import CanvasShowContainer from '../../containers/CanvasShowContainer/CanvasShowContainer'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { connect } from 'react-redux'
import { api } from '../../services/api'

class CanvasShow extends React.Component {

    componentDidMount() {
        api.canvas.fetchCanvas(this.props.match.params.id)
            .then(resp => resp.json())
            .then(json => {
                this.props.dispatch({type: "LOAD_CANVAS", canvas: json})
            })
    }

    render() {
        return (
            <main className="canvas-show">
                <div className="canvas-header">
                <Button onClick={() => this.props.dispatch({type: 'SELECT_ANIMATION', animation: "paint"})}>
                    Paint
                </Button> 
                    { this.props.user_id ? <ButtonGroup >
                <Button onClick={() => this.props.dispatch({type: 'SELECT_ANIMATION', animation: "shapes"})}>
                    Shapes
                </Button>
                {this.props.user_id == this.props.admin ? <Button onClick={() => this.props.dispatch({type: 'SELECT_ANIMATION', animation: "settings"})}>
                    Settings
                </Button> : ""}
            </ButtonGroup> : "" }
            </div>
            <CanvasShowContainer 
                paramsId={this.props.match.params.id} />
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user_id: state.user_id,
        canvas: state.canvas,
        admin: state.admin
    }
}

export default connect(mapStateToProps)(CanvasShow)