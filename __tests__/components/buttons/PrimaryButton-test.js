import React from 'react';
import renderer from 'react-test-renderer';
import PrimaryButton from '../../../src/components/buttons/PrimaryButton'

it('PrimaryButton renders correctly', () => {
  const tree = renderer
    .create(<PrimaryButton title = 'Primary Button'/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});