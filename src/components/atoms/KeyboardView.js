import React from 'react'
import { Keyboard, View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import ScreenView from './ScreenView'


function KeyboardView(props) {
  return (
    <TouchableWithoutFeedback
      onPress = {() => Keyboard.dismiss()}
      accessible = {false}
      touchSoundDisabled = {true}
    >
      <View style = {styles.container}>
        <ScreenView style = {props.style}>
          {props.children}
        </ScreenView>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default KeyboardView
