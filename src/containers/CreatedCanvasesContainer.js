import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { API_ROOT } from '../constants/index'

const CreatedCanvasesContainer = props => {
    const [state, setState] = useState({
        columns: [
            {title: 'Title', field: 'title'},
            {title: 'Creator', field: 'creator'},
        ],
        data: [
            ...props.canvases.map(canvas => {
                return {title: canvas.title, creator: canvas.user ? canvas.user.name : ''}
            })
        ]
    })

    return (
        <MaterialTable
            title="Created Canvases"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowDelete: oldData => {
                    fetch(`${API_ROOT}/pictures`)
                }
            }} />
    )
}

export default CreatedCanvasesContainer