import React from 'react';
import { API_ROOT } from '../../constants/index'
import CreatedCanvasesContainer from '../../containers/CreatedCanvases/CreatedCanvasesContainer'
import AccountOverview from "../../components/AccountOverview/AccountOverview"
import { api } from '../../services/api'

class UserShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            selected: "Account"
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

    handleSelect = (selected) => {
        return () => {
            this.setState({
                selected: selected
            })
        }
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
        const {name, email, pictures} = this.state.user
        // const bookmarkCanvases = bookmarks ? bookmarks.map(bookmark => bookmark.picture) : []
        return (
            <main className="user-show" >
                <div className="subnav">
                    <button onClick={this.handleSelect("Account")}>Account Overview</button>
                    <button onClick={this.handleSelect("Canvases")}>Created Canvases</button>
                </div>
                {this.state.selected == "Account" ? 
                    <AccountOverview />
                    : <div className="user-canvases-container">
                    { pictures ? <CreatedCanvasesContainer handleRemoveCanvas={this.handleRemoveCanvas} title="Created Canvases" canvases={pictures} deletePath={`${API_ROOT}/pictures/`}/> : "" }
                </div> }
            </main>
        )
    }
}

export default UserShow