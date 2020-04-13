import React from "react"
import { connect } from 'react-redux'
import firebase from '../constants/firbase'

const SongsContainer = props => {
    const renderSongs = () => {
        const database = firebase.database().ref(`canvas-${props.canvasId}`)
        let data;
        database.on('value', (firebaseData) => {console.log(firebaseData.val())}, errData)
        console.log(data)
        // const keys = Object.keys(data)
        return (
            <ul>
                {/* {keys.map(key => {
                    return <li>{data[key].name}</li>
                })} */}
            </ul>
        )
    }

    const readSongs = (data) => {
        console.log(typeof data.val())
        return data.val()
    }

    const errData = err => {
        console.log(err)
    }

    return (
        <div>
            {renderSongs()}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        canvasId: state.canvas.id
    }
}

export default connect(mapStateToProps)(SongsContainer)