import React from 'react'
import { render } from 'react-testing-library'
import LoginModal from '../LoginModal'

it('calls onSubmit when the submit event is fired', () => {
    const { getByLabelText, getByText } = render(<LoginModal />)
    

})