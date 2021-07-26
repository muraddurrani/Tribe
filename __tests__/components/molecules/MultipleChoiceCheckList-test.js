import React from 'react';
import renderer from 'react-test-renderer';
import MultiChoiceChecklist from '../../../src/components/molecules/MultiChoiceChecklist'

jest.useFakeTimers()

it('MultipleChoiceCheckList renders correctly', () => {
  const tree = renderer
    .create(
      <MultiChoiceChecklist 
        title = 'Date available'
        data = {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
        onCheck = {console.log('checked')}
        checkArray = {new Array(7).fill(false)}
        />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});