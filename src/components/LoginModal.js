import React from 'react'
import { connect } from 'react-redux'
import { api } from '../services/api'

class LoginModal extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            login: {
                email: "",
                password: ""
            },
            signup: {
                email: "",
                name: "",
                password: ""
            },
            message: ''
        }
    }

    handleOnSignupChange = (event) => {
        event.persist()
        this.setState(prevState => {
            return {
                signup: {
                    ...prevState.signup,
                    [event.target.id]: event.target.value
                }
            }
        })
    }

    handleOnLoginChange = (event) => {
        this.setState({
            login: {
                    ...this.state.login,
                    [event.target.id]: event.target.value
                }
        })
    }

    handleLoginClick = () => {
        api.user.userLogin(this.state.login)
            .then(resp => resp.json())
            .then(this.loginCallBack)
    }

    handleSignupClick = () => {
        api.user.userCreate(this.state.signup)
            .then(resp => resp.json())
            .then(this.loginCallBack)
    }
    
    loginCallBack = (json) => {
        if (!json.error) {
            this.props.toggleModal()
            localStorage.setItem('id', json.id) 
            this.props.dispatch({type: "LOGIN", user_id: json.id}) 
        } else {
            this.setState({
                message: json.error
            })
        }
    }


    render() {
        return (
            <Modal open={this.props.modal} closeOnDimmerClick={true} onClose={this.props.toggleModal} size="small">
                <Modal.Header><Icon name="times" onClick={this.props.toggleModal}/>Log in/Sign up</Modal.Header>
                <Modal.Content image>
                <Modal.Description>
                    <h4 style={{color: "red"}}>{this.state.message}</h4>
                    <Form onChange={this.handleOnLoginChange} key="login">
                        <Form.Field >
                            <label>Email</label>
                            <input placeholder="Email" id="email"/>
                        </Form.Field>
                        <Form.Field >
                            <label>Password</label>
                            <input type="password" placeholder="Password" id="password"/>
                        </Form.Field>
                        <Form.Button onClick={this.handleLoginClick} className="login" fluid={true} color="green">Login</Form.Button>
                    </Form>
                    <Divider horizontal>Or</Divider>
                    <Header>Sign Up</Header>
                    <Form onChange={this.handleOnSignupChange} key="signup">
                    <Form.Field >
                            <label>Name</label>
                            <input placeholder="Name" id="name"/>
                        </Form.Field>
                    <Form.Field >
                            <label>Email</label>
                            <input placeholder="Email" id="email"/>
                        </Form.Field>
                        <Form.Field >
                            <label>Password</label>
                            <input type="password" placeholder="Password" id="password"/>
                        </Form.Field>
                        <Form.Button className="login" onClick={this.handleSignupClick} fluid={true} color="yellow">Sign Up</Form.Button>
                    </Form>
                </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default connect()(LoginModal);