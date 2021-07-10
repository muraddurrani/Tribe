import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import colours from '../../styles/colours'

function PrimaryButton({containerStyle, buttonStyle, titleStyle, ...props}) {
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
    backgroundColor: colours.midpoint1,
    width: 120,
    height: 40,
    borderRadius: 20
  },
  title: {
    color: colours.gray0
  }
})

export default PrimaryButton
