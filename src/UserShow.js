import React from 'react';
import { API_ROOT, HEADERS} from './constants/index'

class UserShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        fetch(`${API_ROOT}/users/`)
            .then(resp => resp.json())
            .then(json => {
                this.setState({
                    user: json
                })
            })
    }

    render() {
        return (
            <div className="user-show" >
                <h2>
                    Welcome {}
                </h2>
            </div>
        )
    }
}

export default UserShow