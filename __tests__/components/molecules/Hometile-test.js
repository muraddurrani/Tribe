import React from 'react';
import renderer from 'react-test-renderer';
import Hometile from '../../../src/components/molecules/Hometile'

jest.useFakeTimers()

it('Hometile renders correctly', () => {
  const tree = renderer
    .create(<Hometile title = 'Hometile'/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});