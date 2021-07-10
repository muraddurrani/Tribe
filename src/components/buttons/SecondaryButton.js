import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import colours from '../../styles/colours'

function SecondaryButton({containerStyle, buttonStyle, titleStyle, ...props}) {
  return (
    <Button
      {...props}
      containerStyle = {{...styles.container, ...containerStyle}}
      buttonStyle = {{...styles.button, ...buttonStyle}}
      titleStyle = {{...styles.title, ...titleStyle}}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 40,
    borderRadius: 20
  },
  button: {
    backgroundColor: 'transparent',
    width: 120,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colours.midpoint1
  },
  title: {
    color: colours.midpoint1
  }
})

export default SecondaryButton
