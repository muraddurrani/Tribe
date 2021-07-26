import React from 'react';
import renderer from 'react-test-renderer';
import BottomOptions from '../../../src/components/molecules/BottomOptions'

it('BottomOptions renders correctly', () => {
  const tree = renderer
    .create(<BottomOptions onPress = {console.log('BottomOptions Pressed')} isVisible = {true}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});