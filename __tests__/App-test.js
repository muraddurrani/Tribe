import React from 'react'
import App from '../App'
import { render } from '@testing-library/react-native'

it('Should display an overlay', () => {
  const { getByText } = render(<App />)

  const button = getByText('What is Tribe?')
})
