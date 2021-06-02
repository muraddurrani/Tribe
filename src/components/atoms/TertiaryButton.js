import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import theme from '../../styles/theme'

function TertiaryButton(props) {
  return (
    <Button
      buttonStyle = {styles.button}
      titleStyle = {styles.title}
      title = {props.title}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colours.gray0
  },
  title: {
    color: theme.colours.gray6
  }
})

export default TertiaryButton
