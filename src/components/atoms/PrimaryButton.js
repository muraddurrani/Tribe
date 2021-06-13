import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import theme from '../../styles/theme'

function PrimaryButton(props) {
  return (
    <Button
      disabled = {props.disabled}
      containerStyle = {{...props.containerStyle}}
      buttonStyle = {{...styles.button, ...props.buttonStyle}}
      titleStyle = {styles.title}
      title = {props.title}
      onPress = {props.onPress}
      loading = {props.loading}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colours.gray6
  },
  title: {
    color: theme.colours.gray0
  }
})

export default PrimaryButton
