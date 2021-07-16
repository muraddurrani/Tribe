import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import colours from '../../styles/colours'

function GradientScrollView({ children, style, contentContainerStyle, ...props}) {
  return (
    <LinearGradient {...props}
      style = {{...styles.view, ...style}}
      colors = {[colours.primary, colours.secondary]}
      locations = {[0, 0.5]}
    >
      <ScrollView contentContainerStyle = {{...contentContainerStyle}}>
        {children}
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
})

export default GradientScrollView
