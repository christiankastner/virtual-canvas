import React, { useState, useEffect, useRef } from "react"
import { connect } from 'react-redux'
import firebase from '../../constants/firebase'
import './SongsContainer.scss'

const SongsContainer = props => {
    const [songs, setSongs] = useState([])
    const inputRef = useRef()

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

    const handleFileInput = () => {
        inputRef.current.click()
    }

    const handleFileChange = (event) => {
        event.persist()
        const {files} = event.target

        const file = files[files.length - 1]

        console.log(file)
        const musicRef = firebase.storage().ref(`/music/canvas-${props.canvasId}/${file.name}`)

        musicRef.put(file).then(() => {
            const storageRef = firebase.storage().ref(`/music/canvas-${props.canvasId}`)
            storageRef.child(file.name).getDownloadURL()
                .then((url) => {
                    const databaseRef = firebase.database().ref(`canvas-${props.canvasId}`)
                    databaseRef.push({
                        songName: file.name,
                        url: url
                        })
                })
            })
    }

    return (
        <div className="song-container">
            <div className="left play">
                <input className="seen" type="file" ref={inputRef} onChange={handleFileChange} />
                <button className="btn-primary" onClick={handleFileInput}>Upload Your Favorite Song</button>
            </div>
            <div className="right" >
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