import React from 'react'
import renderer from 'react-test-renderer'
import SecondaryButton from '../../../src/components/buttons/SecondaryButton'

it('SecondaryButton renders correctly', () => {
  const tree = renderer
    .create(<SecondaryButton title = 'Secondary Button'/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
})