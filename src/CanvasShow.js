import React from 'react';
import CanvasShowContainer from './containers/CanvasShowContainer'
import { API_ROOT, HEADERS } from './constants/index'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'

class CanvasShow extends React.Component {

    componentDidMount() {
        fetch(`${API_ROOT}/pictures/${this.props.match.params.id}`)
            .then(resp => resp.json())
            .then(json => {
                this.props.dispatch({type: "LOAD_CANVAS", canvas: json})
            })
    }

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
            <div className="canvas-show">

                <h2>{this.props.canvas.title}</h2>
                {localStorage["id"] && !this.props.admin ? <Button onClick={this.handleSaveCanvas}>Bookmark Canvas</Button> : null}
                <CanvasShowContainer 
                    paramsId={this.props.match.params.id} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        canvas: state.canvas,
        admin: state.admin
    }
}

export default connect(mapStateToProps)(CanvasShow)