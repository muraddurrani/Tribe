import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../../../src/components/molecules/Header'

jest.useFakeTimers()

it('Header renders correctly', () => {
  const tree = renderer
    .create(<Header title = {'Header'} onPress = {console.log('Header Pressed') }/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});