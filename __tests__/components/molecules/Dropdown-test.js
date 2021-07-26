import React from 'react';
import renderer from 'react-test-renderer';
import Dropdown from '../../../src/components/molecules/Dropdown'

jest.useFakeTimers()

it('Dropdown renders correctly', () => {
  const tree = renderer
  .create(
    <Dropdown 
      label = "Your Location" 
      placeholder = "Select location..." 
      data = {['Central', 'North Singapore', 'South Singapore', 'East Singapore', 'West Singapore']} 
      width = {320} 
      height = {140} 
      onSelect = {console.log('Dropdown selected')}/>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});