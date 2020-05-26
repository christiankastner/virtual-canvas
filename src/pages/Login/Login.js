import React, { useState } from "react"
import "./Login.scss"
import { connect } from 'react-redux'
import Form from "../../components/Form/Form"
import { api } from "../../services/api"

const Login = (props) => {

    const [signup, setSignup] = useState(true)
    const [error, setError] = useState("")

    const handleSubmit = (data) => {
        console.log(data)
        if (signup == true) {
            api.user.userCreate(data)
            .then(resp => resp.json())
            .then(loginCallBack)
        } else {
            api.user.userLogin(data)
            .then(resp => resp.json())
            .then(loginCallBack)
        }
    }

    const loginCallBack = (json) => {
        console.log(json)
        if (!json.error) {
            localStorage.setItem('id', json.id) 
            props.dispatch({type: "LOGIN", user_id: json.id}) 
            props.history.goBack()
        } else {
            setError(json.error)
        }
    }

    const toggleSignup = () => {
        setSignup(!signup)
    }

    return (
        <main className="login-container">
            <div id="signup" className={`${signup ? "" : "seen"} form-container`}>
                <h1>Sign Up</h1>
                <p>{error}</p>
                <Form inputs={[{name: "name"}, {name: "email"}]} 
                    password="true" submitText="Create Account" 
                    handleSubmit={handleSubmit}/>
                <button className="toggle" onClick={toggleSignup}>Already Have an Account?</button>
            </div>
            <div id="login" className={`${signup ? "seen" : ""} form-container`}>
                <h1>Login</h1>
                <p>{error}</p>
                <Form inputs={[{name: "email"}]} 
                    password="true" submitText="Sign In" 
                    handleSubmit={handleSubmit}/>
                <button className="toggle" onClick={toggleSignup}>Don't Have an Account?</button>
            </div>
            
        </main>
    )
}

export default connect()(Login);