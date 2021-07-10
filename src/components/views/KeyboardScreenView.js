import React from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ScreenView from './ScreenView'

function KeyboardScreenView({children, style, ...props}) {
  return (
    <TouchableWithoutFeedback
      onPress = {() => Keyboard.dismiss()}
      accessible = {false}
      touchSoundDisabled = {true}
    >
      <KeyboardAwareScrollView
        contentContainerStyle = {styles.content}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
      >
        <ScreenView {...props} style = {style}>
          {children}
        </ScreenView>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  )
}


export default KeyboardScreenView
