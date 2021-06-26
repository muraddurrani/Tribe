import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import GradientScreenView from './GradientScreenView'

function KeyboardScrollView({children, style, ...props}) {
  return (
    <TouchableWithoutFeedback
      onPress = {() => Keyboard.dismiss()}
      accessible = {false}
      touchSoundDisabled = {true}
    >
      <KeyboardAwareScrollView
        style = {styles.container}
        contentContainerStyle = {styles.content}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
      >
        <GradientScreenView {...props} style = {style}>
          {children}
        </GradientScreenView>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1
  }
})

export default KeyboardScrollView
