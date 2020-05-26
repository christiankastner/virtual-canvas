import React from 'react';
import Canvas from '../../components/Canvas/Canvas';
import { connect } from 'react-redux'
import CanvasTools from '../CanvasTools/CanvasTools';
import SongsContainer from '../SongsContainer/SongsContainer'

const CanvasShowContainer = props => {
    return (
        <main>
            <div id="canvas-container" className="canvas-container">
                <div className="tools">
                    <CanvasTools />
                </div>
                <div className="canvas">
                    <Canvas paramsId={props.paramsId} />
                </div>
                <div className="song">
                    <SongsContainer />
                </div>
            </div>
        </main>
    )
}

const mapStateToProps = (state) => {
    return {
        canvas: state.canvas,
        admin: state.admin
    }
}

export default connect(mapStateToProps)(CanvasShowContainer)