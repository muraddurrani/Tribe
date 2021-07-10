import React from 'react'
import { View, StyleSheet } from 'react-native'
import colours from '../../styles/colours'

function Card({ style, children }) {
  return (
    <View style = {{...styles.view, ...style}}>
      {children}
    </View>

  )
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: colours.gray0,
    borderRadius: 15,
    elevation: 3
  }
})

export default Card
