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
    borderRadius: 20
  },
  button: {
    backgroundColor: colours.accent1,
    borderRadius: 20,
    width: 120
  },
  title: {
    color: colours.gray0
  }
})

export default PrimaryButton
