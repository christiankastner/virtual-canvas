import React from 'react'
import './CreatedCanvasesContainer.scss'
import CanvasCard from '../../components/CanvasCard/CanvasCard'
import firebase from '../../constants/firebase'
import { api } from '../../services/api'

const CreatedCanvasesContainer = props => {

    const handleDelete = (id) => {
        firebase.database().ref(`canvas-${id}`).remove()
        firebase.storage().ref(`music/canvas-${id}`).listAll().then(res => {
            res.items.forEach(song => {
                firebase.storage().ref(song.location.path).delete();
            }
            )
        })
        api.canvas.deleteCanvas(id)
                            .then(resp => resp.json())
                            .then(json => {
                                props.handleRemoveCanvas(id)
                            })
    }

    const renderRows = () => {
        return props.canvases.map(canvas => {
            return (
                <li>
                    <CanvasCard canvas={canvas} delete={() => handleDelete(canvas.id)}/>
                </li>
            )
        })
    }

    return (
        <>
            <h3>Created Canvases</h3>
            <div className="canvas-table">
                <ul>
                {renderRows()}
                </ul>
            </div>
        </>
    )
}

export default CreatedCanvasesContainer