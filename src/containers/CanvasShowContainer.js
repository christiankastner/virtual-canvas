import React from 'react';
import Canvas from '../components/Canvas';
import { connect } from 'react-redux'
import CanvasTools from './CanvasTools';
import SongsContainer from './SongsContainer'

const CanvasShowContainer = props => {
    return (
        <>
            <div id="canvas-container" className="canvas-container">
                <Canvas paramsId={props.paramsId} />
                <CanvasTools />
                <SongsContainer />
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        canvas: state.canvas,
        admin: state.admin
    }
}

export default connect(mapStateToProps)(CanvasShowContainer)