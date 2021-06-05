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

      <Text style = {styles.header} h3>Oops!</Text>
      <Text> {props.message} </Text>
      <Icon
        containerStyle = {styles.icon}
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
    paddingHorizontal: theme.spacing.spacing3,
    paddingVertical: theme.spacing.spacing4,
    alignItems: 'center'
  },
  header: {
    marginBottom: theme.spacing.spacing1
  },
  icon: {
    marginTop: theme.spacing.spacing3
  }
})

export default ErrorOverlay
