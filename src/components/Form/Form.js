import React, { useState } from "react"
import "./Form.scss"

const Form = props => {
    const [data, setData] = useState({})

    const renderInputs = () => {
        return props.inputs.map(input => {
            return (
                <div className="field"> 
                    <label htmlFor={input.name} >{input.name}</label>
                    <input placeholder="" type="text" id={input.name} name={input.name} />
                </div>
            )
        })
    }

    const renderPassword = () => {
        if (props.hasOwnProperty("password")) {
            return (
                <div className="field">
                    <label htmlFor="password" >Password</label>
                    <input type="password" id="password" name="password"></input>
                </div>
            )
        }
    }

    const handleFormChange = (event) => {
        event.persist()
        const {name, value} = event.target
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleSubmit(data)
    }

    return (
        <form className="form" onChange={handleFormChange} onSubmit={handleSubmit}>
            {renderInputs()}
            {renderPassword()}
            <button type="submit" className="btn-secondary">{props.submitText}</button>
        </form>
    )
}

export default Form