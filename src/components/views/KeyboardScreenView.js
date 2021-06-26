import React from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import ScreenView from './ScreenView'

function KeyboardScreenView({children, style, ...props}) {
  return (
    <TouchableWithoutFeedback
      onPress = {() => Keyboard.dismiss()}
      accessible = {false}
      touchSoundDisabled = {true}
    >
      <ScreenView {...props} style = {style}>
        {children}
      </ScreenView>
    </TouchableWithoutFeedback>
  )
}

export default KeyboardScreenView
