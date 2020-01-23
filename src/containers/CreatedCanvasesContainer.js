import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { API_ROOT, HEADERS } from '../constants/index'


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
                <tr>
                    <td><Button onClick={() => handleDelete(canvas.id)}>Delete</Button></td>   
                    <td>{canvas.title}</td>
                </tr>
            )
        })
    }

    return (
        <div className="canvas-table">
            <h3>Created Canvases</h3>
            <table >
                <tr>
                    <th>Action</th>
                    <th>Title</th>
                </tr>
                {renderRows()}
            </table>
        </div>
    )
}

export default CreatedCanvasesContainer