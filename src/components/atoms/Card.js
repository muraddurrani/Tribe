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
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  }
})

export default Card
