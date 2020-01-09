import React from 'react';
import {ActionCable} from 'react-actioncable-provider';

class Canvas extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bursts: []
        }
    }

    handleRecievedBurst = response => {
        console.log(response)
    }

    render() {
        return (
            <div className="Canvas" >
                <ActionCable 
                    channel={{channel: 'PicturesChannel'}}
                    onRecieved={this.handleRecieved} />
            </div>
        )
    }
}

export default Canvas