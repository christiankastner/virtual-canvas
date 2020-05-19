import React from 'react';
import Canvas from '../../components/Canvas/Canvas';
import { connect } from 'react-redux'
import CanvasTools from '../CanvasTools/CanvasTools';
import SongsContainer from '../SongsContainer/SongsContainer'

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