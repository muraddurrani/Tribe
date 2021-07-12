import React from 'react'
import { Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native'
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

const styles = StyleSheet.create({
  content: {
    flexGrow: 1
  }
})


export default KeyboardScreenView
