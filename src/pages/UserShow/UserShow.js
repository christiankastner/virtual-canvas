import React from 'react';
import { API_ROOT } from '../../constants/index'
import CreatedCanvasesContainer from '../../containers/CreatedCanvasesContainer/CreatedCanvasesContainer'
import AccountOverview from "../../components/AccountOverview/AccountOverview"
import { api } from '../../services/api'
import "./UserShow.scss"

class UserShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            selected: "canvases"
        }
    }

    handleRemoveCanvas = (id) => {
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
        return (
            <main className="user-show" >
                <div className="subnav">
                    <button onClick={this.handleSelect("account")}>Account Overview</button>
                    <button onClick={this.handleSelect("canvases")}>Created Canvases</button>
                </div>
                <div className="content">
                    {this.state.selected == "account" ? <AccountOverview user={this.state.user} /> :
                        <CreatedCanvasesContainer handleRemoveCanvas={this.handleRemoveCanvas} title="Created Canvases" canvases={pictures} deletePath={`${API_ROOT}/pictures/`}/> }
                </div>
            </main>
        )
    }
}

export default UserShow