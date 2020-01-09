import React from 'react';
import {ActionCable} from 'react-actioncable-provider';

class Canvas extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bursts: []
        }
    }

    render() {
        return (
            <div className="Canvas" >
                <ActionCable 
                    channel={{ channel: 'PicturesChannel', picture: 1 }}
                    onRecieved={this.handleRecieved} />
            </div>
        )
    }
}

export default Canvas