import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import firebase from '../constants/firebase'
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
        setSongs([...keys.map(key => {
            return { ...songs[key], key: key}
        }
            )])
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

    const deleteSong = ({key, songName}) => {
        return () => {
            firebase.database().ref(`canvas-${props.canvasId}`).child(key).remove()
            firebase.storage().ref(`music/canvas-${props.canvasId}/${songName}`).delete()
        }
    }

    return (
        <div className="song-container">
            <ul>
                {songs.map(song => {
                    return (
                        <li key={song.key}>
                            <span>{song.songName}</span>
                            <button onClick={loadSong(song.url)}>Play</button>
                            {props.admin == props.userId ? <button onClick={deleteSong(song)}>Delete</button> : ""}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.user_id,
        admin: state.admin,
        canvasId: state.canvas.id
    }
}

export default connect(mapStateToProps)(SongsContainer)