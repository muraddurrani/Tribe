import React from 'react';
import renderer from 'react-test-renderer';
import DatePicker from '../../../src/components/molecules/DatePicker'

jest.useFakeTimers()

it('DatePicker renders correctly', () => {
  const tree = renderer
    .create(<DatePicker width = {160} label = "Date of Birth" placeholder = "Select D.O.B" onSelect = {console.log('DatePicker selected')}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});