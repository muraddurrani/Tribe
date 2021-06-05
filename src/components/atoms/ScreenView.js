import React from 'react'
import { View, StyleSheet } from 'react-native'
import theme from '../../styles/theme'

function ScreenView(props) {
  return (
    <View style = {{...props.style, ...styles.container}}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colours.gray0,
  }
})
export default ScreenView
