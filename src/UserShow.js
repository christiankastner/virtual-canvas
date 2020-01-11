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
        fetch(`${API_ROOT}/users/${localStorage["id"]}`)
            .then(resp => resp.json())
            .then(json => {
                this.setState({
                    user: json
                })
            })
    }

    render() {
        const {name, email, bookmarks} = this.state.user
        return (
            <div className="user-show" >
                <h2>
                    Welcome {name}
                </h2>
                
            </div>
        )
    }
}

export default UserShow