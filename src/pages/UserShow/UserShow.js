import React from 'react';
import { API_ROOT } from '../../constants/index'
import CreatedCanvasesContainer from '../../containers/CreatedCanvases/CreatedCanvasesContainer'
import { api } from '../../services/api'

class UserShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            selected: "canvases"
        }
    }

    handleRemoveCanvas = (id) => {
        console.log(id)
        this.setState({
            user: {
                ...this.state.user,
                pictures: this.state.user.pictures.filter((canvas) => canvas.id !== id)
            }
        })
    }

    componentDidMount() {
        api.user.getUser()
            .then(resp => resp.json())
            .then(json => {
                this.setState({
                    user: json
                })
            })
    }

    render() {
        const {name, email, bookmarks, pictures} = this.state.user
        // const bookmarkCanvases = bookmarks ? bookmarks.map(bookmark => bookmark.picture) : []
        return (
            <div className="user-show" >
                <h2>
                    Account overview
                </h2>
                <h4>
                    Email: {email}
                </h4>
                <h4>
                    Name: {name}
                </h4>
                <div className="user-canvases-container">
                    { pictures ? <CreatedCanvasesContainer handleRemoveCanvas={this.handleRemoveCanvas} title="Created Canvases" canvases={pictures} deletePath={`${API_ROOT}/pictures/`}/> : "" }
                    {/* { bookmarkCanvases.length > 0 ? <CreatedCanvasesContainer title="Bookmarked Canvases" canvases={bookmarkCanvases} deletePath={`${API_ROOT}/bookmarks/`}/> : ""} */}
                </div>
            </div>
        )
    }
}

export default UserShow