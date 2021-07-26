import React from 'react';
import renderer from 'react-test-renderer';
import TimePicker from '../../../src/components/molecules/Hometile'

jest.useFakeTimers()

it('TimePicker renders correctly', () => {
  const tree = renderer
    .create(
    <TimePicker 
      label = 'Appointment Time' 
      placeholder = '03:00pm' 
      onSelect = {console.log('Time selected')}
      />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});