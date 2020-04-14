import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import firebase from '../constants/firbase'
import './styles/SongsContainer.scss'

const SongsContainer = props => {
    const [songs, setSongs] = useState([])

    useEffect(() => {
        const database = firebase.database().ref(`canvas-${props.canvasId}`)
        database.on('value', readSongs, errData)
    }, [props.canvasId])

    const readSongs = (data) => {
        const songs = data.val();
        const keys = songs ? Object.keys(songs) : []
        setSongs([...keys.map(key => songs[key])])
    }

    const errData = err => {
        console.log(err)
    }

    const loadSong = (url) => {
        return () => {
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
                let blob = xhr.response;
                let objURL = URL.createObjectURL(blob)
                props.dispatch({type: "LOAD_SONG", url: objURL})
            };
            xhr.open('GET', url);
            xhr.send();
        }
    }

    return (
        <div className="song-container">
            <ul>
                {songs.map(song => {
                    return <li onClick={loadSong(song.url)}>{song.songName}</li>
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