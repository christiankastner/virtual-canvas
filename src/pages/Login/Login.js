import React, { useState } from "react"
import "./Login.scss"
import Form from "../../components/Form/Form"

const Login = (props) => {

    const [signup, setSignup] = useState(true)

    const handleSubmit = (data) => {
        console.log(data)
    }

    const toggleSignup = () => {
        setSignup(!signup)
    }

    return (
        <main className="login-container">
            <div id="signup" className={`${signup ? "" : "seen"} form-container`}>
                <h1>Sign Up</h1>
                <Form inputs={[{name: "Name"}, {name: "Email"}]} 
                    password="true" submitText="Create Account" 
                    handleSubmit={handleSubmit}/>
                <button className="toggle" onClick={toggleSignup}>Already Have an Account?</button>
            </div>
            <div id="login" className={`${signup ? "seen" : ""} form-container`}>
                <h1>Login</h1>
                <Form inputs={[{name: "Email"}]} 
                    password="true" submitText="Sign In" 
                    handleSubmit={handleSubmit}/>
                <button className="toggle" onClick={toggleSignup}>Don't Have an Account?</button>
            </div>
            
        </main>
    )
}

export default Login