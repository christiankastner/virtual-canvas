import React from 'react';
import Canvas from '../components/Canvas';
import { Button } from 'semantic-ui-react';
import { API_ROOT } from '../constants/index';

class CanvasShowContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    handleSaveCanvas = () => {
        console.log("saved!")
        fetch(`${API_ROOT}/`, {
            
        })
    }

    render() {
        return (
            <div>
                <Canvas paramsId={this.props.paramsId} />
                <Button color="green" onClick={this.handleSaveCanvas}>Save</Button>
            </div>
        )
    }
}

export default CanvasShowContainer