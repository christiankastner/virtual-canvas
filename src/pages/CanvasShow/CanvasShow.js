import React from 'react';
import CanvasShowContainer from '../../containers/CanvasShowContainer/CanvasShowContainer'
import "./CanvasShow.scss"
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