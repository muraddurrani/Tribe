import React from 'react'
import renderer from 'react-test-renderer'
import TertiaryButton from '../../../src/components/buttons/TertiaryButton'

it('TertiaryButton renders correctly', () => {
  const tree = renderer
    .create(<TertiaryButton title = 'Tertiary Button'/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
})