import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import firebase from '../constants/firbase'

const SongsContainer = props => {
    const [songs, setSongs] = useState([])

    useEffect(() => {
        renderSongs()
    })

    const renderSongs = () => {
        const database = firebase.database().ref(`canvas-${props.canvasId}`)
        database.on('value', readSongs, errData)
        // const keys = Object.keys(data)
    }

    const readSongs = (data) => {
        const songs = data.val();
        const keys = songs ? Object.keys(songs) : []
        setSongs([...keys.map(key => songs[key])])
    }

    const errData = err => {
        console.log(err)
    }

    return (
        <div className="song-container">
            <ul>
            hello
                {songs.map(song => {
                    return <li>{song.songName}</li>
                })}
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        canvasId: state.canvas.id
    }
}

export default connect(mapStateToProps)(SongsContainer)