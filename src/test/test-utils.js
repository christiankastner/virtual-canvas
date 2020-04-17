import React from 'react'
import {Router} from 'react-router-dom'
import {render, wait} from '@testing-library/react'
import {createMemoryHistory} from 'history'
import '@testing-library/jest-dom/extend-expect'

function renderWithRouter(ui, {route = '/', ...renderOptions} = {}) {
  const history = createMemoryHistory({initialEntries: [route]})
  const utils = render(<Router history={history}>{ui}</Router>, renderOptions)
  const finishLoading = () =>
    wait(() => expect(utils.queryByText('Loading')).toBeNull())
  return {
    ...utils,
    finishLoading,
    history,
  }
}

export {
  Simulate,
  wait,
  render,
  cleanup,
  renderIntoDocument,
  fireEvent,
} from '@testing-library/react'
export {renderWithRouter}
