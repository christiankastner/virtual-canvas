import React from 'react';
import { Form } from 'semantic-ui-react'

const BurstEdit = props => {

    return (
        <Form >
            <label><h2>Burst</h2></label>
            <Form.Dropdown >
                <Form.Dropdown.Menu >Shape</Form.Dropdown.Menu>
                <Form.Dropdown.Item ></Form.Dropdown.Item>
            </Form.Dropdown>
        </Form>
    )
}

export default BurstEdit