import React from 'react'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import colours from '../../styles/colours'

function GradientView({ children, style, ...props}) {
  return (
    <LinearGradient {...props}
      style = {{...styles.view, ...style}}
      colors = {[colours.primary, colours.secondary]}
      locations = {[0, 0.5]}
    >
      {children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
})

export default GradientView
