import React, { useState, useEffect, useRef } from "react"
import { connect } from 'react-redux'
import firebase from '../../constants/firebase'
import './SongsContainer.scss'
import {ReactComponent as Play} from "../../assets/play.svg"
import Folds from "../../assets/Folds.mp3"

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

    const loadSong = (url, songName) => {
        return () => {
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
                let blob = xhr.response;
                let objURL = URL.createObjectURL(blob)
                props.dispatch({type: "LOAD_SONG", url: objURL, name: songName})
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
            <div className="left">
                <input className="seen" type="file" ref={inputRef} onChange={handleFileChange} />
                <button className="upload-btn btn-primary" onClick={handleFileInput}>Upload Your Favorite Song</button>
            </div>
            <div className="right" >
                <ul>
                    <li key={"folds"}>
                        <button className="load-btn" onClick={() => props.dispatch({type: "LOAD_SONG", url: Folds, name: "Folds.mp3"})}><Play /> <span>Folds.mp3</span></button>
                    </li>
                    {songs.map(song => {
                        return (
                            <>
                            <li key={song.key}>
                                <button className="load-btn" onClick={loadSong(song.url,song.songName)}><Play /> <span>{song.songName}</span></button>
                                {props.admin == props.userId ? <button className="delete-btn" onClick={deleteSong(song)}>Delete</button> : ""}
                            </li>
                            </>
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