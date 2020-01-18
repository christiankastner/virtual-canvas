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
                console.log(json)
                this.props.dispatch({type: "LOAD_CANVAS", canvas: json})
                this.setState({
                    canvas: json,
                    myAnimations: json.animate_mos.filter(animation => animation.user_id == localStorage["id"])
                })
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

    // handleNewAnimation = () => {
    //     fetch(`${API_ROOT}/animate_mos`, {
    //         method: "POST",
    //         headers: HEADERS,
    //         body: JSON.stringify({
    //             animate_mo: {
    //                 user_id: localStorage["id"],
    //                 picture_id: this.props.match.params.id,
    //             }
    //         })
    //     })
    //         .then(resp => resp.json())
    //         .then(json => {
    //             if (!json.error) {
    //                 this.props.dispatch({type: "HTTP_NEW_ANIMATION", })
    //             }
    //         })
    // }

    render() {
        return (
            <div className="canvas-show">

                <h2>{this.props.canvas.title}</h2>
                {localStorage["id"] ? <Button onClick={this.handleSaveCanvas}>Bookmark Canvas</Button> : null}
                <CanvasShowContainer 
                    paramsId={this.props.match.params.id} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        canvas: state.canvas
    }
}

export default connect(mapStateToProps)(CanvasShow)