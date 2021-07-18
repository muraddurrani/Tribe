import React from 'react'
import { ButtonGroup } from 'react-native-elements'
import colours from '../../../../styles/colours'

function Switcher({index, onPress, style}) {
  const buttons = ['Upcoming', 'Pending', 'Requests']

  return (
    <ButtonGroup
      containerStyle = {{borderRadius: 20, ...style}}
      buttons = {buttons}
      selectedIndex = {index}
      onPress = {(index) => onPress(index)}
      textStyle = {{fontWeight: 'bold', color: colours.gray5, fontSize: 14}}
      selectedTextStyle = {{color: colours.midpoint2, fontWeight: 'bold', fontSize: 14}}
      selectedButtonStyle = {{backgroundColor: colours.gray0}}
      buttonStyle = {{backgroundColor: colours.gray1}}
    />
  )
}

export default Switcher
