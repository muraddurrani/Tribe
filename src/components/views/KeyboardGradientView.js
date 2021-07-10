import React from 'react'
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import GradientView from './GradientView'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function KeyboardGradientView({children, style, ...props}) {
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
      <GradientView {...props} style = {style}>
        {children}
      </GradientView>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1
  }
})

export default KeyboardGradientView
