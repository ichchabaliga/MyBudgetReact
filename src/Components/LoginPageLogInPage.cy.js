import React from 'react'
import LogInPage from './LoginPage'

describe('<LogInPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LogInPage />)
  })
})