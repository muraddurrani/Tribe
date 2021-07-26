import React from 'react';
import renderer from 'react-test-renderer';
import SingleChoiceChecklist from '../../../src/components/molecules/SingleChoiceChecklist'

jest.useFakeTimers()

it('SingleChoiceCheckList renders correctly', () => {
  const tree = renderer
    .create(
    <SingleChoiceChecklist 
      title = 'Gender'
      data = {['Male', 'Female', 'Others', 'Preferred not say']}
      onCheck = {console.log('single checked')}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});