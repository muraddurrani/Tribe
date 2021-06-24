import React from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import GradientScreenView from './GradientScreenView'

function KeyboardGradientView({children, style, ...props}) {
  return (
    <TouchableWithoutFeedback
      onPress = {() => Keyboard.dismiss()}
      accessible = {false}
      touchSoundDisabled = {true}
    >
      <GradientScreenView {...props} style = {style}>
        {children}
      </GradientScreenView>
    </TouchableWithoutFeedback>
  )
}

export default KeyboardGradientView
