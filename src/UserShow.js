import React from 'react';
import { API_ROOT } from './constants/index'
import CreatedCanvasesContainer from './containers/CreatedCanvasesContainer'

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
                console.log(json)
                this.setState({
                    user: json
                })
            })
    }

    render() {
        const {name, email, bookmarks, pictures} = this.state.user
        const bookmarkCanvases = bookmarks ? bookmarks.map(bookmark => bookmark.picture) : []
        console.log(bookmarkCanvases)
        return (
            <div className="user-show" >
                <h2>
                    Welcome, {name}
                </h2>
                <h3>
                    Email: {email}
                </h3>
                <div className="user-canvases-container">
                    { pictures ? <CreatedCanvasesContainer title="Created Canvases" canvases={pictures} /> : '' }
                    {/* <DispklayCanvases title="Bookmarked Canvases" canvases={bookmarkCanvases} /> */}
                </div>
            </div>
        )
    }
}

export default UserShow