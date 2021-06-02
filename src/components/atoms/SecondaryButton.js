import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import theme from '../../styles/theme'

function SecondaryButton(props) {
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
    borderWidth: 1,
    borderColor: theme.colours.gray6,
    backgroundColor: theme.colours.gray0
  },
  title: {
    color: theme.colours.gray6
  }
})

export default SecondaryButton
