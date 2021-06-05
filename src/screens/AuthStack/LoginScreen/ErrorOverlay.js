import React from 'react'
import { StyleSheet } from 'react-native'
import {Overlay, Text, Icon } from 'react-native-elements'
import theme from '../../../styles/theme'

function ErrorOverlay(props) {
  return (
    <Overlay
      overlayStyle = {styles.container}
      isVisible = {props.isVisible}
      >

      <Text Style = {styles.header} h3>Oh no!</Text>
      <Text> {props.message} </Text>
      <Icon
        name = "x"
        color = {theme.colours.accent2}
        onPress = {props.onPress}
      />
    </Overlay>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    padding: theme.spacing.spacing2,
    alignItems: 'center'
  }
})

export default ErrorOverlay
