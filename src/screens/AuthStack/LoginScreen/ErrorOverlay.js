import React from 'react'
import { StyleSheet } from 'react-native'
import {Overlay, Text, Icon } from 'react-native-elements'
import colours from '../../../styles/colours'

function ErrorOverlay({isVisible, onPress, message}) {
  return (
    <Overlay
      overlayStyle = {styles.container}
      isVisible = {isVisible}
      >

      <Text h2Style = {styles.header} h2>Oops!</Text>
      <Text> {message} </Text>
      <Icon
        containerStyle = {styles.icon}
        name = "x"
        color = {colours.midpoint3}
        onPress = {onPress}
      />
    </Overlay>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    borderRadius: 15
  },
  header: {
    marginBottom: 10
  },
  icon: {
    marginTop: 10
  }
})

export default ErrorOverlay
