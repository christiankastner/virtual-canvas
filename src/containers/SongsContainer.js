import React from "react"
import { connect } from 'react-redux'

const SongsContainer = props => {

    const renderSongs
    return (
        <div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        canvasId: state.canvas.id
    }
}

export default connect(mapStateToProps)(SongsContainer)