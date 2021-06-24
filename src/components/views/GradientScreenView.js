import React from 'react'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import colours from '../../styles/colours'

function GradientScreenView({ children, style, ...props }) {
  return (
    <LinearGradient {...props} style = {{...styles.view, ...style}} colors = {[colours.primary, colours.secondary]}>
      {children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
})

export default GradientScreenView
