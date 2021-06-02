import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import theme from '../../styles/theme'

function PrimaryButton(props) {
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
    backgroundColor: theme.colours.gray6
  },
  title: {
    color: theme.colours.gray0
  }
})

export default PrimaryButton
