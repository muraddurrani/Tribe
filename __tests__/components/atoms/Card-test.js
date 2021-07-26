import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../../../src/components/atoms/Card'

jest.useFakeTimers()

it('Card renders correctly', () => {
  const tree = renderer
    .create(<Card style = {{alignItems: 'center', width: '90%'}}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});