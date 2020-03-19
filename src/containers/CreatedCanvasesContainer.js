import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { API_ROOT, HEADERS } from '../constants/index'
import './styles/CreatedCanvasesContainer.scss'
import CanvasCard from '../components/presentational/CanvasCard'

const CreatedCanvasesContainer = props => {
    const [state, setState] = useState({
        data: [
            ...props.canvases.map(canvas => {
                return {title: canvas.title, creator: canvas.user ? canvas.user.name : '', id: canvas.id}
            })
        ]
    })

    const handleDelete = (id) => {
        fetch(`${API_ROOT}/pictures/${id}`, {
                            method: 'DELETE',
                            headers: HEADERS
                        })
                            .then(resp => resp.json())
                            .then(json => {
                                if (json.message === "Successful") {
                                    setState(prevState => {
                                        return { data: [...prevState.data.filter(canvas => canvas.id !== id)]}
                                    })
                                }
    
                            })
    }

    const renderRows = () => {
        return state.data.map(canvas => {
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