import React from 'react';
import CanvasCard from '../components/presentational/CanvasCard'
import { Link } from 'react-router-dom';

const DisplayCanvases = (props) => {
    const renderCanvases = () => {
        if (props.canvases && props.canvases.length > 0) {
            return props.canvases.map(canvas => {
                return (
                    <div key={canvas.id} className='canvas-list'>
                        <Link key={canvas.id} to={`/canvases/${canvas.id}`} >
                            <CanvasCard canvas={canvas} user={canvas.user.username} />
                        </Link>
                    </div>
                )
            })
        }
    }

    return (
        <>
        {props.title ? <h3>{props.title}</h3> : null}
            {renderCanvases()}
        </>
    )
}

export default DisplayCanvases