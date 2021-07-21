import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, Text } from 'react-native-elements'

import colours from '../../styles/colours'

function Section({title, children, style}) {
  return (
    <View style = {style}>
      <Divider style = {styles.divider}/>
      <Text style = {styles.label}>{title}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  divider: {
    height: 2,
    backgroundColor: colours.gray2,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 25
  },
  label: {
    fontSize: 16,
    color: colours.gray5,
    marginBottom: 5
  }
})

export default Section