import React from 'react'
import { View, StyleSheet } from 'react-native'

import colours from '../../styles/colours'

function ScreenView({children, style, ...props}) {
  return (
    <View {...props} style = {{...styles.view, ...style}}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: colours.gray1
  }
})

export default ScreenView
