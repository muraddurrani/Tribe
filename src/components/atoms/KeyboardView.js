import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import theme from '../../styles/theme'


function KeyboardView(props) {
  return (
    <TouchableWithoutFeedback
      onPress = {() => Keyboard.dismiss()}
      accessible = {false}
      touchSoundDisabled = {true}
    >
        <KeyboardAwareScrollView
          style = {{...styles.container, ...props.style}}
          contentContainerStyle = {{...styles.content, ...props.contentContainerStyle}}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
          >
          {props.children}
        </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colours.gray0
  },
  content: {
    flexGrow: 1
  }
})

export default KeyboardView
