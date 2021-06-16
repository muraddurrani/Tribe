import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import theme from '../../styles/theme'

function TertiaryButton(props) {
  return (
    <Button
      disabledStyle = {props.disabledStyle}
      disabledTitleStyle = {props.disabledTitleStyle}
      disabled = {props.disabled}
      onPress = {props.onPress}
      containerStyle = {{...props.containerStyle}}
      buttonStyle = {{...styles.button, ...props.buttonStyle}}
      titleStyle = {{...styles.title, ...props.titleStyle}}
      title = {props.title}
      icon = {props.icon}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colours.gray0
  },
  title: {
    color: theme.colours.gray6,
    fontSize: 14
  }
})

export default TertiaryButton
